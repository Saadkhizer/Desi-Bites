"use client";

import { formatPKR } from "@/lib/menu";
import { useCart, makeLineKey } from "./CartProvider";
import DishImage from "@/components/ui/DishImage";
import { IconLeaf, IconPlus } from "@/components/ui/Icons";

/** Menu card (duotone): surface fill, photo in-frame with an inset, pill badges. */
export default function DishCard({ item, featured = false, headingLevel = "h3" }) {
  const { add, setSheetItem } = useCart();
  const H = headingLevel;
  const isPopular = item.tags?.includes("popular");
  const isVeg = item.tags?.includes("veg");

  const onAdd = () => {
    if (item.options?.length) return setSheetItem(item);
    add({ key: makeLineKey(item.id, {}, ""), id: item.id, name: item.name, unitPrice: item.price, qty: 1, summary: "", note: "" });
  };

  return (
    <article
      className={`card-lift group relative flex h-full rounded-[var(--radius-card)] bg-surface p-2.5 ${
        featured ? "flex-col" : "flex-row gap-1 sm:flex-col sm:gap-0"
      }`}
    >
      <button
        type="button"
        onClick={() => setSheetItem(item)}
        className={`relative block shrink-0 overflow-hidden rounded-[calc(var(--radius-card)-6px)] text-left ${
          featured ? "aspect-[4/3]" : "aspect-square w-28 self-start sm:aspect-[4/3] sm:w-auto sm:self-auto"
        }`}
        aria-label={`View ${item.name}`}
      >
        <DishImage
          src={item.image}
          art={item.art}
          alt={item.name}
          sizes={featured ? "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px" : "(max-width: 640px) 112px, (max-width: 1024px) 45vw, 300px"}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className={`absolute left-2 top-2 flex gap-1.5 ${featured ? "" : "max-sm:hidden"}`}>
          {isPopular && <span className="badge-pop">★ Top pick</span>}
          {isVeg && (
            <span className="badge-soft">
              <IconLeaf className="h-3 w-3 text-positive" /> Veg
            </span>
          )}
        </span>
      </button>

      <div className={`flex min-w-0 flex-1 flex-col px-2 pb-1.5 ${featured ? "pt-3.5" : "pt-1 sm:pt-3.5"}`}>
        <div className="flex items-start justify-between gap-3">
          <H className={`font-bold leading-tight tracking-tight ${featured ? "text-lg" : "text-[1.02rem]"}`}>{item.name}</H>
          <span className="shrink-0 pt-0.5 text-[0.95rem] font-extrabold text-deep">{formatPKR(item.price)}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted">{item.desc}</p>
        {!featured && isPopular && <span className="badge-pop mt-2 self-start sm:hidden">★ Top pick</span>}
        <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4">
          <span className={`text-xs font-medium text-muted ${featured ? "" : "max-sm:hidden"}`}>{hint(item)}</span>
          <button
            type="button"
            onClick={onAdd}
            className="btn btn-deep !min-h-11 !gap-1.5 !px-4 text-sm"
            aria-label={`Add ${item.name} to order`}
          >
            <IconPlus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

function hint(item) {
  const ids = (item.options || []).map((o) => o.id);
  if (ids.includes("drink")) return "🥤 Drink aap ki pasand";
  if (ids.includes("size")) return "🍟 Small ya Large";
  if (ids.includes("spice")) return "🌶 Spicy ya regular";
  if (item.price == null) return "Price on WhatsApp";
  return "\u00a0";
}
