import { icons } from "@/components/icons";

const utilityLinks = ["Help Center", "Find a Store", "Contact"];

const navLinks = [
  { label: "Shop By Categories", dropdown: true },
  { label: "Shop By Room", dropdown: true },
  { label: "Tables & Desks", dropdown: true },
  { label: "Chairs & Stools", dropdown: true },
  { label: "Pages", dropdown: true },
  { label: "Theme Features", dropdown: true },
] as const;
const activeNav = "Tables & Desks";

const actionLinks = [
  { label: "Find a store", icon: "location" },
  { label: "Sign in / Register", icon: "user" },
  { label: "Bag", icon: "bag" },
] as const;

const socialIcons = ["facebook", "x", "instagram", "tiktok"] as const;

export function Header() {
  const container = "w-full px-[50px]";

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
            <div className="flex items-center gap-2 rounded-full px-3 py-1">
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="font-medium">United States (USD $)</span>
              <span className="pt-0.5">{icons.chevronLight()}</span>
            </div>
            <div className="flex items-center text-white">
              {socialIcons.map((social) => (
                <a
                  key={social}
                  className="inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
                  aria-label={social}
                  href="#"
                >
                  {icons[social]()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-200">
        <div
          className={`${container} flex flex-wrap items-center gap-y-4 gap-x-4 py-5 lg:flex-nowrap lg:gap-x-0`}
        >
          <div className="text-[32px] font-black uppercase tracking-tight text-[#101010] lg:mr-[54px]">
            Nimble
          </div>

          <div className="order-3 flex w-full items-center gap-4 rounded-full bg-[#ededed] px-6 py-3 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:order-2 sm:w-auto lg:flex-1">
            <button
              className="flex items-center gap-1 border-0 bg-transparent text-[15px] font-semibold text-black outline-none [appearance:none]"
              type="button"
            >
              All Categories
              {icons.chevron()}
            </button>
            <span className="h-6 w-px bg-zinc-300" />
            <input
              className="w-full flex-1 border-0 bg-transparent text-[15px] text-black outline-none placeholder:text-black"
              placeholder="What are you looking for?"
            />
            <span>{icons.search()}</span>
          </div>

          <div className="order-2 flex flex-1 items-center justify-end gap-6 text-[15px] text-[#1a1a1a] sm:order-3 lg:ml-4">
            {actionLinks.map((action) => {
              const isBag = action.icon === "bag";
              return (
                <button
                  key={action.label}
                  className={`flex items-center font-semibold transition hover:text-black ${
                    isBag ? "h-12 w-12 justify-center rounded-full bg-[#ededed] text-black" : "gap-2"
                  }`}
                  type="button"
                  aria-label={isBag ? action.label : undefined}
                >
                  {icons[action.icon]({
                    className: isBag ? "text-black" : "text-[#1a1a1a]",
                  })}
                  {!isBag && <span>{action.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <nav
          className={`${container} flex flex-wrap items-center gap-6 pb-4 text-[15px] font-bold text-[#1d1d1d]`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={`flex items-center gap-1 transition hover:underline ${
                link.label === activeNav ? "text-black" : "hover:text-black"
              }`}
              href="#"
            >
              {link.label}
              {link.dropdown && <span>{icons.chevron()}</span>}
            </a>
          ))}
          <span className="flex items-center gap-1 text-[#d93a2b] hover:underline">
            On Sale
            <span className="text-[#d93a2b]">{icons.sparkle()}</span>
          </span>
        </nav>
      </div>
    </header>
  );
}
