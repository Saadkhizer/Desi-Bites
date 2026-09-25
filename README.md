# Desi Bites — demo website

Homemade Pakistani food, Islamabad. A one-page ordering site built as a client demo by Neural Stack.

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
| Hero | Headline + Urdu tagline, 4.9★ Foodpanda proof, 3-card dish stack with scroll parallax, real review card |
| Ribbon | Tilted marquee of signature dishes |
| Sab ki pasand | The 6 most-ordered dishes. **Signature motion:** "pill wave", a diagonal bouncy stagger |
| Handi se darwaze tak | **Free scroll-world:** pinned stage, scroll rotates a plate while each chapter's dish wipes in through a growing circle, a progress ring fills, and spices drift at different depths. No video, no Higgsfield credits |
| Order direct band | The one deep-colour band: mirch level, WhatsApp ordering, cash on delivery |
| Full menu | All 50 Foodpanda items, sticky category chips with scrollspy, live search, compact list on mobile |
| Item sheet | Mirch level (kam/normal/tez, since reviews asked for fewer chillies), paid sides, special note, qty stepper, live price |
| Cart → checkout | Drawer (desktop) / bottom sheet (mobile), Delivery/Pickup, PK phone validation, cutlery opt-in, then sends the whole order to WhatsApp |
| Reviews | 14 real Foodpanda reviews in two counter-scrolling rows |
| Timings & map | Live "Open now" in Pakistan time, today's row highlighted, Google Maps embed |
| FAQ | Native accordions + FAQPage schema |

## SEO built in

- Full `metadata` (title template, description, keywords, canonical, Open Graph, Twitter)
- JSON-LD **Restaurant** schema with the full **Menu** (every item + PKR price), opening hours, aggregate rating, reviews, plus a **FAQPage**
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon, and a generated 1200×630 Open Graph image
- All menu text is server-rendered HTML; animations only enhance it (content stays readable with JS off)

## ⚠ Confirm with the client before going live

All of these live in **`src/lib/site.js`**, `src/lib/menu.js` or `src/lib/hours.js`:

1. **Name**: Foodpanda says "Desi Bites", Google/Facebook say "Desi Bite".
2. **WhatsApp / phone**: `923425554160` came from a public map listing, not from the client.
3. **Address**: Foodpanda says House 15, Street 25, Korang Town. Google Maps shows "Desi Bite" in Bahria Enclave Sector A. Also check the map pin (`geo`).
4. **Prices**: these are Foodpanda list prices. Direct orders can be cheaper (no commission).
5. **Hours**: copied from Foodpanda (every day till 3 AM).
6. **Photos**: loaded from the client's Foodpanda CDN. Put real photos in `/public/dishes/` and change `image` paths.
7. **Instagram handle**: goes in `site.links.instagram`.
8. **Domain**: set `NEXT_PUBLIC_SITE_URL` in Vercel.

## Deploy (free)

Push to GitHub, import the repo on Vercel (Hobby plan), add `NEXT_PUBLIC_SITE_URL`, and deploy. Nothing else to configure.

## Change the look

The whole palette is one `:root` block in `src/app/globals.css` ("Masala" duotone: brick-chilli deep + haldi pop on warm cream, all contrast-checked). Motion timings are in `src/lib/motion.js`.
