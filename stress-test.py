#!/usr/bin/env python3
"""Full stress test against the BUILT output. Run: python3 stress-test.py"""
import re, glob, json, os, sys
from html.parser import HTMLParser

VOID = {'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr'}

class Nesting(HTMLParser):
    def __init__(s): super().__init__(); s.stack=[]; s.errs=[]
    def handle_starttag(s,t,a):
        if t not in VOID: s.stack.append((t, s.getpos()))
    def handle_endtag(s,t):
        if t in VOID: return
        if not s.stack: s.errs.append(f'stray </{t}> at {s.getpos()}'); return
        top,pos = s.stack.pop()
        if top != t:
            s.errs.append(f'</{t}> at {s.getpos()} closes <{top}> opened at {pos}')

issues = []
pages = sorted(set(glob.glob('dist/**/index.html', recursive=True)))
titles, descs = {}, {}

for f in pages:
    h = open(f).read()
    name = f.replace('dist/','').replace('/index.html','') or 'index'

    # 1. HTML nesting
    n = Nesting(); n.feed(h)
    for e in n.errs: issues.append(f'[nesting] {name}: {e}')
    if n.stack: issues.append(f'[nesting] {name}: unclosed {[t for t,_ in n.stack]}')

    # 2. SEO
    t = re.search(r'<title>(.*?)</title>', h, re.S).group(1)
    d = re.search(r'<meta name="description" content="(.*?)"', h, re.S).group(1)
    titles.setdefault(t, []).append(name); descs.setdefault(d, []).append(name)
    if len(t) > 62: issues.append(f'[seo] {name}: title {len(t)} chars')
    if not 110 <= len(d) <= 168: issues.append(f'[seo] {name}: description {len(d)} chars')
    if len(re.findall(r'<h1', h)) != 1: issues.append(f'[seo] {name}: {len(re.findall(r"<h1",h))} h1 tags')
    if '<link rel="canonical"' not in h: issues.append(f'[seo] {name}: no canonical')

    # 3. Schema
    for m in re.findall(r'application/ld\+json">(.*?)</script>', h, re.S):
        try: json.loads(m)
        except Exception as e: issues.append(f'[schema] {name}: {e}')

    # 4. Compliance
    if 'SEC Registered Investment Adviser' not in h:
        issues.append(f'[compliance] {name}: FGFOS disclosure missing')
    if 'calendly' in h.lower():
        issues.append(f'[compliance] {name}: scheduling link published')

    # 5. Links and assets
    for a in re.findall(r'href="(/[^"#]*)"', h):
        p = 'dist' + a
        if not (os.path.exists(p) or os.path.exists(p.rstrip('/') + '/index.html')):
            issues.append(f'[link] {name}: broken {a}')
    for img in re.findall(r'<img[^>]*src="(/[^"]+)"', h):
        if not os.path.exists('dist' + img): issues.append(f'[asset] {name}: missing {img}')
    for img in re.findall(r'<img[^>]*>', h):
        if 'alt=' not in img: issues.append(f'[a11y] {name}: img without alt')

    # 6. Copy rules
    txt = re.sub(r'<script[^>]*>.*?</script>', '', h, flags=re.S)
    txt = re.sub(r'<[^>]+>', ' ', txt)
    for pat in ['MI & CO','Michigan & Colorado','Metro Detroit and Denver','Michigan and Colorado','Metro Detroit, Denver']:
        if pat in txt: issues.append(f'[copy] {name}: "{pat}" puts Michigan first')

for k, v in list(titles.items()) + list(descs.items()):
    if len(v) > 1: issues.append(f'[seo] duplicate across {v}')

print(f'{len(pages)} pages checked')
print('\n'.join(sorted(set(issues))) if issues else 'STATIC CHECKS PASS')
sys.exit(1 if issues else 0)
