"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartProvider";
import { useDialog } from "./useDialog";
import { byId, formatPKR } from "@/lib/menu";
import { MM } from "@/lib/motion";
import { buildOrderMessage, waLink } from "@/lib/whatsapp";
import DishImage from "@/components/ui/DishImage";
import { IconClose, IconMinus, IconPlus, IconWhatsApp, IconBag, IconCheck } from "@/components/ui/Icons";

export default function CartDrawer() {
  const { open, setOpen } = useCart();
  return <AnimatePresence>{open && <Drawer onClose={() => setOpen(false)} />}</AnimatePresence>;
}

const PHONE_RE = /^(?:\+?92|0)3\d{2}[\s-]?\d{7}$/;

function Drawer({ onClose }) {
  const { lines, subtotal, count, setQty, clear } = useCart();
  const ref = useRef(null);
  const [step, setStep] = useState("cart"); // cart | checkout | sent
  const [form, setForm] = useState({ mode: "delivery", name: "", phone: "", address: "", note: "", cutlery: false });
  const [errors, setErrors] = useState({});
  const close = useCallback(() => onClose(), [onClose]);
  useDialog(true, ref, close);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = "Apna naam likhein.";
    if (!PHONE_RE.test(form.phone.replace(/\s+/g, " ").trim())) err.phone = "Pakistani mobile number likhein, e.g. 0300 1234567.";
    if (form.mode === "delivery" && form.address.trim().length < 8) err.address = "Poora address likhein — house, street, sector.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const msg = buildOrderMessage({ lines, subtotal, form });
    window.open(waLink(msg), "_blank", "noopener");
    setStep("sent");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-end sm:items-stretch" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <motion.button
        type="button"
        tabIndex={-1}
        aria-label="Close cart"
        className="absolute inset-0 bg-foreground/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        ref={ref}
        className="relative flex max-h-[92svh] w-full flex-col rounded-t-[28px] bg-background sm:max-h-none sm:max-w-md sm:rounded-none sm:rounded-l-[28px]"
        initial={{ x: 0, y: "100%" }}
        animate={{ x: 0, y: 0, transition: MM.spring }}
        exit={{ y: "100%", transition: { duration: 0.25, ease: MM.ease.exit } }}
      >
        <header className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-6">
          <h2 id="cart-title" className="text-2xl font-extrabold tracking-tight">
            {step === "checkout" ? "Checkout" : step === "sent" ? "Shukriya!" : "Aap ka order"}
          </h2>
          <button type="button" data-autofocus onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-surface" aria-label="Close cart">
            <IconClose />
          </button>
        </header>

        {step === "sent" ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-pop text-on-pop">
              <IconCheck className="h-8 w-8" />
            </span>
            <p className="mt-5 text-lg font-bold">Your order is ready in WhatsApp.</p>
            <p className="mt-2 max-w-xs text-muted">Press send there — the kitchen will confirm the total, delivery charge and time.</p>
            <div className="mt-8 flex w-full flex-col gap-3">
              <button type="button" onClick={() => { clear(); onClose(); }} className="btn btn-deep">Done — clear cart</button>
              <button type="button" onClick={() => setStep("checkout")} className="btn btn-ghost">WhatsApp didn&apos;t open? Try again</button>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-surface text-deep">
              <IconBag className="h-8 w-8" />
            </span>
            <p className="mt-4 text-lg font-bold">Cart abhi khaali hai</p>
            <p className="mt-1 text-muted">Daal chawal se shuru karein? 😉</p>
            <a href="#menu" onClick={onClose} className="btn btn-deep mt-6">Browse the menu</a>
          </div>
        ) : step === "cart" ? (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 sm:px-6" data-lenis-prevent>
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3 rounded-2xl bg-surface p-2.5">
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl">
                    <DishImage src={byId[l.id]?.image} alt="" sizes="72px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold leading-tight">{l.name}</p>
                      <p className="shrink-0 font-bold text-deep">{formatPKR(l.unitPrice * l.qty)}</p>
                    </div>
                    {l.summary && <p className="mt-0.5 truncate text-xs text-muted">{l.summary}</p>}
                    {l.note && <p className="truncate text-xs italic text-muted">“{l.note}”</p>}
                    <div className="mt-2 inline-flex items-center rounded-full bg-background">
                      <button type="button" onClick={() => setQty(l.key, l.qty - 1)} className="grid h-9 w-9 place-items-center" aria-label={`Remove one ${l.name}`}>
                        <IconMinus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{l.qty}</span>
                      <button type="button" onClick={() => setQty(l.key, l.qty + 1)} className="grid h-9 w-9 place-items-center" aria-label={`Add one more ${l.name}`}>
                        <IconPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Totals subtotal={subtotal} count={count} mode={form.mode} />
            <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
              <button type="button" onClick={() => setStep("checkout")} className="btn btn-deep !min-h-14 w-full text-base">
                Checkout — {formatPKR(subtotal)}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 pb-4 sm:px-6" data-lenis-prevent>
              <div role="radiogroup" aria-label="Order type" className="grid grid-cols-2 gap-1 rounded-full bg-surface p-1">
                {["delivery", "pickup"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={form.mode === m}
                    onClick={() => setForm((f) => ({ ...f, mode: m }))}
                    className={`min-h-11 rounded-full text-sm font-bold capitalize transition-colors ${form.mode === m ? "bg-deep text-on-deep" : "text-muted"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <Field label="Naam" error={errors.name}>
                <input value={form.name} onChange={set("name")} autoComplete="name" className={input(errors.name)} placeholder="Aap ka naam" />
              </Field>
              <Field label="Mobile number" error={errors.phone}>
                <input value={form.phone} onChange={set("phone")} type="tel" inputMode="tel" autoComplete="tel" className={input(errors.phone)} placeholder="0300 1234567" />
              </Field>
              {form.mode === "delivery" && (
                <Field label="Delivery address" error={errors.address}>
                  <textarea value={form.address} onChange={set("address")} rows={2} autoComplete="street-address" className={`${input(errors.address)} !h-auto resize-none py-3`} placeholder="House #, Street #, Sector / Society" />
                </Field>
              )}
              <Field label="Kuch aur? (optional)">
                <input value={form.note} onChange={set("note")} className={input()} placeholder="e.g. gate pe call karein" />
              </Field>
              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl bg-surface px-4">
                <input type="checkbox" checked={form.cutlery} onChange={set("cutlery")} className="h-5 w-5 accent-[var(--accent-deep)]" />
                <span className="font-medium">Send cutlery (spoon/fork)</span>
              </label>
            </div>
            <Totals subtotal={subtotal} count={count} mode={form.mode} />
            <div className="grid gap-2 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
              <button type="submit" className="btn !min-h-14 w-full bg-positive text-base text-on-deep">
                <IconWhatsApp className="h-5 w-5" /> Send order on WhatsApp
              </button>
              <button type="button" onClick={() => setStep("cart")} className="text-sm font-semibold text-muted underline-offset-4 hover:underline">
                ← Back to cart
              </button>
            </div>
          </form>
        )}
      </motion.aside>
    </div>
  );
}

function Totals({ subtotal, count, mode }) {
  return (
    <dl className="mx-5 my-4 space-y-1.5 rounded-2xl border border-border p-4 text-sm sm:mx-6">
      <div className="flex justify-between"><dt className="text-muted">Items ({count})</dt><dd className="font-semibold">{formatPKR(subtotal)}</dd></div>
      <div className="flex justify-between"><dt className="text-muted">{mode === "delivery" ? "Delivery" : "Pickup"}</dt><dd className="font-semibold">{mode === "delivery" ? "Confirmed on WhatsApp" : "Free"}</dd></div>
      <div className="flex justify-between"><dt className="text-muted">Payment</dt><dd className="font-semibold">Cash</dd></div>
      <div className="flex justify-between border-t border-border pt-2 text-base"><dt className="font-bold">Subtotal</dt><dd className="font-extrabold text-deep">{formatPKR(subtotal)}</dd></div>
    </dl>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span role="alert" className="mt-1 block text-sm font-medium text-deep">{error}</span>}
    </label>
  );
}

const input = (err) =>
  `h-12 w-full rounded-2xl border bg-surface px-4 text-base outline-none focus:border-deep ${err ? "border-deep" : "border-border"}`;
