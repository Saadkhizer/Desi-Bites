/**
 * Menu, copied from Desi Bite's own flyer (deals, fries, drinks).
 *
 * ⚠ CONFIRM prices with the owner — the flyer looks like the opening
 *   (2020) print, so current prices are probably higher.
 * ⚠ The flyer only lists deals. Add single items (zinger burger, shawarma,
 *   chowmein, fried rice…) here once the owner shares the full menu.
 *
 * No photos yet: every item has an `art` tile (emoji + colour). When real
 * photos arrive, put them in /public/dishes and set `image: "/dishes/x.jpg"`.
 * `price: null` = price not on the flyer; the site shows "Ask on WhatsApp".
 */

/* ---------- option groups ---------- */
export const DRINK = {
  id: "drink",
  label: "Cold drink",
  type: "single",
  required: true,
  choices: [
    { id: "coke", label: "Coke", delta: 0, default: true },
    { id: "sprite", label: "Sprite", delta: 0 },
    { id: "7up", label: "7up", delta: 0 },
    { id: "pepsi", label: "Pepsi", delta: 0 },
  ],
};

export const SPICE = {
  id: "spice",
  label: "Mirch",
  type: "single",
  required: true,
  choices: [
    { id: "regular", label: "Regular", delta: 0, default: true },
    { id: "spicy", label: "Spicy", delta: 0 },
    { id: "extra", label: "Extra spicy", delta: 0 },
  ],
};

const size = (small, large) => ({
  id: "size",
  label: "Size",
  type: "single",
  required: true,
  choices: [
    { id: "s", label: `Small`, delta: 0, default: true },
    { id: "l", label: `Large`, delta: large - small },
  ],
});

const DEAL = [DRINK, SPICE];

/* ---------- categories ---------- */
export const categories = [
  { id: "student", label: "Student Deals", emoji: "🎓" },
  { id: "deals", label: "Deals", emoji: "🔥" },
  { id: "family", label: "Family Deal", emoji: "👨‍👩‍👧‍👦" },
  { id: "fries", label: "Fries", emoji: "🍟" },
  { id: "drinks", label: "Cold Drinks", emoji: "🥤" },
];

/* ---------- items ---------- */
export const menu = [
  {
    id: "student-1", cat: "student", name: "Student Deal 1",
    desc: "4 Zinger Burgers + 1.5 ltr Coke. Poori gang ka lunch.",
    includes: ["4 × Zinger Burger", "1.5 ltr Coke"],
    price: 1040, art: { emoji: "🍔", hue: "deep" }, tags: ["popular"], options: [SPICE],
  },
  {
    id: "student-2", cat: "student", name: "Student Deal 2",
    desc: "5 Chicken Shawarmas + 1.5 ltr Coke.",
    includes: ["5 × Chicken Shawarma", "1.5 ltr Coke"],
    price: 740, art: { emoji: "🌯", hue: "deep" }, tags: ["popular"], options: [SPICE],
  },
  {
    id: "deal-1", cat: "deals", name: "Deal 1",
    desc: "Zinger Burger, regular drink and small fries.",
    includes: ["Zinger Burger", "Regular Drink", "Small Fries"],
    price: 370, art: { emoji: "🍔", hue: "pop" }, tags: ["popular"], options: DEAL,
  },
  {
    id: "deal-2", cat: "deals", name: "Deal 2",
    desc: "Zinger Shawarma, Chicken Burger, small fries and a regular drink.",
    includes: ["Zinger Shawarma", "Chicken Burger", "Small Fries", "Regular Drink"],
    price: 550, art: { emoji: "🌯", hue: "deep" }, options: DEAL,
  },
  {
    id: "deal-3", cat: "deals", name: "Deal 3",
    desc: "Club Sandwich, Pizza Burger, Chicken Shawarma and a half-litre bottle.",
    includes: ["Club Sandwich", "Pizza Burger", "Chicken Shawarma", "½ ltr Bottle"],
    price: 660, art: { emoji: "🥪", hue: "pop" }, options: DEAL,
  },
  {
    id: "deal-4", cat: "deals", name: "Deal 4",
    desc: "Chicken Shawarma, Zinger Sandwich, Chicken Fried Rice, 2 pc drumsticks and a half-litre drink.",
    includes: ["Chicken Shawarma", "Zinger Sandwich", "Ch. Fried Rice", "2 pc Drumstick", "½ ltr Drink"],
    price: 840, art: { emoji: "🍗", hue: "deep" }, tags: ["popular"], options: DEAL,
  },
  {
    id: "deal-5", cat: "deals", name: "Deal 5",
    desc: "Chicken Shashlik, Veg Chowmein, Chicken Fried Rice, fried wings and a 1 ltr drink.",
    includes: ["Ch. Shashlik", "Veg Chowmein", "Ch. Fried Rice", "Fry Wings", "1 ltr Drink"],
    price: 1100, art: { emoji: "🍜", hue: "pop" }, options: DEAL,
  },
  {
    id: "family", cat: "family", name: "Family Deal",
    desc: "Shashlik, masala rice, chicken platter, chowmein, zinger shawarma, pizza sandwich, fries and a 1.5 ltr drink.",
    includes: ["Ch. Shashlik", "Ch. Masala Rice", "Chicken Platter", "Ch. Chowmein", "Zinger Shawarma", "Pizza Sandwich", "French Fries", "1.5 ltr Drink"],
    price: 1820, art: { emoji: "🍱", hue: "deep" }, tags: ["popular"], options: DEAL,
  },
  {
    id: "french-fries", cat: "fries", name: "French Fries",
    desc: "Crispy, golden, salted right. Small Rs 110 · Large Rs 150.",
    price: 110, art: { emoji: "🍟", hue: "pop" }, options: [size(110, 150)],
  },
  {
    id: "mayo-fries", cat: "fries", name: "Mayo Fries",
    desc: "Fries loaded with creamy mayo. Small Rs 130 · Large Rs 180.",
    price: 130, art: { emoji: "🍟", hue: "deep" }, tags: ["popular"], options: [size(130, 180)],
  },
  {
    id: "cheese-fries", cat: "fries", name: "Cheese Fries",
    desc: "Fries under a blanket of melted cheese. Small Rs 140 · Large Rs 180.",
    price: 140, art: { emoji: "🧀", hue: "pop" }, options: [size(140, 180)],
  },
  { id: "coke", cat: "drinks", name: "Coke", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "deep" } },
  { id: "sprite", cat: "drinks", name: "Sprite", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "pop" } },
  { id: "7up", cat: "drinks", name: "7up", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "deep" } },
  { id: "pepsi", cat: "drinks", name: "Pepsi", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "pop" } },
  { id: "water", cat: "drinks", name: "Mineral Water", desc: "Chilled.", price: null, art: { emoji: "💧", hue: "deep" } },
];

export const popularIds = ["deal-1", "student-1", "family", "deal-4", "student-2", "mayo-fries"];

export const byId = Object.fromEntries(menu.map((m) => [m.id, m]));
export const popular = popularIds.map((id) => byId[id]);
export const deals = menu.filter((m) => ["student", "deals", "family"].includes(m.cat));

/** "Rs 1,040" — or the fallback text when the flyer has no price. */
export const formatPKR = (n) => (n == null ? "Ask price" : `Rs ${Math.round(n).toLocaleString("en-PK")}`);
