"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const landingFooterLinks = [
  { href: "/#why-workbridge", label: "Why WorkBridge" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#survey", label: "Join early access" },
];

const marketplaceFooterLinks = [
  { href: "/marketplace#marketplace-how-it-works", label: "How it works" },
  { href: "/marketplace#marketplace-services", label: "Services" },
  { href: "/marketplace#marketplace-workers", label: "Workers" },
  { href: "/marketplace#marketplace-faq", label: "FAQ" },
  { href: "/login", label: "Log in" },
  { href: "/register/client", label: "Get Started" },
];

export default function Footer() {
  const pathname = usePathname();
  const isMarketplace = pathname?.startsWith("/marketplace") ?? false;
  const footerLinks = isMarketplace ? marketplaceFooterLinks : landingFooterLinks;

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start"
          data-reveal
        >
          <div className="max-w-xl">
            <span className="mb-5 block h-1 w-10 rounded-full bg-orange-500" />
            <Link
              href="/"
              aria-label="WorkBridge home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
            >
              <Image
                src="/assets/branding/wb-logo.png"
                alt="WorkBridge icon"
                width={1254}
                height={1254}
                sizes="44px"
                className="h-11 w-11 shrink-0 rounded-lg bg-white object-contain"
              />
              <span className="flex min-w-0 flex-col justify-center leading-none">
                <span className="text-xl font-bold leading-none text-white">
                  WorkBridge
                </span>
                <span className="mt-1 text-[0.6rem] font-semibold uppercase leading-none tracking-[0.14em] text-slate-400">
                  SKILLED SERVICES MARKETPLACE
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
              {isMarketplace
                ? "Find trusted local professionals, compare verified profiles, and request services with confidence."
                : "WorkBridge helps clients discover trusted local professionals, freelancers, service providers, and trade workers."}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 lg:min-w-[28rem]"
          >
            {footerLinks.map((link) => {
              const isPrimary = isMarketplace
                ? link.href === "/register/client"
                : link.href === "/#survey";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "inline-flex min-h-10 items-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400",
                    isPrimary
                      ? "font-semibold text-orange-300 hover:text-orange-200"
                      : "text-slate-300 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} WorkBridge. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Built for local service discovery and trusted professional growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
