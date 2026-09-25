/* Tiny inline icon set — currentColor, 1.8 stroke, no icon library needed. */
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const IconBag = (p) => (
  <svg {...base} {...p}><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const IconPlus = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconMinus = (p) => (<svg {...base} {...p}><path d="M5 12h14" /></svg>);
export const IconClose = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IconArrow = (p) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconCheck = (p) => (<svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const IconClock = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>);
export const IconPin = (p) => (<svg {...base} {...p}><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const IconPhone = (p) => (<svg {...base} {...p}><path d="M6.6 3.5h2.6l1.5 4-2 1.3a11 11 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" /></svg>);
export const IconSearch = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
export const IconLeaf = (p) => (<svg {...base} {...p}><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" /><path d="M5 19 13 11" /></svg>);
export const IconFlame = (p) => (<svg {...base} {...p}><path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.2 2.3-5.2 3.6-8.3.3 2 1.3 3.2 2.4 3.6.4-3 1.7-5.2 3.4-6.6-.2 2.6 1 4.4 2.3 6.2 1 1.4 1.3 2.7 1.3 4.8 0 3.9-2.6 6.5-6.5 6.5Z" /></svg>);
export const IconStar = ({ filled = true, ...p }) => (
  <svg {...base} {...p} fill={filled ? "currentColor" : "none"} strokeWidth={1.4}><path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.6Z" /></svg>
);
export const IconWhatsApp = (p) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.08.8.82-3-.2-.31a8.2 8.2 0 1 1 6.95 3.84Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04c0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.2 3.7 1.56.68 2.17.73 2.95.62.48-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.15-1.18-.07-.1-.23-.16-.48-.28Z" />
  </svg>
);
export const IconFacebook = (p) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.84.24-1.4 1.44-1.4h1.54V4.9a20 20 0 0 0-2.24-.12c-2.22 0-3.74 1.36-3.74 3.84v2.1H8v2.9h2.5V21h3Z" />
  </svg>
);

/** Brand mark — a handi with steam. Colours come from tokens via classes. */
export function HandiMark({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g className="steam" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55">
        <path d="M18 12c-2-2 2-4 0-6" />
        <path d="M24 11c-2-2 2-4 0-6" />
        <path d="M30 12c-2-2 2-4 0-6" />
      </g>
      <path d="M9 21h30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M11 22c-1 9 4 18 13 18s14-9 13-18" fill="var(--accent-pop)" stroke="currentColor" strokeWidth="2.4" />
      <path d="M14 30c3 2 17 2 20 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
      <circle cx="24" cy="17.5" r="2.2" fill="currentColor" />
    </svg>
  );
}
