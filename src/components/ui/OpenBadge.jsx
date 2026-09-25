"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";

/** Live "Open now" pill in Pakistan time. Renders after mount (no hydration mismatch). */
export default function OpenBadge({ className = "" }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-foreground ${className}`}
      aria-live="polite"
    >
      <span
        className={`h-2 w-2 rounded-full ${status?.open ? "live-dot bg-positive" : "bg-muted"}`}
        aria-hidden
      />
      {status ? status.label : "Checking timings…"}
    </span>
  );
}
