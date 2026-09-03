# 1 Solutions — Website Build Spec

Consolidated, build-ready specification. Derived from `Decisions.md`. Where this file and
`Decisions.md` disagree, this file wins.

---

## 1. Overview

| | |
|---|---|
| **Client** | 1 Solutions — a professional firm in Howrah / Kolkata, West Bengal, India |
| **Business** | One-stop provider of business registration, tax & compliance, accounting, and legal/documentation services |
| **Goal of site** | Credibility + lead generation. Primary conversion = WhatsApp enquiry. |
| **Type** | 4-page hand-coded static site, no build step |
| **Hosting** | Netlify |
| **Domain** | `1solutions.space` (dev placeholder: `1solutions.netlify.app`) — single swappable constant |
| **Reference material** | `sample.html` (content/structure only), `resources/Logo.jpeg`, `resources/Poster.jpeg`, `resources/sample_form.jpeg` |

---

## 2. Pages

| File | Purpose | In main nav |
|---|---|---|
| `index.html` | Home | Yes |
| `services.html` | Full service catalogue, all 4 categories | Yes |
| `about-contact.html` | Firm story, why-us, contact details, map, lead form | Yes |
| `privacy.html` | Privacy Policy | Footer only |

---

## 3. Brand & Visual System

### Name & tagline
- Wordmark: **1 Solutions**
- Tagline: **Your One Stop Solution for Business & Legal Needs**

### Direction
Modern / growth. Clean sans-serif. Blue + orange from the logo. **No** tricolour, Ashoka
chakra, or India-landmark motifs from the poster.

### Colour tokens (CSS custom properties)
```css
--navy:        #0B2A4A;  /* body text, dark sections */
--blue:        #1C6FB8;  /* primary, links, heading accents */
--orange:      #F26722;  /* accent, CTAs, highlights */
--orange-light:#F7941D;  /* gradient partner */
--bg:          #F7FAFC;  /* page background; white for alternating sections */
--wa-green:    #25D366;  /* WhatsApp button */
```
- CTA buttons: blue→orange linear gradient.
- Body text: `--navy` on white.

### Typography (Google Fonts)
- Headings: **Plus Jakarta Sans** (600/700/800)
- Body: **Inter** (400/500/600)
- Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

### Iconography
Font Awesome 6 (CDN), as in the sample.

---

## 4. Home Page (`index.html`)

Section order — do not reorder:

1. **Header / nav** — logo left; nav links (Home, Services, About & Contact); phone + WhatsApp button right. Sticky. Mobile: hamburger.
2. **Hero** — headline + subcopy (soft claims, no invented numbers) on the left; **WhatsApp lead form** card on the right. Background: stock photo, darkened with a navy overlay.
3. **Trust strip** — 4 items from the poster: Trusted Service · Fast & Reliable · Affordable Price · Expert Support. Icon + label only.
4. **Services by category** — 4 groups (see §6). Each group: heading + 4 featured service cards + "View all &rarr;" link to `services.html#<category-anchor>`.
5. **How it works** — 4 steps: **Enquire → Free Consultation → Share Documents → We File & Deliver**. Numbered, horizontal on desktop / stacked on mobile.
6. **Why choose us** — 4–6 cards. Soft, non-numeric ("Dedicated expert for every client", "Transparent all-inclusive pricing", "End-to-end handling", "Trusted by businesses across India").
7. **Testimonials** — slider/carousel, **3 generic placeholder quotes** ("— Business Owner, Kolkata"). `<!-- TODO: replace with real client reviews -->`.
8. **FAQ** — ~6 Q&As (see §8). Accordion or plain definition list.
9. **CTA band** — navy background, "Ready to get started?" + WhatsApp button.
10. **Footer** — see §9.
11. **Floating WhatsApp button** — fixed bottom-right, all pages.

---

## 5. Lead Form (WhatsApp hand-off)

Appears in the home hero and on `about-contact.html`.

### Fields (all required)
| Field | Type | Notes |
|---|---|---|
| Full Name | text | |
| Phone Number | tel | `+91` prefix shown; validate 10 digits |
| Service | select | options = the full service list from §6, grouped with `<optgroup>` by category, plus a leading "Select a service" and trailing "Other" |
| Email | email | standard email validation |

### Behaviour
1. On submit, **prevent default**, run client-side validation, show inline errors.
2. On valid, build the message text:
   ```
   Hi 1 Solutions, I'd like a free consultation.
   Name: {name}
   Phone: {phone}
   Email: {email}
   Service: {service}
   ```
3. `window.open("https://wa.me/916291413559?text=" + encodeURIComponent(message), "_blank")`.
4. No network request. No data stored. No third-party form service.
5. Include a hidden honeypot field; if filled, silently no-op.

### Destination
WhatsApp number: **6291413559** → `wa.me/916291413559`.

---

## 6. Services & Taxonomy

4 categories. Home page shows the **4 bold** items per category as featured cards;
`services.html` lists all.

### Business Setup & Registration  `#business-setup`
- **Private Limited Company Registration**
- **LLP Registration**
- One Person Company (OPC) Registration
- Partnership Firm Registration
- Sole Proprietorship Registration
- Section 8 Company Registration
- Trust / Society / NGO Registration
- **MSME (Udyam) Registration**
- Digital Signature Certificate (DSC)
- **Trade License**
- FSSAI License
- Drug License / Pharmacy Registration
- Government Contractor (GeM) Registration

### Tax & Compliance  `#tax-compliance`
- **GST Registration & Return Filing**
- **Income Tax Return (ITR) Filing**
- **TDS Filing & Compliance**
- **Annual Compliance & ROC Filings**

### Accounting & Finance  `#accounting-finance`
- **Bookkeeping & Accounting**
- **Payroll Processing**
- **Project Report Preparation**
- **MSME / Business Loan Assistance**

### Legal & Documentation  `#legal-documentation`
- **Trademark Registration**
- **Rent / Lease Agreement**
- Tenant Police Verification
- **Will / Sale Deed / Gift Deed**
- Affidavits & Declarations
- Legal Heir Certificate
- Notary Services

> Featured on home (fallback if a category has <4 bold above): pick the most common /
> highest-intent services for that category.

---

## 7. Services Page (`services.html`)

- Short intro paragraph (one-stop, pan-India remote, end-to-end).
- One section per category with the anchor id from §6, each service as a card: icon +
  name + 1-line description (Claude drafts descriptions; user reviews).
- Each service card's CTA = the same WhatsApp hand-off, pre-selecting that service in the
  message (`Service: {name}`).
- No individual service pages.

---

## 8. Copy to be drafted (Claude drafts → user reviews before ship)

### How it works — 4 steps
Enquire (form/WhatsApp/call) → Free Consultation (expert reviews your need, quotes an
all-inclusive price) → Share Documents (send scans on WhatsApp/email) → We File & Deliver
(we handle filing and follow-ups, you get the certificate/output).

### FAQ — ~6 questions
Suggested set (final wording drafted by Claude):
1. How long does company / GST registration take?
2. What documents do I need to get started?
3. Do you work with clients outside Kolkata / West Bengal?  → Yes, pan-India, remotely.
4. How are your fees structured?  → All-inclusive quote after a free consultation; no hidden charges.
5. How do I share my documents securely?
6. Do you handle ongoing compliance after registration?  → Yes (annual filings, GST returns, bookkeeping).

Keep answers factual and non-committal on exact prices/timelines.

### Other prose
- Hero headline + subcopy
- Trust strip labels, Why-choose-us cards
- About section (firm positioning: one-stop, professional, affordable, expert support — no
  invented founding year, team size, or credentials)
- Privacy Policy body (see §10)

---

## 9. Footer (all pages)

- Left: logo + one-line description + copyright "© 2026 1 Solutions. All rights reserved."
- Middle: quick links (Home, Services, About & Contact, Privacy Policy)
- Right: contact block —
  - Address: **[Shop/Floor No.], Andul Road, Andul, Howrah, West Bengal 711302**
  - Phone: **6291413559** (`tel:+916291413559`)
  - Email: **services.1solutions92@gmail.com**
  - WhatsApp link
- **Social icons: hidden** (no real URLs yet — leave commented-out markup).
- Hours (footer or contact page): **Mon–Sat, 10:00 AM – 7:00 PM · Sunday closed**

---

## 10. About & Contact Page (`about-contact.html`)

- About block: firm positioning prose (§8).
- Why-us (can reuse home cards).
- Contact details block: address, phone, email, WhatsApp, hours.
- **Embedded map** — keyless iframe:
  `https://www.google.com/maps?q=Andul,+Howrah,+West+Bengal+711302&output=embed`
  with a "Get Directions" link (placeholder, easy to point at a real pin later).
- Lead form (same as §5).

---

## 11. Privacy Policy (`privacy.html`)

Lightweight. Cover:
- What is collected: name, phone, email, selected service — only what you type into the form.
- How it is used: the form opens WhatsApp with these details as a message; submission is
  entirely on your device until you press send in WhatsApp.
- No cookies set by us; no analytics currently; no data sold or shared with third parties.
- Contact for privacy questions: services.1solutions92@gmail.com.
- "Last updated" date.

Footer-linked only; not in main nav.

---

## 12. SEO & Metadata

- Unique `<title>` and `<meta name="description">` per page. Pattern:
  `<Page> | 1 Solutions — Business & Legal Services in Kolkata`.
- Geo emphasis: **Kolkata / Howrah led, India secondary**.
- `<link rel="canonical">` per page using the domain constant.
- Open Graph + Twitter Card tags; `og:image` = `/images/og.png` (cropped from `Poster.jpeg`).
- **JSON-LD `ProfessionalService`** in `<head>` of every page: name, description, url,
  telephone, email, address (PostalAddress, Andul/Howrah/711302), areaServed "IN",
  openingHours "Mo-Sa 10:00-19:00", image.
- `robots.txt` (allow all, point to sitemap) + `sitemap.xml` (4 URLs).
- **GA4**: leave a commented `<!-- Google Analytics 4 — paste snippet here -->` block in
  `<head>`. No tracking active.

---

## 13. Assets (`/images/`) — produced with Python / Pillow

| File | Source | Spec |
|---|---|---|
| `logo-cleaned.png` | `resources/Logo.jpeg` | white background → transparent, auto-cropped, ~600px wide |
| `favicon.svg` | drawn | stylized "1" mark in brand gradient on rounded square |
| `favicon.png` | from svg / drawn | 512×512 and/or 32×32 |
| `og.png` | crop of `resources/Poster.jpeg` | 1200×630 |
| ~8 stock `.webp` | Unsplash/Pexels | hero, team/meeting, documents/signing, accounting, office, handshake, consultation, building. Downloaded → cropped → WebP, target < 150 KB each |

Deferred: user may later supply specific AI-generated framed shots to slot in.

---

## 14. Repo Structure

```
/
  index.html
  services.html
  about-contact.html
  privacy.html
  css/
    styles.css          # single shared stylesheet, :root tokens
  js/
    main.js             # nav toggle, form → WhatsApp, testimonial slider, FAQ accordion
  images/
    logo-cleaned.png  favicon.svg  favicon.png  og.png
    hero.webp  team.webp  docs.webp  accounting.webp  office.webp
    handshake.webp  consult.webp  building.webp
  netlify.toml
  robots.txt
  sitemap.xml
  README.md             # local preview + Netlify deploy + domain (1solutions.space) steps
  Decisions.md
  Spec.md
  resources/             # original client material (kept, not served)
  sample.html            # reference, not deployed
```

- **No build step.** Shared header/nav/footer are hand-duplicated across the 4 HTML files
  (keep them byte-identical; note this in README).
- `netlify.toml`: publish `.`, no build command, basic security headers, pretty-URL /
  404 handling.

---

## 15. Non-negotiables / guardrails

- No invented numbers, statistics, client names, testimonials, founding year, team size,
  certifications, or credentials.
- No exact price or guaranteed-timeline claims in copy.
- All real-world specifics not yet provided (street number, socials, second phone) stay as
  clearly-marked placeholders / hidden, never fabricated.
- The form never transmits data anywhere except the user-initiated WhatsApp message.
- Draft copy (FAQ, how-it-works, service descriptions, about, privacy) is reviewed by the
  client before the site is considered done.
