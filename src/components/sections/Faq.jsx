import { faq } from "@/lib/faq";
import Reveal from "@/components/motion/Reveal";

/* Native <details> accordions — keyboard/screen-reader friendly with zero JS. */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-4xl px-4 pt-[var(--section-gap)] sm:px-6 lg:px-8">
      <Reveal>
        <p data-reveal className="text-center text-sm font-bold uppercase tracking-[0.2em] text-deep">Sawal jawab</p>
        <h2 data-reveal id="faq-title" className="mt-2 text-center text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">
          Good to <span className="flourish text-deep">know.</span>
        </h2>
        <div className="mt-10 space-y-3">
          {faq.map((f) => (
            <details key={f.q} data-reveal className="group rounded-[var(--radius-card)] bg-surface px-5 open:pb-5 sm:px-6">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-background text-xl transition-transform duration-300 group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="max-w-2xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
