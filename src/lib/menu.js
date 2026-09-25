/**
 * Full menu, mirrored from the Foodpanda listing (25 Sep 2026).
 *
 * `price` is Foodpanda's list price BEFORE their 10% app discount.
 * ⚠ CONFIRM direct-order prices with the client — Foodpanda menus usually
 * carry a commission markup, so the website can often be cheaper.
 *
 * `image` points at the client's own product photos on Foodpanda's CDN.
 * To self-host, drop files in /public/dishes and use "/dishes/<file>.jpg".
 */

const FP = "https://images.deliveryhero.io/image";
const gm = (id) => `${FP}/global-menu-service/FP_PK/vendor/yu49/product/${id}.jpg`;
const pr = (id) => `${FP}/fd-pk/Products/${id}.jpg`;

/* ---------- option groups ---------- */
// Reviews literally ask for fewer chillies — so every savoury dish gets this.
export const SPICE = {
  id: "spice",
  label: "Mirch ka level",
  hint: "Aap ki marzi ki mirch",
  type: "single",
  required: true,
  choices: [
    { id: "kam", label: "Kam mirch", delta: 0 },
    { id: "normal", label: "Normal", delta: 0, default: true },
    { id: "tez", label: "Tez", delta: 0 },
  ],
};

const SUGAR = {
  id: "sugar",
  label: "Cheeni",
  type: "single",
  required: true,
  choices: [
    { id: "none", label: "Baghair cheeni", delta: 0 },
    { id: "kam", label: "Kam", delta: 0 },
    { id: "normal", label: "Normal", delta: 0, default: true },
  ],
};

const SIDES = {
  id: "sides",
  label: "Saath mein kuch?",
  type: "multi",
  required: false,
  choices: [
    { id: "raita", label: "Mint raita", delta: 150 },
    { id: "salad", label: "Fresh salad", delta: 150 },
    { id: "ghee-roti", label: "Desi ghee roti", delta: 200 },
    { id: "imli", label: "Imli chutney", delta: 160 },
  ],
};

const CURRY = [SPICE, SIDES];

/* ---------- categories ---------- */
export const categories = [
  { id: "deals", label: "Roti Deals", emoji: "🍛" },
  { id: "rice", label: "Rice Corner", emoji: "🍚" },
  { id: "paratha-deals", label: "Paratha Deals", emoji: "🫓" },
  { id: "desi-zaiqa", label: "Desi Zaiqa", emoji: "🥘" },
  { id: "chinese", label: "Chinese", emoji: "🍜" },
  { id: "chaat", label: "Chaat Corner", emoji: "🥗" },
  { id: "roti", label: "Roti & Paratha", emoji: "🫓" },
  { id: "sweet", label: "Meetha", emoji: "🍮" },
  { id: "tea", label: "Chai", emoji: "☕" },
  { id: "extras", label: "Extras", emoji: "➕" },
];

/* ---------- items ---------- */
export const menu = [
  // Roti deals
  { id: "mix-daal-2-chapati", cat: "deals", name: "Mix Daal with 2 Chapati", desc: "Ghar wali mix daal, tarka on top, with two soft chapatis.", price: 600, image: gm("8521a635-0a43-4c1f-9285-5ad9a5997024"), tags: ["veg"], options: CURRY },
  { id: "achari-keema-2-chapati", cat: "deals", name: "Chicken Achari Keema Deal", desc: "Chicken achari keema with 2 chapatis and raita.", price: 845, image: gm("102260542/a6966222-0e9b-46f1-8820-5857080b77d6"), options: CURRY },
  { id: "haleem-2-chapati", cat: "deals", name: "Chicken Haleem with 2 Chapati", desc: "Haleem with fried onion, lemon and ginger garnish, 2 chapatis and salad.", price: 700, image: pr("67655751"), options: CURRY },
  { id: "mix-veg-2-chapati", cat: "deals", name: "Mix Vegetables with 2 Chapati", desc: "Homestyle mix sabzi, cooked slow and light, with 2 chapatis.", price: 720, image: pr("77360090"), tags: ["veg"], options: CURRY },
  { id: "kofta-2-chapati", cat: "deals", name: "Chicken Kofta Curry with 2 Chapati", desc: "Two spiced chicken koftas in a rich curry, with 2 chapatis.", price: 720, image: pr("79255663"), options: CURRY },
  { id: "lobia-2-chapati", cat: "deals", name: "Red Lobia with 2 Chapati", desc: "Red lobia curry with 2 chapatis and salad.", price: 665, image: gm("30167450-3896-4f4d-ab4c-6e74061cd99a"), tags: ["veg"], options: CURRY },

  // Rice corner
  { id: "daal-chawal", cat: "rice", name: "Daal Chawal", desc: "The one everyone orders. Yellow daal, steamed rice, just like home.", price: 720, image: gm("d1a4bc8c-0614-4207-a9fc-248ae0495d70"), tags: ["popular", "veg"], options: CURRY },
  { id: "boiled-rice", cat: "rice", name: "Boiled Rice", desc: "A single serving of fresh, hot, fluffy rice.", price: 440, image: gm("a0a51223-0202-4a0f-bd27-6670def5f63a"), tags: ["veg"] },
  { id: "lobia-rice", cat: "rice", name: "Red Lobia with Boiled Rice", desc: "Red lobia curry over boiled rice.", price: 720, image: gm("d0415d3e-2b98-4b63-824a-23f01a6dd8b7"), tags: ["popular", "veg"], options: CURRY },
  { id: "white-chana-rice", cat: "rice", name: "Boiled Rice with White Chana", desc: "Fluffy rice with tender white chickpeas. Filling and simple.", price: 700, image: gm("aa0f1f67-b424-4308-8afc-bae10e270034"), tags: ["veg"], options: CURRY },
  { id: "kofta-rice", cat: "rice", name: "Chicken Kofta Curry with Rice", desc: "Chicken kofta curry with boiled rice and fresh salad.", price: 850, image: gm("88fd13b1-0fa5-45c0-8a24-dff5c77a703b"), options: CURRY },
  { id: "haleem-rice", cat: "rice", name: "Chicken Haleem with Rice", desc: "A full plate of haleem and a full plate of rice.", price: 950, image: gm("7afe6837-78e3-4059-88df-42403680ff67"), options: CURRY },
  { id: "chana-pulao-raita", cat: "rice", name: "Chana Pulao with Raita & Salad", desc: "Homemade chana pulao, with raita and salad on the house.", price: 660, image: pr("96676072"), tags: ["popular", "veg"], options: CURRY },
  { id: "chana-pulao", cat: "rice", name: "Chana Pulao", desc: "Single serving of our homemade chana pulao.", price: 540, image: gm("99784b4e-8f79-47b9-983a-8c1f29715ddf"), tags: ["veg"], options: CURRY },
  { id: "qeema-rice", cat: "rice", name: "Chicken Qeema with Rice", desc: "A plate of chicken qeema with boiled rice.", price: 900, image: gm("be933a38-ac7d-464f-8873-59df8efa85cf"), options: CURRY },

  // Paratha deals
  { id: "paratha-kabab", cat: "paratha-deals", name: "Paratha with Kabab", desc: "One paratha, two shami kababs and raita.", price: 480, image: gm("64a36156-4f37-4ee3-b9d6-10d78906c57a"), options: [SPICE] },
  { id: "mix-daal-paratha", cat: "paratha-deals", name: "Mix Daal with Paratha", desc: "Mix daal with one crisp paratha.", price: 600, image: gm("46c1573c-7a93-423e-9233-534fd6b73631"), tags: ["veg"], options: CURRY },
  { id: "mix-veg-paratha", cat: "paratha-deals", name: "Mix Vegetable with Paratha", desc: "Fresh mix sabzi with one paratha.", price: 720, image: "https://foodpanda.dhmedia.io/image/global-menu-service/FP_PK/vendor/yu49/product/101946998/e2b4b5ab-7d9f-49e0-a1da-cec5b9e21721.jpg", tags: ["veg"], options: CURRY },
  { id: "haleem-2-paratha", cat: "paratha-deals", name: "Haleem with 2 Paratha", desc: "Chicken haleem with two parathas.", price: 800, image: gm("c5426fc4-a06e-4296-8d5e-4e4510480467"), options: CURRY },
  { id: "anda-chanay-paratha", cat: "paratha-deals", name: "Anda Chanay with 2 Paratha", desc: "Lahori chanay with boiled egg and two parathas. Nashta sorted.", price: 800, image: gm("101946964/4bb585c5-ce72-4a28-954c-4eb5aca589b2"), options: CURRY },
  { id: "anda-kofta-paratha", cat: "paratha-deals", name: "Anda Kofta with 2 Paratha", desc: "Kofta with boiled egg and two parathas.", price: 810, image: gm("101946986/a0add353-19d4-462e-9064-07944c14006a"), options: CURRY },
  { id: "achari-keema-paratha", cat: "paratha-deals", name: "Achari Keema with Paratha", desc: "Chicken achari keema with one paratha.", price: 825, image: gm("a7781f1d-6f44-464d-b4a4-a9dc2f6e91c7"), options: CURRY },

  // Desi zaiqa
  { id: "achari-keema", cat: "desi-zaiqa", name: "Chicken Achari Keema with Raita", desc: "Freshly cooked, tangy achari keema with raita.", price: 665, image: gm("102260505/7e2ab07a-baab-473e-9bc6-3deb4b06a440"), options: CURRY },
  { id: "mix-daal", cat: "desi-zaiqa", name: "Mix Daal", desc: "Single serving of our everyday mix daal.", price: 450, image: gm("9c5eaed9-d61f-40e5-b7f9-426c4fd3d694"), tags: ["veg"], options: CURRY },
  { id: "anda-chanay", cat: "desi-zaiqa", name: "Anda Chanay", desc: "Lahori chanay with boiled egg, served with salad.", price: 460, image: gm("480da2c4-7a3b-4d62-abab-c561a364edfb"), options: CURRY },
  { id: "anda-kofta", cat: "desi-zaiqa", name: "Anda Kofta", desc: "One meatball with a boiled egg in curry.", price: 480, image: gm("60ad58ec-5f68-40c4-850c-71700a209314"), options: CURRY },
  { id: "chicken-haleem", cat: "desi-zaiqa", name: "Chicken Haleem", desc: "Rich lentil stew with shredded chicken, fried onion, lemon, coriander and ginger.", price: 550, image: pr("66523219"), tags: ["popular"], options: CURRY },
  { id: "lahori-chanay", cat: "desi-zaiqa", name: "Special Lahori Chanay", desc: "The proper Lahori taste, the way it's made back home.", price: 350, image: pr("73330952"), tags: ["veg"], options: CURRY },
  { id: "mix-vegetables", cat: "desi-zaiqa", name: "Mix Vegetables", desc: "Cooked with care, the traditional homemade way. Light and fresh.", price: 580, image: pr("77359762"), tags: ["veg"], options: CURRY },
  { id: "kofta-curry", cat: "desi-zaiqa", name: "Chicken Kofta Curry", desc: "Two chicken koftas in a well-spiced curry.", price: 550, image: pr("79150575"), options: CURRY },
  { id: "lobia-curry", cat: "desi-zaiqa", name: "Red Lobia Curry", desc: "Red lobia curry served with salad.", price: 460, image: pr("79522271"), tags: ["veg"], options: CURRY },
  { id: "chana-kofta", cat: "desi-zaiqa", name: "Chana Kofta with Salad", desc: "Lahori chanay with one kofta and salad.", price: 540, image: pr("92218802"), options: CURRY },

  // Chinese
  { id: "special-macaroni", cat: "chinese", name: "Special Chicken Macaroni", desc: "Slow-cooked in special spices and sauces with chicken chunks. Ketchup on the side.", price: 760, image: pr("71847585"), options: [SPICE] },
  { id: "veg-macaroni", cat: "chinese", name: "Vegetable Macaroni", desc: "Macaroni in spices and sauces with vegetables only.", price: 500, image: pr("66523225"), tags: ["veg"], options: [SPICE] },
  { id: "chicken-macaroni", cat: "chinese", name: "Chicken Macaroni", desc: "Macaroni in spices and sauces with chicken chunks.", price: 550, image: pr("66523226"), tags: ["popular"], options: [SPICE] },
  { id: "veg-chowmein", cat: "chinese", name: "Vegetable Chow Mein", desc: "Stir-fried noodles with crunchy vegetables.", price: 550, image: pr("66523227"), tags: ["veg"], options: [SPICE] },
  { id: "chicken-chowmein", cat: "chinese", name: "Chicken Chow Mein", desc: "Stir-fried noodles with vegetables and chicken. A customer favourite.", price: 620, image: pr("66523228"), tags: ["popular"], options: [SPICE] },

  // Chaat
  { id: "white-chana-chaat", cat: "chaat", name: "White Chana Chaat", desc: "Tangy white chana chaat, single serving.", price: 440, image: gm("101957528/27ed31eb-4623-41ac-bd36-fc6e420b3b2d"), tags: ["veg"], options: [SPICE] },
  { id: "black-chana-chaat", cat: "chaat", name: "Black Chana Chaat", desc: "Black chickpeas, onion, tomato and chaat masala.", price: 440, image: gm("69228822/53a8ed99-7c26-4175-a699-288d7a21fc51"), tags: ["veg"], options: [SPICE] },

  // Roti
  { id: "meetha-paratha", cat: "roti", name: "Meetha Paratha", desc: "Layered whole-wheat paratha stuffed with sugar.", price: 220, image: pr("66523217"), tags: ["veg"] },
  { id: "desi-ghee-roti", cat: "roti", name: "Desi Ghee Roti", desc: "Fine atta roti glazed with desi ghee.", price: 200, image: pr("66523229"), tags: ["veg"] },

  // Sweet
  { id: "mutanjan", cat: "sweet", name: "Traditional Mutanjan", desc: "Colourful, fragrant sweet rice. Shaadi wala mutanjan, at home.", price: 475, image: gm("833b942b-9240-4983-bf5b-f09c6b879b39"), tags: ["veg"] },

  // Tea
  { id: "plain-tea", cat: "tea", name: "Plain Tea", desc: "A warm cup of doodh patti.", price: 299, image: gm("8a7aa465-37aa-424b-b1a3-37c373503591"), tags: ["veg"], options: [SUGAR] },
  { id: "cardamom-tea", cat: "tea", name: "Cardamom Tea", desc: "Our special elaichi chai.", price: 299, image: gm("43ee121b-80be-4bd7-8883-bc12ec60b789"), tags: ["veg"], options: [SUGAR] },

  // Extras
  { id: "beef-shami", cat: "extras", name: "Beef Shami Kabab", desc: "Smooth beef and chana-daal patties with fresh herbs.", price: 399, image: pr("66523210") },
  { id: "chicken-shami", cat: "extras", name: "Chicken Shami Kabab", desc: "Chicken and chana-daal patties with fresh herbs.", price: 380, image: pr("66523212") },
  { id: "salad", cat: "extras", name: "Salad", desc: "Cucumber, onion, tomato and cabbage.", price: 150, image: pr("66523236"), tags: ["veg"] },
  { id: "mint-raita", cat: "extras", name: "Mint Raita", desc: "Fresh yogurt with mint.", price: 150, image: pr("66523233"), tags: ["veg"] },
  { id: "imli-chutney", cat: "extras", name: "Imli Chutney", desc: "Sweet and tangy tamarind.", price: 160, image: pr("66523234"), tags: ["veg"] },
  { id: "tomato-chutney", cat: "extras", name: "Tomato Chutney", desc: "Sweet, savoury, full of tomato.", price: 160, image: pr("66523235"), tags: ["veg"] },
];

export const popularIds = [
  "daal-chawal",
  "chicken-haleem",
  "chicken-chowmein",
  "chana-pulao-raita",
  "chicken-macaroni",
  "lobia-rice",
];

export const byId = Object.fromEntries(menu.map((m) => [m.id, m]));
export const popular = popularIds.map((id) => byId[id]);

export const formatPKR = (n) => `Rs ${Math.round(n).toLocaleString("en-PK")}`;
