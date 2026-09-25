"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartProvider";
import { formatPKR } from "@/lib/menu";
import { MM } from "@/lib/motion";
import { IconBag } from "@/components/ui/Icons";

/** Floating bottom cart bar — mobile/tablet only, appears once something is added. */
export default function CartBar() {
  const { count, subtotal, open, setOpen, sheetItem } = useCart();
  const show = count > 0 && !open && !sheetItem;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
          initial={{ y: 120 }}
          animate={{ y: 0, transition: MM.spring }}
          exit={{ y: 120 }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-h-15 w-full items-center gap-3 rounded-full bg-deep px-3 pr-5 text-on-deep shadow-[0_18px_40px_-12px_rgb(35_21_15/0.55)]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-pop font-bold text-on-pop">{count}</span>
            <span className="flex-1 text-left font-bold">View order</span>
            <span className="font-extrabold">{formatPKR(subtotal)}</span>
            <IconBag className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
