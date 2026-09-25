"use client";

import { useSyncExternalStore } from "react";
import { karachiNow } from "@/lib/hours";

const subscribe = () => () => {};

/** Highlights today's row (Pakistan time). Server render = no highlight. */
export default function TodayRow({ day, children }) {
  const today = useSyncExternalStore(subscribe, () => karachiNow().day, () => -1) === day;
  return (
    <tr className={today ? "bg-pop text-on-pop [&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl" : "border-b border-border/70"}>
      {children}
    </tr>
  );
}
