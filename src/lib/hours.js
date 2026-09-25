/**
 * Opening hours from the Foodpanda listing. Every day runs past midnight
 * and closes at 3:00 AM. Times are 24h, Asia/Karachi.
 * ⚠ CONFIRM with the client — Foodpanda hours are sometimes delivery-only.
 */
export const hours = [
  { day: 1, label: "Monday", open: "20:00", close: "03:00" },
  { day: 2, label: "Tuesday", open: "13:00", close: "03:00" },
  { day: 3, label: "Wednesday", open: "13:45", close: "03:00" },
  { day: 4, label: "Thursday", open: "13:00", close: "03:00" },
  { day: 5, label: "Friday", open: "14:30", close: "03:00" },
  { day: 6, label: "Saturday", open: "13:00", close: "03:00" },
  { day: 0, label: "Sunday", open: "18:00", close: "03:00" },
];

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const fmt12 = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`;
};

/** Current day/minute in Pakistan, wherever the visitor is. */
export function karachiNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: days[get("weekday")], minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/**
 * Returns { open, label } — e.g. { open: true, label: "Open · closes 3 AM" }.
 * Handles the after-midnight tail of the previous day's shift.
 */
export function openStatus(date = new Date()) {
  const { day, minutes } = karachiNow(date);
  const today = hours.find((h) => h.day === day);
  const yesterday = hours.find((h) => h.day === (day + 6) % 7);

  // Still inside last night's shift (00:00 → 03:00)?
  if (yesterday && minutes < toMin(yesterday.close)) {
    return { open: true, label: `Open now · closes ${fmt12(yesterday.close)}` };
  }
  if (today && minutes >= toMin(today.open)) {
    return { open: true, label: `Open now · till ${fmt12(today.close)}` };
  }
  if (today) {
    return { open: false, label: `Opens today ${fmt12(today.open)}` };
  }
  return { open: false, label: "Closed today" };
}

/** schema.org openingHoursSpecification — splits each shift at midnight. */
export function openingHoursSchema() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return hours.flatMap((h) => [
    { "@type": "OpeningHoursSpecification", dayOfWeek: names[h.day], opens: h.open, closes: "23:59" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: names[(h.day + 1) % 7], opens: "00:00", closes: h.close },
  ]);
}
