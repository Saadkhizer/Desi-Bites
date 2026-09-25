import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/noto-nastaliq-urdu/arabic-400.css";
import "./globals.css";

import { site } from "@/lib/site";
import CartProvider from "@/components/cart/CartProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemSheet from "@/components/cart/ItemSheet";
import CartDrawer from "@/components/cart/CartDrawer";
import CartBar from "@/components/cart/CartBar";

/* Fonts are self-hosted from npm (@fontsource) — no next/font/google,
   so dev never stalls on a network that can't reach Google. */

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Homemade Pakistani Food in Islamabad | Order Online`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "homemade food Islamabad",
    "desi food delivery Islamabad",
    "daal chawal Islamabad",
    "chicken haleem Islamabad",
    "chana pulao",
    "Korang Town food",
    "ghar ka khana Islamabad",
    "late night food Islamabad",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Ghar jaisa khana, roz taaza`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Homemade Pakistani food, Islamabad`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "food",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f1e4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-PK" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-deep focus:px-5 focus:py-3 focus:text-on-deep"
        >
          Skip to menu
        </a>
        <CartProvider>
          <SmoothScroll>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <ItemSheet />
          <CartDrawer />
          <CartBar />
        </CartProvider>
      </body>
    </html>
  );
}
