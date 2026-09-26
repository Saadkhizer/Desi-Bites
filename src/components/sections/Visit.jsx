import { site } from "@/lib/site";
import { hours, fmt12 } from "@/lib/hours";
import Reveal from "@/components/motion/Reveal";
import OpenBadge from "@/components/ui/OpenBadge";
import TodayRow from "./TodayRow";
import { IconPin, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";

export default function Visit() {
  const a = site.address;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(a.mapQuery)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a.mapQuery)}`;

  return (
    <section id="visit" aria-labelledby="visit-title" className="mx-auto max-w-7xl px-4 pt-[var(--section-gap)] sm:px-6 lg:px-8">
      <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div data-reveal className="rounded-[var(--radius-band)] bg-surface p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-deep">Timings & location</p>
          <h2 id="visit-title" className="mt-2 text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            Raat <span className="flourish text-deep">12:30</span> tak.
          </h2>
          <OpenBadge className="mt-5 !bg-background" />

          <table className="mt-6 w-full text-[0.95rem]">
            <caption className="sr-only">Opening hours (Pakistan time)</caption>
            <tbody>
              {hours.map((h) => (
                <TodayRow key={h.day} day={h.day}>
                  <th scope="row" className="py-2.5 pl-3 text-left font-semibold">{h.label}</th>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {fmt12(h.open)} – {fmt12(h.close)}
                  </td>
                </TodayRow>
              ))}
            </tbody>
          </table>

          <address className="mt-8 flex gap-3 not-italic">
            <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-deep" />
            <span>
              {a.street}, {a.area}, {a.city}
            </span>
          </address>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink(`Assalam o Alaikum! Kya aaj order le rahe hain?`)} target="_blank" rel="noopener" className="btn btn-deep">
              <IconWhatsApp className="h-5 w-5" /> WhatsApp
            </a>
            <a href={`tel:${site.phones[0].tel}`} className="btn btn-ghost">
              <IconPhone className="h-5 w-5" /> {site.phones[0].display}
            </a>
            <a href={directions} target="_blank" rel="noopener" className="btn btn-ghost">
              <IconPin className="h-5 w-5" /> Directions
            </a>
          </div>
        </div>

        <div data-reveal className="relative min-h-[380px] overflow-hidden rounded-[var(--radius-band)] bg-surface-2">
          <iframe
            title={`Map to ${site.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[18%]"
          />
          <span className="badge-pop absolute bottom-4 left-4 !px-4 !py-2 !text-xs shadow-[var(--shadow-lift)]">
            🛵 Free delivery within {site.delivery.freeRadiusKm} km
          </span>
        </div>
      </Reveal>
    </section>
  );
}
