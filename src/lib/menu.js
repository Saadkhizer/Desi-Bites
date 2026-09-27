/**
 * Menu, copied from Desi Bite's own flyer (deals, fries, drinks).
 *
 * ⚠ CONFIRM prices with the owner — the flyer looks like the opening
 *   (2020) print, so current prices are probably higher.
 * ⚠ The flyer only lists deals. Add single items (zinger burger, shawarma,
 *   chowmein, fried rice…) here once the owner shares the full menu.
 *
 * Photos: the restaurant has no product photos online, so each item uses a
 * free, commercially-usable photo from Unsplash (unsplash.com/license) that
 * matches the dish. They are REPRESENTATIVE images, not Desi Bite's own food.
 * When the owner shares real photos, drop them in /public/dishes and set
 * `image: "/dishes/x.jpg"`. `art` (emoji tile) is the fallback if a photo fails.
 * `price: null` = price not on the flyer; the site shows "Ask on WhatsApp".
 */

/** Unsplash CDN image (resized/cropped by src/lib/dishImage.js). */
const us = (id) => `https://images.unsplash.com/photo-${id}`;

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
    id: "student-1", image: us("1637710847214-f91d99669e18"), cat: "student", name: "Student Deal 1",
    desc: "4 Zinger Burgers + 1.5 ltr Coke. Poori gang ka lunch.",
    includes: ["4 × Zinger Burger", "1.5 ltr Coke"],
    price: 1040, art: { emoji: "🍔", hue: "deep" }, tags: ["popular"], options: [SPICE],
  },
  {
    id: "student-2", image: us("1529006557810-274b9b2fc783"), cat: "student", name: "Student Deal 2",
    desc: "5 Chicken Shawarmas + 1.5 ltr Coke.",
    includes: ["5 × Chicken Shawarma", "1.5 ltr Coke"],
    price: 740, art: { emoji: "🌯", hue: "deep" }, tags: ["popular"], options: [SPICE],
  },
  {
    id: "deal-1", image: us("1551782450-a2132b4ba21d"), cat: "deals", name: "Deal 1",
    desc: "Zinger Burger, regular drink and small fries.",
    includes: ["Zinger Burger", "Regular Drink", "Small Fries"],
    price: 370, art: { emoji: "🍔", hue: "pop" }, tags: ["popular"], options: DEAL,
  },
  {
    id: "deal-2", image: us("1681072530653-db8fe2538631"), cat: "deals", name: "Deal 2",
    desc: "Zinger Shawarma, Chicken Burger, small fries and a regular drink.",
    includes: ["Zinger Shawarma", "Chicken Burger", "Small Fries", "Regular Drink"],
    price: 550, art: { emoji: "🌯", hue: "deep" }, options: DEAL,
  },
  {
    id: "deal-3", image: us("1553909489-cd47e0907980"), cat: "deals", name: "Deal 3",
    desc: "Club Sandwich, Pizza Burger, Chicken Shawarma and a half-litre bottle.",
    includes: ["Club Sandwich", "Pizza Burger", "Chicken Shawarma", "½ ltr Bottle"],
    price: 660, art: { emoji: "🥪", hue: "pop" }, options: DEAL,
  },
  {
    id: "deal-4", image: us("1742936401708-dd1b132f06db"), cat: "deals", name: "Deal 4",
    desc: "Chicken Shawarma, Zinger Sandwich, Chicken Fried Rice, 2 pc drumsticks and a half-litre drink.",
    includes: ["Chicken Shawarma", "Zinger Sandwich", "Ch. Fried Rice", "2 pc Drumstick", "½ ltr Drink"],
    price: 840, art: { emoji: "🍗", hue: "deep" }, tags: ["popular"], options: DEAL,
  },
  {
    id: "deal-5", image: us("1585032226651-759b368d7246"), cat: "deals", name: "Deal 5",
    desc: "Chicken Shashlik, Veg Chowmein, Chicken Fried Rice, fried wings and a 1 ltr drink.",
    includes: ["Ch. Shashlik", "Veg Chowmein", "Ch. Fried Rice", "Fry Wings", "1 ltr Drink"],
    price: 1100, art: { emoji: "🍜", hue: "pop" }, options: DEAL,
  },
  {
    id: "family", image: us("1634864572872-a01c21e388d4"), cat: "family", name: "Family Deal",
    desc: "Shashlik, masala rice, chicken platter, chowmein, zinger shawarma, pizza sandwich, fries and a 1.5 ltr drink.",
    includes: ["Ch. Shashlik", "Ch. Masala Rice", "Chicken Platter", "Ch. Chowmein", "Zinger Shawarma", "Pizza Sandwich", "French Fries", "1.5 ltr Drink"],
    price: 1820, art: { emoji: "🍱", hue: "deep" }, tags: ["popular"], options: DEAL,
  },
  {
    id: "french-fries", image: us("1598679253544-2c97992403ea"), cat: "fries", name: "French Fries",
    desc: "Crispy, golden, salted right. Small Rs 110 · Large Rs 150.",
    price: 110, art: { emoji: "🍟", hue: "pop" }, options: [size(110, 150)],
  },
  {
    id: "mayo-fries", image: us("1763208385612-fbbf89e4a5ed"), cat: "fries", name: "Mayo Fries",
    desc: "Fries loaded with creamy mayo. Small Rs 130 · Large Rs 180.",
    price: 130, art: { emoji: "🍟", hue: "deep" }, tags: ["popular"], options: [size(130, 180)],
  },
  {
    id: "cheese-fries", image: us("1639744210631-209fce3e256c"), cat: "fries", name: "Cheese Fries",
    desc: "Fries under a blanket of melted cheese. Small Rs 140 · Large Rs 180.",
    price: 140, art: { emoji: "🧀", hue: "pop" }, options: [size(140, 180)],
  },
  { id: "coke", image: us("1622708862830-a026e3ef60bd"), cat: "drinks", name: "Coke", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "deep" } },
  { id: "sprite", image: us("1690988109041-458628590a9e"), cat: "drinks", name: "Sprite", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "pop" } },
  { id: "7up", image: us("1624517286326-62fc932dffca"), cat: "drinks", name: "7up", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "deep" } },
  { id: "pepsi", image: us("1629203851122-3726ecdf080e"), cat: "drinks", name: "Pepsi", desc: "Chilled.", price: null, art: { emoji: "🥤", hue: "pop" } },
  { id: "water", image: us("1616118132534-381148898bb4"), cat: "drinks", name: "Mineral Water", desc: "Chilled.", price: null, art: { emoji: "💧", hue: "deep" } },
];

export const popularIds = ["deal-1", "student-1", "family", "deal-4", "student-2", "mayo-fries"];

export const byId = Object.fromEntries(menu.map((m) => [m.id, m]));
export const popular = popularIds.map((id) => byId[id]);
export const deals = menu.filter((m) => ["student", "deals", "family"].includes(m.cat));

/** "Rs 1,040" — or the fallback text when the flyer has no price. */
export const formatPKR = (n) => (n == null ? "Ask price" : `Rs ${Math.round(n).toLocaleString("en-PK")}`);
