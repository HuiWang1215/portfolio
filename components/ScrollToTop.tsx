"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Initially hide the button
    gsap.set(button, { opacity: 0, scale: 0.8, pointerEvents: "none" });

    // Kill any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const scrollTrigger = ScrollTrigger.create({
      trigger: ".blog-grid",
      start: "bottom bottom",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.to(button, {
          opacity: self.progress > 0.5 ? 1 : 0,
          scale: self.progress > 0.5 ? 1 : 0.8,
          pointerEvents: self.progress > 0.5 ? "auto" : "none",
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [pathname]); // Re-run effect when pathname changes

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-light-secondary dark:from-dark-secondary to-light-primary dark:to-dark-primary text-dark-black dark:text-light-white text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
    >
      ↑
    </button>
  );
}
