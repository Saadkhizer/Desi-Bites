import { site } from "./site";

/* Every answer here is true by how the site works — no invented policies. */
export const faq = [
  {
    q: "How do I order from the website?",
    a: "Add dishes to your cart, fill in your name, number and address, and tap “Send order on WhatsApp”. Your full order opens in WhatsApp, ready to send. The kitchen confirms the total and delivery time there.",
  },
  {
    q: "Can I ask for less spicy food?",
    a: "Yes. Every savoury dish has a mirch level: kam, normal or tez. You can also leave a note on any dish, like “pyaz alag se”.",
  },
  {
    q: "How do I pay?",
    a: "Cash on delivery or at pickup. There's no card payment on the website.",
  },
  {
    q: "What are your timings?",
    a: "We open in the afternoon or evening depending on the day and stay open till 3 AM. The live timings are in the Timings section above.",
  },
  {
    q: "Are you on Foodpanda too?",
    a: `Yes, ${site.name} is on Foodpanda with a ${site.rating.value}★ rating from ${site.rating.count.toLocaleString()}+ customers. Ordering here sends your order straight to our kitchen on WhatsApp.`,
  },
  {
    q: "Do you take bulk or office orders?",
    a: "Message us on WhatsApp with the dishes and number of people, and the kitchen will tell you what's possible for your date.",
  },
];
