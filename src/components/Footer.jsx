import { site, nav } from "@/lib/site";
import { HandiMark, IconFacebook, IconWhatsApp } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-[var(--section-gap)] bg-foreground pb-28 pt-16 text-background lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <HandiMark className="h-12 w-12 text-background" />
              <span className="text-3xl font-extrabold tracking-tight">
                Desi <span className="flourish text-pop">Bites</span>
              </span>
            </div>
            <p className="urdu mt-3 text-2xl text-pop" lang="ur">{site.urduTagline}</p>
            <p className="mt-2 max-w-sm leading-relaxed opacity-75">
              Homemade Pakistani food from {site.address.area}, {site.address.city}. Cooked fresh, packed clean, delivered hot.
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
              <li>
                <a href={site.links.foodpanda} target="_blank" rel="noopener" className="opacity-85 hover:text-pop hover:opacity-100">Foodpanda ↗</a>
              </li>
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
            <p className="mt-5 opacity-75">{site.address.street}, {site.address.city}</p>
            <p className="opacity-75">{site.phoneDisplay}</p>
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
