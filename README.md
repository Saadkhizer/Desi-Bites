# Desi Bite — demo website

Chinese & Fast Food, Bahria Enclave, Islamabad. A one-page ordering site built as a client demo by Neural Stack.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll · Motion (`motion/react`) · self-hosted fonts via `@fontsource`. No database, no paid services, no API keys.

## Run it (Windows / PowerShell, one command per line)

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Production check:

```powershell
npm run build
npm start
```

## What's on the page

| Section | What it does |
| --- | --- |
| Hero | "Love at first bite." headline, the owner's flyer art, two deal tiles, a real Google review, scroll parallax |
| Ribbon | Tilted marquee of dishes |
| Top deals | Six picks. **Signature motion:** "pill wave", a diagonal bouncy stagger |
| Counter se darwaze tak | **Free scroll-world:** pinned stage, a rotating plate, circle-wipe chapters, a progress ring and drifting spices |
| Order direct band | Drink and spice choice, WhatsApp ordering, free delivery within 2 km (Rs 350+) |
| Deals marquee | Every flyer deal as a ticket in two counter-scrolling rows (pauses on hover, add from the ticket), plus the Google review |
| Full menu | Student deals, deals, family deal, fries (S/L), drinks. Sticky chips with scrollspy and live search |
| Item sheet | Cold drink pick, spice level, fries size, note, qty stepper, live price |
| Cart → checkout | Drawer / bottom sheet, Delivery/Pickup, free-delivery rule, PK phone validation, then a WhatsApp handoff |
| Timings & map | Live "Open now" in Pakistan time, today highlighted, Google Maps embed |
| FAQ | Delivery, party orders, payment. Native accordions + FAQPage schema |

## SEO built in

- Full `metadata` (title template, description, keywords, canonical, Open Graph, Twitter)
- JSON-LD **Restaurant** schema with the full **Menu** (every item + PKR price), opening hours, aggregate rating, reviews, plus a **FAQPage**
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon, and a generated 1200×630 Open Graph image
- All menu text is server-rendered HTML; animations only enhance it (content stays readable with JS off)

## ⚠ Confirm with the client before going live

Client: **Desi Bite — Chinese & Fast Food**, Ehsan Plaza #14, Shop #1, Commercial Avenue, Sector A, Bahria Enclave, Islamabad. Data comes from the owner's own menu flyer plus public map listings. Everything lives in `src/lib/site.js`, `src/lib/menu.js` and `src/lib/hours.js`.

1. **Prices**: copied from the flyer, which looks like the 2020 opening print, so they are probably out of date.
2. **Full menu**: the flyer lists only deals, fries and drinks. Add single items (zinger burger, shawarma, chowmein, fried rice, shashlik…) and drink prices.
3. **Phones**: 0342-5554160 and 0313-5817771 (an older print shows 0304-9991978). WhatsApp is 0312-9112607.
4. **Hours**: 12 PM – 12:30 AM daily, from the public map listing.
5. **Photos**: no dish photos yet. Items show branded emoji tiles. Put real photos in `/public/dishes/` and set `image` on each item.
6. **Reviews**: there is only one clearly positive public Google review so far. Ask the owner to collect more; never invent them.
7. **Demo mode**: `demoMode: true` makes WhatsApp open the contact picker instead of messaging the shop. Set it to `false` at launch.
8. **Domain**: set `NEXT_PUBLIC_SITE_URL` in Vercel.

## Deploy (free)

Push to GitHub, import the repo on Vercel (Hobby plan), add `NEXT_PUBLIC_SITE_URL`, and deploy. Nothing else to configure.

## Change the look

The whole palette is one `:root` block in `src/app/globals.css` ("Masala" duotone: brick-chilli deep + haldi pop on warm cream, all contrast-checked). Motion timings are in `src/lib/motion.js`.
