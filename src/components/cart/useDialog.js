"use client";

import { useEffect } from "react";
import { lockScroll } from "@/components/motion/SmoothScroll";

/** Scroll lock + Escape to close + a simple Tab focus trap for sheets/drawers. */
export function useDialog(open, ref, onClose) {
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const prev = document.activeElement;
    const t = setTimeout(() => ref.current?.querySelector("[data-autofocus]")?.focus(), 60);

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      prev?.focus?.();
    };
  }, [open, ref, onClose]);
}
