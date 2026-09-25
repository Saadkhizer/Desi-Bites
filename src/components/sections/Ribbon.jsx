/* Tilted marquee ribbon — pure CSS animation, pauses for reduced motion. */
const words = ["Daal Chawal", "Chicken Haleem", "Chana Pulao", "Lahori Chanay", "Achari Keema", "Chow Mein", "Kofta Curry", "Mutanjan", "Elaichi Chai"];

export default function Ribbon() {
  const row = [...words, ...words];
  return (
    <div className="relative z-10 -mx-4 my-2 rotate-[-2deg] overflow-hidden bg-deep py-4 text-on-deep sm:-mx-0" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {i % 3 === 1 ? <span className="flourish font-normal text-pop text-[1.15em]">{w}</span> : w}
            <span className="text-pop">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
