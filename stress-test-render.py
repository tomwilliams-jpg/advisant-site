#!/usr/bin/env python3
"""Rendered checks: layout escapes, overflow, tap targets, JS errors, focus."""
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:9171'
PATHS = ['/','/tax-strategy/','/family-office/','/equity-compensation/','/services/','/insights/',
 '/insights/iso-tax-when-your-company-is-acquired/','/insights/michigan-flow-through-entity-tax-s-corp-owners/',
 '/fit-check/','/denver-tax-services/','/rochester-hills-tax-services/','/meet-our-team/','/contact/']

ESCAPE_JS = """() => {
  const bad = [];
  document.querySelectorAll('main *').forEach(el => {
    if (el.closest('.hp')) return;                       // offscreen honeypot, by design
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    // walk up past display:contents wrappers, which have no box of their own
    let p = el.parentElement;
    while (p && getComputedStyle(p).display === 'contents') p = p.parentElement;
    if (!p) return;
    const pr = p.getBoundingClientRect();
    if (pr.width === 0) return;
    if (r.width > pr.width + 2) {
      bad.push((el.className || el.tagName) + ' is ' + Math.round(r.width - pr.width) + 'px wider than ' + (p.className || p.tagName));
    }
  });
  return [...new Set(bad)];
}"""

errs = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    pg.on('pageerror', lambda e: errs.append(f'[js] {e}'))
    # Google Fonts is blocked in this sandbox; ignore that one, catch everything else.
    pg.on('requestfailed', lambda r: errs.append(f'[net] {r.url}')
          if 'fonts.g' not in r.url else None)
    pg.on('response', lambda r: errs.append(f'[net] {r.status} {r.url}')
          if r.status >= 400 and 'fonts.g' not in r.url else None)
    for path in PATHS:
        r = pg.goto(BASE + path); pg.wait_for_timeout(700)
        if r.status != 200: errs.append(f'[http] {path} -> {r.status}')
        for e in pg.evaluate(ESCAPE_JS): errs.append(f'[layout] {path}: {e}')
        # no element may exceed the viewport
        if pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1"):
            errs.append(f'[layout] {path}: horizontal overflow at 1280px')

    ctx = b.new_context(viewport={'width':360,'height':780}, is_mobile=True, has_touch=True)
    m = ctx.new_page()
    for path in PATHS:
        m.goto(BASE + path); m.wait_for_timeout(600)
        if m.evaluate("document.documentElement.scrollWidth > innerWidth + 1"):
            errs.append(f'[mobile] {path}: horizontal overflow at 360px')
        for e in m.evaluate(ESCAPE_JS): errs.append(f'[mobile] {path}: {e}')
        small = m.evaluate("""Array.from(document.querySelectorAll('a,button,summary'))
            .filter(e=>{const r=e.getBoundingClientRect();return r.height>0&&r.height<32})
            .map(e=>e.textContent.trim().slice(0,20))""")
        if small: errs.append(f'[mobile] {path}: small tap targets {small[:3]}')

    # interactive
    pg.goto(BASE + '/fit-check/'); pg.wait_for_timeout(900)
    pg.click('#fc-go')
    if 'answer all six' not in pg.inner_text('#fc-go'): errs.append('[fit-check] no guard on incomplete form')
    for i,v in [(1,'2'),(2,'2'),(3,'1'),(4,'2'),(5,'2'),(6,'1')]:
        pg.check(f'input[name="q{i}"][value="{v}"]')
    pg.wait_for_timeout(2000); pg.click('#fc-go'); pg.wait_for_timeout(500)
    if not pg.inner_text('#fc-head'): errs.append('[fit-check] no result rendered')

    pg.goto(BASE + '/contact/'); pg.wait_for_timeout(900)
    if pg.evaluate("document.querySelector('.inquiry').checkValidity()"):
        errs.append('[form] empty form passes validation')
    if pg.evaluate("document.querySelector('#company').getBoundingClientRect().left >= 0"):
        errs.append('[form] honeypot is visible')
    b.close()

print('\n'.join(sorted(set(errs))) if errs else 'RENDERED CHECKS PASS')
sys.exit(1 if errs else 0)
