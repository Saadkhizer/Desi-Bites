"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatPKR, byId } from "@/lib/menu";
import { MM } from "@/lib/motion";
import { useCart, makeLineKey } from "./CartProvider";
import { useDialog } from "./useDialog";
import DishImage from "@/components/ui/DishImage";
import { IconClose, IconMinus, IconPlus } from "@/components/ui/Icons";

/** Bottom sheet (mobile) / modal (desktop) item customiser. */
export default function ItemSheet() {
  const { sheetItem, setSheetItem } = useCart();
  return (
    <AnimatePresence>
      {sheetItem && <Sheet key={sheetItem.id} item={sheetItem} onClose={() => setSheetItem(null)} />}
    </AnimatePresence>
  );
}

function defaults(item) {
  const s = {};
  (item.options || []).forEach((g) => {
    s[g.id] = g.type === "single" ? g.choices.find((c) => c.default)?.id ?? g.choices[0].id : [];
  });
  return s;
}

function Sheet({ item, onClose }) {
  const { add } = useCart();
  const ref = useRef(null);
  const [sel, setSel] = useState(() => defaults(item));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const close = useCallback(() => onClose(), [onClose]);
  useDialog(true, ref, close);

  const unit = useMemo(() => {
    if (item.price == null) return null;
    let p = item.price;
    (item.options || []).forEach((g) => {
      const v = sel[g.id];
      g.choices.forEach((c) => {
        if (g.type === "single" ? v === c.id : v.includes(c.id)) p += c.delta;
      });
    });
    return p;
  }, [item, sel]);

  const summary = (item.options || [])
    .map((g) => {
      const v = sel[g.id];
      const labels = g.choices.filter((c) => (g.type === "single" ? v === c.id : v.includes(c.id))).map((c) => c.label);
      return labels.length ? `${g.label}: ${labels.join(", ")}` : null;
    })
    .filter(Boolean)
    .join(" · ");

  const onAdd = () => {
    add({ key: makeLineKey(item.id, sel, note), id: item.id, name: item.name, unitPrice: unit, qty, summary, note: note.trim() });
    onClose();
  };

  const upsell = item.cat !== "tea" && !item.id.includes("tea") ? byId["cardamom-tea"] : null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <motion.button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 bg-foreground/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-background sm:max-w-lg sm:rounded-[28px]"
        initial={{ y: "100%", opacity: 0.6 }}
        animate={{ y: 0, opacity: 1, transition: MM.spring }}
        exit={{ y: "100%", opacity: 0, transition: { duration: 0.25, ease: MM.ease.exit } }}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
          <div className="relative aspect-[16/10] w-full">
            <DishImage src={item.image} art={item.art} alt={item.name} sizes="(max-width: 640px) 100vw, 512px" />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-background/95 shadow"
              aria-label="Close"
            >
              <IconClose />
            </button>
            <span className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-background/80 sm:hidden" aria-hidden />
          </div>

          <div className="px-5 pb-6 pt-5 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="sheet-title" className="text-2xl font-extrabold leading-tight tracking-tight">{item.name}</h2>
              <span className="shrink-0 pt-1 text-lg font-extrabold text-deep">{formatPKR(item.price)}</span>
            </div>
            <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>

            {(item.options || []).map((g) => (
              <fieldset key={g.id} className="mt-6">
                <legend className="flex w-full items-center justify-between">
                  <span className="text-base font-bold">{g.label}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${g.required ? "bg-pop text-on-pop" : "bg-surface text-muted"}`}>
                    {g.required ? "Required" : "Optional"}
                  </span>
                </legend>
                <div className="mt-3 grid gap-2">
                  {g.choices.map((c) => {
                    const checked = g.type === "single" ? sel[g.id] === c.id : sel[g.id].includes(c.id);
                    return (
                      <label
                        key={c.id}
                        className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 transition-colors ${
                          checked ? "border-deep bg-surface" : "border-border hover:bg-surface"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type={g.type === "single" ? "radio" : "checkbox"}
                            name={`${item.id}-${g.id}`}
                            checked={checked}
                            onChange={() =>
                              setSel((s) => ({
                                ...s,
                                [g.id]:
                                  g.type === "single"
                                    ? c.id
                                    : s[g.id].includes(c.id)
                                      ? s[g.id].filter((x) => x !== c.id)
                                      : [...s[g.id], c.id],
                              }))
                            }
                            className="h-5 w-5 accent-[var(--accent-deep)]"
                          />
                          <span className="font-medium">
                            {g.id === "spice" && <span aria-hidden className="mr-1">{{ regular: "🌶", spicy: "🌶🌶", extra: "🌶🌶🌶" }[c.id]}</span>}
                            {c.label}
                          </span>
                        </span>
                        {c.delta > 0 && <span className="text-sm font-semibold text-deep">+ {formatPKR(c.delta)}</span>}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <label className="mt-6 block">
              <span className="text-base font-bold">Special instructions</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 140))}
                rows={2}
                placeholder="e.g. extra lemon, pyaz alag se"
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-deep"
              />
            </label>

            {upsell && (
              <p className="mt-5 rounded-2xl bg-surface px-4 py-3 text-sm text-muted">
                ☕ Khane ke baad <strong className="text-foreground">elaichi chai</strong>? Add it from the Chai section.
              </p>
            )}
          </div>
        </div>

        {/* sticky footer */}
        <div className="flex items-center gap-3 border-t border-border bg-background px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="flex items-center rounded-full bg-surface">
            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} className="grid h-12 w-12 place-items-center rounded-full" aria-label="Decrease quantity">
              <IconMinus />
            </button>
            <span className="w-7 text-center text-lg font-bold" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((n) => Math.min(20, n + 1))} className="grid h-12 w-12 place-items-center rounded-full" aria-label="Increase quantity">
              <IconPlus />
            </button>
          </div>
          <button type="button" onClick={onAdd} className="btn btn-deep !min-h-13 flex-1 text-base">
            Add — {unit == null ? "price on WhatsApp" : formatPKR(unit * qty)}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
