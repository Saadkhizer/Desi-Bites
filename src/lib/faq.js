import { site } from "./site";

/* Every answer is either on the owner's flyer or true by how the site works. */
export const faq = [
  {
    q: "How do I order from the website?",
    a: "Add deals to your cart, fill in your name, number and address, and tap “Send order on WhatsApp”. Your full order opens in WhatsApp, ready to send. The kitchen confirms the total and delivery time there.",
  },
  {
    q: "Is home delivery free?",
    a: `Yes — free home delivery within ${site.delivery.freeRadiusKm} km of ${site.address.area}, Sector A, on orders of Rs ${site.delivery.minOrder} or more.`,
  },
  {
    q: "Do you take party and function orders?",
    a: "Yes. For birthdays, office lunches and family functions, message us on WhatsApp with the date, number of people and what you'd like, and we'll plan it with you.",
  },
  {
    q: "Can I choose the cold drink and spice level?",
    a: "Yes. Every deal lets you pick Coke, Sprite, 7up or Pepsi, and regular, spicy or extra spicy. You can also leave a note on any item.",
  },
  {
    q: "How do I pay?",
    a: "Cash on delivery or at the counter. There's no card payment on the website.",
  },
  {
    q: "Where are you?",
    a: `${site.address.street}, ${site.address.area}, ${site.address.city}. Directions are in the Timings section above.`,
  },
];
