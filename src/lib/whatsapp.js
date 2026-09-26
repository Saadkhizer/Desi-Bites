import { site } from "./site";
import { formatPKR } from "./menu";

/** wa.me link with text pre-filled. */
export function waLink(text = "") {
  const base = site.demoMode ? "https://wa.me/" : `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Turns the cart + checkout form into a clean WhatsApp order message.
 * Honest Pakistan-market checkout: no card payment, the kitchen confirms
 * delivery charges and time on WhatsApp.
 */
export function buildOrderMessage({ lines, subtotal, form }) {
  const out = [];
  out.push(`*New order — ${site.name}* 🍛`);
  out.push("");
  lines.forEach((l, i) => {
    out.push(`${i + 1}. ${l.qty} × ${l.name} — ${l.unitPrice == null ? "price?" : formatPKR(l.qty * l.unitPrice)}`);
    if (l.summary) out.push(`   ↳ ${l.summary}`);
    if (l.note) out.push(`   ↳ Note: ${l.note}`);
  });
  out.push("");
  out.push(`*Subtotal: ${formatPKR(subtotal)}*`);
  if (lines.some((l) => l.unitPrice == null)) out.push("(+ cold drinks — please confirm price)");
  out.push(
    form.mode === "delivery"
      ? subtotal >= site.delivery.minOrder
        ? `Free home delivery (within ${site.delivery.freeRadiusKm} km)`
        : `Delivery: order is under Rs ${site.delivery.minOrder}, please confirm charges`
      : "Pickup — no delivery charge"
  );
  out.push("");
  out.push(`*${form.mode === "delivery" ? "Delivery" : "Pickup"}*`);
  out.push(`Name: ${form.name}`);
  out.push(`Phone: ${form.phone}`);
  if (form.mode === "delivery") out.push(`Address: ${form.address}`);
  out.push(`Cutlery: ${form.cutlery ? "Yes please" : "No, thanks"}`);
  out.push(`Payment: Cash on ${form.mode === "delivery" ? "delivery" : "pickup"}`);
  if (form.note) out.push(`Instructions: ${form.note}`);
  return out.join("\n");
}
