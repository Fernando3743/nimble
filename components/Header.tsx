import { icons } from "@/components/icons";

const utilityLinks = ["Help Center", "Find a Store", "Contact"];

const navLinks = [
  "Shop by Categories",
  "Shop by Room",
  "Tables & Desks",
  "Chairs & Stools",
  "Pages",
  "Theme Features",
];

const actionLinks = [
  { label: "Find a store", icon: "location" },
  { label: "Sign in / Register", icon: "user" },
  { label: "Bag", icon: "bag" },
] as const;

const socialIcons = ["facebook", "x", "instagram", "tiktok"] as const;

export function Header() {
  const container = "mx-auto w-full max-w-7xl px-6";

  return (
    <header className="bg-white">
      <div className="bg-[#1D3A9A] text-[15px] text-white">
        <div
          className={`${container} flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between`}
        >
          <div className="hidden flex-wrap items-center gap-6 text-white lg:flex">
            {utilityLinks.map((link) => (
              <a
                key={link}
                className="font-medium text-white transition hover:text-white/80"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-center font-medium text-white">
            ✌️ Free Express Shipping on orders $500!
          </p>
          <div className="hidden flex-wrap items-center justify-center gap-4 text-white lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1">
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="font-medium">United States (USD $)</span>
              <span className="pt-0.5">{icons.chevronLight}</span>
            </div>
            <div className="flex items-center gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social}
                  className="flex size-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white/60"
                  aria-label={social}
                  href="#"
                >
                  {icons[social]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-200">
        <div
          className={`${container} flex flex-wrap items-center gap-4 py-5 lg:flex-nowrap`}
        >
          <div className="text-[32px] font-black tracking-wide text-zinc-900">
            Nimble
          </div>

          <div className="order-3 flex w-full items-center gap-3 rounded-full border border-zinc-200 px-6 py-3 text-sm shadow-sm sm:order-2 sm:w-auto lg:flex-1 lg:text-base">
            <button
              className="flex items-center gap-1 font-medium text-zinc-700"
              type="button"
            >
              All Categories
              {icons.chevron}
            </button>
            <span className="h-6 w-px bg-zinc-200" />
            <input
              className="w-full flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-zinc-400"
              placeholder="What are you looking for?"
            />
            <button
              className="flex size-8 items-center justify-center rounded-full bg-zinc-900 text-white"
              type="button"
            >
              {icons.search}
            </button>
          </div>

          <div className="order-2 flex flex-1 items-center justify-end gap-6 text-sm text-zinc-700 sm:order-3">
            {actionLinks.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-zinc-100"
                type="button"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
                  {icons[action.icon]}
                </span>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <nav
          className={`${container} flex flex-wrap items-center gap-3 pb-4 text-sm text-zinc-700`}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              className="flex items-center gap-1 rounded-full px-4 py-2 font-medium hover:bg-zinc-100"
              href="#"
            >
              {link}
              {link !== "Theme Features" && <span>{icons.chevron}</span>}
            </a>
          ))}
          <span className="text-red-500">On Sale</span>
        </nav>
      </div>
    </header>
  );
}
