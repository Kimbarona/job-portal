"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#why-workbridge", id: "why-workbridge", label: "Why WorkBridge" },
  { href: "/#features", id: "features", label: "Features" },
  { href: "/#how-it-works", id: "how-it-works", label: "How It Works" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#faq", id: "faq", label: "FAQ" },
];

const trackedSectionIds = [
  "why-workbridge",
  "features",
  "how-it-works",
  "services",
  "survey",
  "faq",
];

const activeSectionOffset = 120;

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let frameId = 0;

    function updateHeaderState() {
      setHasScrolled(window.scrollY > 8);

      let currentSection = "";

      for (const sectionId of trackedSectionIds) {
        const section = document.getElementById(sectionId);

        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= activeSectionOffset) {
          currentSection = sectionId;
        }
      }

      setActiveSection(currentSection);
    }

    function scheduleUpdate() {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateHeaderState();
      });
    }

    updateHeaderState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    }

    if (desktopQuery.matches) {
      setIsMenuOpen(false);
    }

    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function getDesktopNavClass(sectionId: string) {
    const isActive = activeSection === sectionId;

    return [
      "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
      isActive
        ? "bg-orange-50 text-orange-700"
        : "text-slate-700 hover:bg-slate-100 hover:text-blue-700",
    ].join(" ");
  }

  function getMobileNavClass(sectionId: string) {
    const isActive = activeSection === sectionId;

    return [
      "flex rounded-lg px-3 py-3 text-base font-semibold transition-colors",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
      isActive
        ? "bg-orange-50 text-orange-700"
        : "text-slate-700 hover:bg-slate-100 hover:text-blue-700",
    ].join(" ");
  }

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        hasScrolled
          ? "border-b border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
          : "border-b border-slate-100 bg-white",
      ].join(" ")}
    >
      <div className="mx-auto flex min-h-[4.25rem] max-w-[88rem] items-center justify-between gap-5 px-4 py-2.5 sm:min-h-[4.75rem] sm:gap-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="WorkBridge home"
          className="flex min-w-0 shrink-0 items-center gap-2.5 text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:gap-3"
          onClick={closeMenu}
        >
          <Image
            src="/assets/branding/wb-logo.png"
            alt="WorkBridge icon"
            width={1254}
            height={1254}
            priority
            sizes="(min-width: 1280px) 52px, (min-width: 640px) 48px, 44px"
            className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12 xl:h-[3.25rem] xl:w-[3.25rem]"
          />
          <span className="flex min-w-0 flex-col justify-center leading-none">
            <span className="text-xl font-bold leading-none text-slate-950 sm:text-2xl xl:text-[1.625rem]">
              WorkBridge
            </span>
            <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase leading-none tracking-[0.14em] text-slate-500 sm:block lg:hidden xl:block">
              SKILLED SERVICES MARKETPLACE
            </span>
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={getDesktopNavClass(item.id)}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:flex">
          <Link
            href="/#survey"
            className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-950/20 transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
          >
            Join early access
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 lg:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="relative h-5 w-5" aria-hidden="true">
            <span
              className={[
                "absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition-transform",
                isMenuOpen ? "translate-y-1.5 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition-opacity",
                isMenuOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition-transform",
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className="border-t border-slate-200 bg-white shadow-lg shadow-slate-950/5 lg:hidden"
      >
        <div className="mx-auto max-w-[88rem] px-4 py-4 sm:px-6 lg:px-8">
          <nav className="grid gap-1" aria-label="Mobile primary">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={getMobileNavClass(item.id)}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-200 pt-4">
            <Link
              href="/#survey"
              className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-950/20 transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              onClick={closeMenu}
            >
              Join early access
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
