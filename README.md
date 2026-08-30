# Advisant Financial — website

Astro static site. Builds to plain HTML. Hosted free on Cloudflare Pages.

## Before launch — fill these in

Everything you need to edit lives in **one file**: `src/data/site.js`.
Search it for `TODO_` and replace each one.

| Token | What it is |
|---|---|
| `TODO_PORTAL_URL` | Your TaxDome portal URL |
| `TODO_EMAIL` | Public contact email |
| `TODO_YEAR` | Year founded |
| `TODO_MI_PHONE` | Michigan phone — **must match the MI Google listing exactly** |
| `TODO_CO_PHONE` | Denver phone — must match the Denver Google listing exactly |
| `TODO_DENVER_STREET` / `_SUITE` / `_ZIP` | Denver address, character-for-character as the listing shows it |
| `TODO_GOOGLE_MAPS_EMBED_URL` | Optional map embed for the Denver page |
| `TODO_NAME` (×2) and bios | Team page |

Also update `/login` in `public/_redirects` with the real portal URL.

**Do not add a Michigan street address anywhere.** That listing hides its address,
so the site must show city and state only. Adding one contradicts the listing.

## Local use

```
npm install
npm run dev      # preview at localhost:4321
npm run build    # outputs to dist/
```

## Deploy (once)

Cloudflare now steers new projects to **Workers** rather than Pages. Either works
for this site. `wrangler.toml` in the repo root makes the Workers path work.

**Option A — Workers (what the dashboard offers by default)**

1. Workers & Pages → Create application → **Import a repository**
2. Pick `advisant-site`
3. Build command: `npm run build`  ·  Deploy command: `npx wrangler deploy`
4. Deploy

**Option B — Pages (if the tab is still present)**

1. Workers & Pages → Create application → **Pages** tab → Connect to Git
2. Framework preset: **Astro** (fills in `npm run build` and `dist`)
3. Deploy
3. Deploy. You get a `*.pages.dev` preview URL. Check it on desktop and phone.
4. Cloudflare Pages → Custom domains → add `advisantfinancial.com` and `www`.
   Follow the DNS instructions. **This is the cutover — TaxDome's site goes dark.**
5. Google Search Console → add the domain → submit `sitemap-index.xml`.
6. Google Business Profile → set each listing's website field:
   - Michigan listing → `/rochester-hills-tax-services/`
   - Denver listing → `/denver-tax-services/`

## Editing later

Change a fact → edit `src/data/site.js` → commit. Cloudflare rebuilds in ~30 seconds.
You can do this in GitHub's web editor without installing anything.

## What's built in

- Per-location `AccountingService` JSON-LD with distinct `@id`s, tied to a parent organization
- Canonical URLs, Open Graph tags, auto-generated sitemap, robots.txt
- 301 redirects from the old TaxDome URLs
- No meta keywords tag (Google has ignored it since 2009)
- Static HTML, no JavaScript, no cookies, no consent banner needed

## Turning on the inquiry form

The form on `/contact/` is wired for **Cloudflare Pages Forms** — no third-party
service, no API key, no code. After your first deploy:

1. Cloudflare dashboard → your Pages project → **Settings → Forms**
2. Enable Forms. Cloudflare detects `data-static-form-name="inquiry"` on the next build.
3. Add your notification email so submissions arrive in your inbox.
4. Submissions are also stored in the dashboard.

Spam handling: the form includes a hidden honeypot field (`company`). Bots fill it,
humans never see it. Cloudflare's built-in bot filtering sits in front of that.
If spam still gets through, add Cloudflare Turnstile — it is free and replaces
reCAPTCHA without sending your visitors' data to Google.

**Test the form on the `.pages.dev` preview before DNS cutover.** Submit it once and
confirm the email arrives.

## Stress tests

Run both before every deploy. They check the BUILT output in `dist/`, not the source.

```
npm run build
python3 stress-test.py          # HTML nesting, SEO, schema, links, assets, copy rules
python3 stress-test-render.py   # layout escapes, overflow, tap targets, JS errors, forms
```

`stress-test.py` catches unclosed and mismatched tags, over-length titles and
descriptions, duplicate metadata, missing H1 or canonical, invalid JSON-LD, a
missing FGFOS disclosure, broken internal links, missing images, images without
alt text, any published scheduling link, and any copy that puts Michigan before
Colorado.

`stress-test-render.py` loads every page in a real browser at 1280px and 360px and
flags any element wider than its container (which is how a broken `</div>` shows
up), horizontal overflow, tap targets under 32px, JavaScript errors, failed
requests, and it exercises the fit check and the inquiry form.

Both exit non-zero on failure, so they can be wired into CI later.
