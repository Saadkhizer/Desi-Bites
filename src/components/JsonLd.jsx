import { site } from "@/lib/site";
import { categories, menu } from "@/lib/menu";
import { openingHoursSchema } from "@/lib/hours";
import { faq } from "@/lib/faq";
import { reviews } from "@/lib/reviews";

/**
 * Structured data for Google: Restaurant (+ full Menu, hours, rating,
 * reviews) and FAQPage. Rendered server-side; `<` escaped per Next docs.
 */
export default function JsonLd() {
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+${site.whatsapp}`,
    image: [menu.find((m) => m.id === "daal-chawal")?.image],
    servesCuisine: site.cuisines,
    priceRange: site.priceRange,
    acceptsReservations: false,
    paymentAccepted: "Cash",
    currenciesAccepted: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    openingHoursSpecification: openingHoursSchema(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    })),
    sameAs: [site.links.facebook, site.links.foodpanda, site.links.instagram].filter(Boolean),
    hasMenu: {
      "@type": "Menu",
      name: `${site.name} Menu`,
      hasMenuSection: categories.map((c) => ({
        "@type": "MenuSection",
        name: c.label,
        hasMenuItem: menu
          .filter((m) => m.cat === c.id)
          .map((m) => ({
            "@type": "MenuItem",
            name: m.name,
            description: m.desc,
            image: m.image,
            suitableForDiet: m.tags?.includes("veg") ? "https://schema.org/VegetarianDiet" : undefined,
            offers: { "@type": "Offer", price: m.price, priceCurrency: "PKR" },
          })),
      })),
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[restaurant, faqPage].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
