/**
 * ONE place for every business fact on the site.
 *
 * Source: Foodpanda listing (foodpanda.pk/restaurant/yu49/desi-bites-yu49),
 * read 25 Sep 2026. Anything marked  ⚠ CONFIRM  was NOT verified with the
 * client yet — check it before this goes live.
 */
export const site = {
  name: "Desi Bites", // ⚠ CONFIRM — Foodpanda says "Desi Bites", Google/Facebook say "Desi Bite"
  legalName: "Desi Bites",
  tagline: "Ghar jaisa khana, roz taaza.",
  urduTagline: "گھر جیسا کھانا، روز تازہ",
  description:
    "Desi Bites cooks homemade Pakistani food in Islamabad — daal chawal, chicken haleem, chana pulao, achari keema, Lahori chanay and more. Fresh every day, hygienic, and delivered hot. Order online in a minute.",
  // Real domain via NEXT_PUBLIC_SITE_URL; on Vercel it falls back to the
  // project's production URL automatically (needed for WhatsApp link previews).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://desi-bites.vercel.app",

  // ⚠ CONFIRM — this number comes from a public map listing, not the client.
  // Format: country code, no +, no spaces (used by wa.me links).
  whatsapp: "923425554160",
  phoneDisplay: "+92 342 555 4160",

  address: {
    street: "House 15, Street 25, Korang Town", // Foodpanda listing
    area: "Korang Town",
    city: "Islamabad",
    region: "Islamabad Capital Territory",
    postalCode: "44000",
    country: "PK",
    // ⚠ CONFIRM — Google Maps shows "Desi Bite" at Bahria Enclave, Sector A.
    // If that is the real kitchen, change street/area above.
    mapQuery: "Desi Bites, Korang Town, Islamabad",
    geo: { lat: 33.6559, lng: 73.1639 }, // approximate — replace with the Google pin
  },

  rating: { value: 4.9, count: 2000, source: "Foodpanda" },

  links: {
    foodpanda: "https://www.foodpanda.pk/restaurant/yu49/desi-bites-yu49",
    facebook: "https://www.facebook.com/p/Desi-bite-100063755482798/",
    instagram: "", // ⚠ add handle when the client shares it
    google: "https://www.google.com/search?kgmid=/g/11lh5p6wg6&q=Desi%20Bite",
  },

  cuisines: ["Pakistani", "Desi", "Homemade", "Chinese"],
  priceRange: "Rs 200 – Rs 950",

  builtBy: { name: "Neural Stack", url: "#" },
};

export const nav = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Our Kitchen" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Timings" },
];
