import Image from "next/image";

const categories = [
  { label: "Sale Items", isSale: true },
  { label: "Press Tables" },
  { label: "Lighting" },
  { label: "Spoke Sofa" },
  { label: "Storage" },
  { label: "Turn Chairs" },
  { label: "Chairs" },
  { label: "Curve Coat" },
  { label: "Bend Chairs" },
  { label: "Accessories" },
] as const;

const heroSlides = [
  {
    eyebrow: "Modern Elegance",
    title: "Spoke Sofa",
    cta: "Shop Collection",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Hero() {
  const hero = heroSlides[0];

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg shadow-zinc-200/40">
          <div className="flex gap-4 overflow-x-auto pb-4 text-center text-sm font-medium text-zinc-700 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.label}
                className={`flex min-w-[96px] flex-col items-center gap-2 rounded-full border px-4 py-3 transition hover:border-zinc-300 hover:text-zinc-900 ${
                  category.isSale
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-transparent bg-zinc-50"
                }`}
                type="button"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <span
                    className={`text-sm font-semibold ${
                      category.isSale ? "text-red-600" : "text-zinc-500"
                    }`}
                  >
                    {category.isSale ? "Sale" : category.label[0]}
                  </span>
                </span>
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[32px]">
            <div className="relative h-[420px] w-full">
              <Image
                src={hero.image}
                fill
                className="object-cover"
                alt={hero.title}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center gap-4 p-10 text-white">
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                  {hero.eyebrow}
                </span>
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {hero.title}
                </h2>
                <button
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-zinc-900 shadow-lg shadow-black/20 transition hover:bg-zinc-100"
                  type="button"
                >
                  {hero.cta}
                </button>
              </div>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                <span className="h-2 w-6 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-white/70" />
                <span className="h-2 w-2 rounded-full bg-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
