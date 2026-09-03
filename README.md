# 1 Solutions — website

Static marketing site for **1 Solutions**, a professional firm in Andul, Howrah offering
business registration, tax & compliance, accounting and legal documentation services.

Plain HTML/CSS/JS — **no build step, no dependencies**. See `Spec.md` for the full
specification and `Decisions.md` for the decision log behind it.

## Structure

```
index.html            Home
services.html          Full service catalogue (4 categories, anchored)
about-contact.html     About + contact details + map + enquiry form
privacy.html           Privacy Policy (footer-linked only)
404.html               Not-found page
css/styles.css         Single shared stylesheet (design tokens in :root)
js/main.js             Nav toggle, form -> WhatsApp, testimonial slider, FAQ accordion
images/                Logo, favicons, OG image, optimised stock photos (WebP)
netlify.toml           Publish config, pretty-URL redirects, headers
robots.txt sitemap.xml
resources/             Original client material (kept in repo, blocked from serving via netlify.toml)
sample.html            Original reference mock-up (kept in repo, blocked from serving via netlify.toml)
```

### Shared header & footer

The `<header>` and `<footer>` blocks are **hand-duplicated** across `index.html`,
`services.html`, `about-contact.html`, `privacy.html` and `404.html`. If you change one,
change them all and keep them identical (only the `class="is-active"` nav link differs
per page).

## How the enquiry form works

There is **no backend**. On submit, `js/main.js` validates the fields, builds a plain-text
message and opens `https://wa.me/916291413559?text=...` in a new tab. The user just presses
send in WhatsApp. Nothing is stored or transmitted anywhere else.

- WhatsApp number is the constant `WHATSAPP_NUMBER` at the top of `js/main.js`.
- Service cards on `services.html` link to `about-contact.html?service=<name>` and the
  form pre-selects that service.

## Local preview

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to Netlify

**Option A — Git (recommended):**
1. Push this repo to GitHub/GitLab.
2. In Netlify: *Add new site → Import an existing project*, pick the repo.
3. Build command: *(leave empty)*. Publish directory: `.`. Deploy.

**Option B — drag & drop:** zip the project folder and drop it on
<https://app.netlify.com/drop>.

### Connect the domain (`1solutions.space`)

1. Netlify → *Site configuration → Domain management → Add a domain* → `1solutions.space`.
2. Point DNS at Netlify — either:
   - set the domain's nameservers to Netlify DNS, or
   - add an `ALIAS`/`ANME`/`A` record for the apex and a `CNAME` for `www` per Netlify's
     instructions.
3. Netlify provisions HTTPS (Let's Encrypt) automatically once DNS resolves.
4. Set the primary domain and enable "force HTTPS".

> If you deploy to **GitHub Pages** instead: add a `.github/workflows/pages.yml` that
> uploads the repo root as the Pages artifact, set a `CNAME` file containing
> `1solutions.space`, and the `netlify.toml` redirects will need to move into
> `_redirects`-style handling or a 404 fallback (GitHub Pages has no redirect engine).

## Placeholders to replace before launch

| Where | Placeholder | Replace with |
|---|---|---|
| All pages (footer + contact) | `[Shop / Floor No.], Andul Road, Andul, Howrah, West Bengal 711302` | the real street address |
| `about-contact.html` map iframe & directions link | generic "Andul, Howrah" pin | exact address / Google Maps place link (verify the embed renders on the live domain) |
| All pages, testimonials on `index.html` | 3 generic placeholder quotes marked `TODO` | real, attributable client reviews (or delete the section) |
| Footer, all pages | commented-out social icons block | real Facebook/Instagram/LinkedIn URLs, then un-comment |
| `<head>` of all pages | `<!-- Google Analytics 4 — paste snippet here -->` | GA4 tag, if/when wanted |
| Everywhere | `https://1solutions.space` | keep — this is the purchased domain |

## Content still to be reviewed by the client

FAQ answers, the "how it works" steps, service descriptions, the About text and the
Privacy Policy were drafted for review. Read them through and correct anything that
misstates how the firm actually operates (timelines, pricing model, service scope).
