"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

/**
 * Cart state. Lives in React; mirrored to localStorage only as a
 * convenience (wrapped in try/catch — private mode etc. just skips it).
 * A line's `key` = item id + chosen options + note, so the same dish with
 * different mirch levels stays as separate lines.
 */
const CartCtx = createContext(null);
const STORAGE_KEY = "desibites.cart.v1";

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const found = state.find((l) => l.key === action.line.key);
      if (found) return state.map((l) => (l.key === found.key ? { ...l, qty: l.qty + action.line.qty } : l));
      return [...state, action.line];
    }
    case "qty":
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: Math.max(0, action.qty) } : l))
        .filter((l) => l.qty > 0);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function makeLineKey(id, selections, note) {
  return [id, JSON.stringify(selections || {}), (note || "").trim().toLowerCase()].join("|");
}

export default function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [sheetItem, setSheetItem] = useState(null); // item being customised
  const [pulse, setPulse] = useState(0); // bumps the cart icon on add

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved) && saved.length) dispatch({ type: "hydrate", lines: saved });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add = useCallback((line) => {
    dispatch({ type: "add", line });
    setPulse((p) => p + 1);
  }, []);
  const setQty = useCallback((key, qty) => dispatch({ type: "qty", key, qty }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);

  const value = useMemo(
    () => ({ lines, count, subtotal, add, setQty, clear, open, setOpen, sheetItem, setSheetItem, pulse }),
    [lines, count, subtotal, add, setQty, clear, open, sheetItem, pulse]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
