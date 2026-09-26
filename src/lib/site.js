/**
 * ONE place for every business fact on the site.
 *
 * Sources: the client's own menu flyer (Desi Bite, Bahria Enclave) and its
 * public map listings. Anything marked  ⚠ CONFIRM  was not verified with the
 * owner yet — check it before this goes live.
 */
export const site = {
  name: "Desi Bite",
  legalName: "Desi Bite",
  tagline: "Love at first bite.",
  category: "Chinese & Fast Food",
  urduTagline: "دیسی بائٹ — چائنیز اینڈ فاسٹ فوڈ",
  description:
    "Desi Bite is a Chinese & fast food spot in Bahria Enclave, Islamabad — zinger burgers, shawarma, chowmein, fried rice, shashlik and value deals. Free home delivery within 2 km on orders over Rs 350. Order online in a minute.",
  // Real domain via NEXT_PUBLIC_SITE_URL; on Vercel it falls back to the
  // project's production URL automatically (needed for WhatsApp link previews).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://desi-bites-demo-saadkhizar.vercel.app",

  // From the flyer: the WhatsApp icon sits next to 0312-9112607.
  // Format: country code, no +, no spaces (used by wa.me links).
  whatsapp: "923129112607",
  // DEMO MODE: WhatsApp links open the contact picker instead of messaging
  // the restaurant, so test orders from the demo never reach a real number.
  // Set to false once the owner approves the site.
  demoMode: true,
  phones: [
    { display: "0342-5554160", tel: "+923425554160" },
    { display: "0313-5817771", tel: "+923135817771" }, // ⚠ CONFIRM — older printed flyer shows 0304-9991978
  ],
  whatsappDisplay: "0312-9112607",

  address: {
    street: "Ehsan Plaza #14, Shop #1, Commercial Avenue, Sector A",
    area: "Bahria Enclave",
    city: "Islamabad",
    region: "Islamabad Capital Territory",
    postalCode: "44000",
    country: "PK",
    mapQuery: "Desi Bite, Ehsan Plaza, Sector A, Bahria Enclave, Islamabad",
    geo: { lat: 33.691592, lng: 73.21456 },
  },

  delivery: { freeRadiusKm: 2, minOrder: 350 }, // flyer: "Minimum order for free home delivery Rs 350 within 2 km"
  partyOrders: true, // flyer: "We also provide party & functions orders"

  links: {
    facebook: "https://www.facebook.com/p/Desi-bite-100063755482798/",
    instagram: "", // ⚠ add handle when the owner shares it
    google: "https://www.google.com/search?q=desi%20bites%20bahria%20enclave",
  },

  cuisines: ["Chinese", "Fast Food", "Burgers", "Shawarma"],
  priceRange: "Rs 110 – Rs 1,820",

  builtBy: { name: "Neural Stack", url: "#" },
};

export const nav = [
  { href: "#menu", label: "Menu" },
  { href: "#deals", label: "Deals" },
  { href: "#story", label: "Our Kitchen" },
  { href: "#visit", label: "Timings" },
];
