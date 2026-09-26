import Image from "next/image";
import { site, nav } from "@/lib/site";
import { IconFacebook, IconWhatsApp, IconPhone } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-[var(--section-gap)] bg-foreground pb-28 pt-16 text-background lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/brand/logo.png" alt="" width={56} height={56} className="h-14 w-14" />
              <span className="text-3xl font-extrabold tracking-tight">
                Desi <span className="flourish text-pop">Bite</span>
              </span>
            </div>
            <p className="mt-4 text-xl font-bold text-pop">{site.tagline}</p>
            <p className="mt-2 max-w-sm leading-relaxed opacity-75">
              {site.category} in {site.address.area}, {site.address.city}. Free home delivery within{" "}
              {site.delivery.freeRadiusKm} km on orders over Rs {site.delivery.minOrder}. Party &amp; function orders welcome.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-bold uppercase tracking-[0.18em] opacity-60">Explore</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="opacity-85 hover:text-pop hover:opacity-100">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] opacity-60">Say salaam</p>
            <div className="mt-4 flex gap-3">
              <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-12 w-12 place-items-center rounded-full bg-background/10 hover:bg-pop hover:text-on-pop">
                <IconWhatsApp />
              </a>
              <a href={site.links.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-12 w-12 place-items-center rounded-full bg-background/10 hover:bg-pop hover:text-on-pop">
                <IconFacebook />
              </a>
            </div>
            <p className="mt-5 opacity-75">{site.address.street}, {site.address.area}, {site.address.city}</p>
            <ul className="mt-2 space-y-1 opacity-75">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 hover:text-pop">
                    <IconPhone className="h-4 w-4" /> {p.display}
                  </a>
                </li>
              ))}
              <li className="inline-flex items-center gap-2">
                <IconWhatsApp className="h-4 w-4" /> {site.whatsappDisplay}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-background/15 pt-6 text-sm opacity-60 sm:flex-row">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p>
            Website by <a href={site.builtBy.url} className="font-semibold hover:text-pop">{site.builtBy.name}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
