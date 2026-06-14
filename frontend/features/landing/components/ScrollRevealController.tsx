"use client";

import { useEffect } from "react";

const enabledClass = "scroll-reveal-enabled";
const revealedClass = "is-revealed";
const revealSelector = "[data-reveal]";

export default function ScrollRevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector)
    );

    if (revealElements.length === 0) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function showAllImmediately() {
      root.classList.remove(enabledClass);
      revealElements.forEach((element) => {
        element.classList.add(revealedClass);
      });
    }

    if (reducedMotionQuery.matches) {
      showAllImmediately();

      return;
    }

    if (!("IntersectionObserver" in window)) {
      showAllImmediately();

      return;
    }

    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isAlreadyVisible =
        rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

      if (isAlreadyVisible) {
        element.classList.add(revealedClass);
      }
    });

    root.classList.add(enabledClass);

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(revealedClass);
          currentObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains(revealedClass)) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      root.classList.remove(enabledClass);
    };
  }, []);

  return null;
}
