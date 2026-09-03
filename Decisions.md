# 1 Solutions — Decision Log

Record of the grilling session that defined the website. Each entry: the question, the
options considered, and the decision reached.

---

## Round 1 — Foundations

### D1 — Site scope
**Q:** One-page landing (like `sample.html`), full multi-page site, or something between?
**Decision:** In-between — a strong home page **plus a Services page plus a combined About & Contact page**. A pure one-pager undersells ~30 services; a full per-service-page site is a content project that can't be filled yet.

### D2 — Tech stack
**Q:** Plain hand-written HTML/CSS/JS, a static-site framework (Astro/Next static), or a full Next.js app?
**Decision:** **Plain HTML/CSS/JS**, multi-file, shared stylesheet, no build step. It's a brochure site; no framework earns its keep.

### D3 — Relationship to `sample.html`
**Q:** Use it as the base, rebuild fresh, or keep structure and restyle?
**Decision:** **Rebuild fresh.** Use the sample only as a content/structure reference — its visual design reads as a generic template.

### D4 — Visual direction
**Q:** Navy + gold "authority" (poster), blue + orange "growth" (logo), or a bridge?
**Decision:** **Blue + orange, clean sans-serif, modern/growth direction** — matches the actual logo. Drop the poster's tricolour / India-landmark motifs.

### D5 — Hosting & domain
**Q:** Vercel / Netlify / GitHub Pages? Domain owned?
**Decision:** **Netlify.** Domain already bought: **`1solutions.space`**.

### D6 — Lead-capture backend
**Q:** Formspree / Web3Forms / Google Form / WhatsApp-only?
**Decision:** **Form exists, but submitting it opens WhatsApp** to the 1 Solutions number with all entered details prefilled as a message. User only taps send. No server, no third-party form service.

### D7 — Content authenticity
**Q:** The sample's stats ("500+ experts", "50,000+ businesses"), testimonials, and blog — real or invented?
**Decision:** **Soft non-numeric claims** instead of invented stats. Testimonials → generic placeholders. Blog → dropped for now. Add AI/stock imagery (handshake, consultation room, etc.).

### D8 — Service list structure
**Q:** Group into categories or one flat list?
**Decision:** **Grouped into 4 categories** (few per group on the home page, full list on the Services page).

---

## Round 2 — Structure & assets

### D9 — Canonical name
**Decision:** **"1 Solutions"** — nothing else. Tagline: "Your One Stop Solution for Business & Legal Needs".

### D10 — Netlify vs GitHub Pages + repo
**Decision:** **Netlify.** Initialize a **git repo** with `netlify.toml` and a README covering domain connection.

### D11 — Third page shape
**Decision:** **Combined About + Contact** as one page. Three content pages: Home, Services, About & Contact. (A Privacy Policy page was later added — see D20.)

### D12 — Home page sections
**Decision:** Order: header/nav → hero + WhatsApp lead form → trust strip → services by 4 categories → how-it-works → why choose us → testimonials (placeholder) → FAQ → CTA band → footer + floating WhatsApp.
**Dropped:** the "1 Solutions vs Others" comparison table (reads as defensive/cheap).
**Added:** FAQ section (SEO value, pre-empts questions).

### D13 — Images
**Q:** User-generated AI images, real stock photos, or no-people brand illustration?
**Decision:** **Real stock photos** (Unsplash/Pexels — no licensing doubt) for hero and section backdrops.

### D14 — WhatsApp lead form
**Decision:** Fields: **Full Name, Phone (+91), Service, Email.** Client-side validation, then open `wa.me/916291413559` with a prefilled message. Destination number: **6291413559**. Message:
```
Hi 1 Solutions, I'd like a free consultation.
Name: {name}
Phone: {phone}
Email: {email}
Service: {service}
```

### D15 — Assets & facts
**Decision:** **Clean/crop the logo** (`Logo.jpeg` has a white box → make transparent). All other real facts (address, hours, second phone, socials, credentials) → **fillers for now**.

---

## Round 3 — Content & SEO

### D16 — Service taxonomy
**Decision:** 4 categories, used as-is. **Trademark moved to Legal & Documentation.**

- **Business Setup & Registration** — Private Limited, LLP, OPC, Partnership Firm, Sole Proprietorship, Section 8 Company, Trust / Society / NGO, MSME (Udyam), Digital Signature Certificate (DSC), Trade License, FSSAI License, Drug License / Pharmacy, Government Contractor (GeM) Registration
- **Tax & Compliance** — GST Registration & Return Filing, Income Tax Return (ITR) Filing, TDS Filing & Compliance, Annual Compliance & ROC Filings
- **Accounting & Finance** — Bookkeeping & Accounting, Payroll, Project Report Preparation, MSME / Business Loan Assistance
- **Legal & Documentation** — Trademark Registration, Rent / Lease Agreement, Tenant Police Verification, Will / Sale Deed / Gift Deed, Affidavits & Declarations, Legal Heir Certificate, Notary Services

### D17 — Domain
**Decision:** **`1solutions.space`**. Placeholder during dev: `1solutions.netlify.app`. Single swappable constant.

### D18 — Typography
**Decision:** **Plus Jakarta Sans** (headings) + **Inter** (body), via Google Fonts. (Avoids Poppins, which every competitor uses.)

### D19 — Stock images: hotlink vs commit
**Decision:** **Download, optimize, and commit** into `/images` (WebP, < ~150 KB each). No hotlink dependency.

### D20 — FAQ & "How it works" content
**Decision:** Claude **drafts, user reviews before ship.**
Process framing: **Enquire → Free Consultation → Share Documents → We File & Deliver.**
Service area: **pan-India remote service** claimed.

### D21 — SEO / schema / analytics
**Decision:** `ProfessionalService` / `LocalBusiness` **schema.org markup: yes.** Geo: **Kolkata-led, India-secondary.** **Analytics: none now** — GA4 snippet left commented in `<head>`.

### D22 — Privacy Policy + favicon/OG
**Decision:** Add a **lightweight Privacy Policy page**, footer-linked only. Generate **favicon + OG image** derived from the logo mark.

---

## Round 4 — Build details

### D23 — Featured services on home page
**Decision:** **4 featured services per category** (16 cards, grouped), Claude picks the obvious ones, "View all →" under each group links into the Services page.

### D24 — Filler contact details
**Decision:**
- **Hours:** Mon–Sat, 10:00 AM – 7:00 PM; Sunday closed
- **Phone:** single number, 6291413559
- **Social icons:** **hidden** until real URLs exist
- **Credentials:** none shown

### D25 — Map on About & Contact
**Decision:** **Embed a keyless Google Map** (`google.com/maps?q=...&output=embed`) on a **filler address in Andul, Howrah**.

### D26 — Testimonials
**Decision:** **Generic placeholders** ("— Business Owner, Kolkata") with a `TODO` comment. Keeps the section's visual rhythm; no fabricated names. (Sample's 3 named quotes treated as not-real.)

### D27 — Colour palette
**Decision:**
| Token | Hex |
|---|---|
| Navy (text / dark sections) | `#0B2A4A` |
| Primary blue | `#1C6FB8` |
| Accent orange | `#F26722` |
| Orange light (gradients) | `#F7941D` |
| Page background | `#F7FAFC` |
| WhatsApp green | `#25D366` |

CTAs use the blue→orange gradient; body text is navy on white.

### D28 — Address reconciliation
**Decision:** Single filler address everywhere (footer, About & Contact, schema, map pin):
> **1 Solutions**, [Shop/Floor No.], Andul Road, Andul, Howrah, West Bengal 711302

### D29 — Build output & structure
**Decision:** Git repo, no build step:
```
/  index.html  services.html  about-contact.html  privacy.html
   /css/styles.css
   /js/main.js
   /images/  (logo-cleaned.png, favicon.png, favicon.svg, og.png, ~8 stock .webp)
   netlify.toml  robots.txt  sitemap.xml  README.md
```
Shared header/footer **hand-duplicated** across the 4 pages. Favicon = stylized "1" mark. OG image = cropped from `Poster.jpeg`. Stock photos fetched → cropped → WebP → committed. Image work done with Python/Pillow (no ImageMagick available).
