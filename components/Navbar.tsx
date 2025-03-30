"use client";

import Link from "next/link";
import GlitchText from "./GlitchText";
import GradientButton from "./GradientButton";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const blogSection = document.querySelector(".blog-section");
      if (!blogSection) return;

      const blogSectionRect = blogSection.getBoundingClientRect();
      const isPastBlogSection = blogSectionRect.top <= 0;

      if (isPastBlogSection) {
        nav.classList.add("bg-light-white/80", "dark:bg-dark-black/80");
      } else {
        nav.classList.remove("bg-light-white/80", "dark:bg-dark-black/80");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed pt-4 top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-end pb-4">
          {/* Left side - Name */}
          <div className="flex items-end">
            <Link href="/" className="flex-shrink-0">
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={true}
                size="4xl"
                hoverClassName="text-4xl sm:text-4xl lg:text-5xl font-bold text-light-accent dark:text-dark-accent transition-colors"
                className="font-bold text-4xl sm:text-4xl lg:text-5xl text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors [text-shadow:1px_1px_0_black,_-1px_1px_0_black,_1px_-1px_0_black,_-1px_-1px_0_black] dark:[text-shadow:1px_1px_0_white,_-1px_1px_0_white,_1px_-1px_0_white,_-1px_-1px_0_white]"
              >
                Jonny Wang
              </GlitchText>
            </Link>
          </div>

          {/* Right side - Blog and Theme button */}
          <div className="flex items-center space-x-8 pr-2 sm:px-4 lg:pr-8">
            <Link href="/blog" className="flex-shrink-0">
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={true}
                size="2xl"
                hoverClassName="text-2xl font-bold text-light-accent dark:text-dark-accent transition-colors"
                className="font-bold text-dark-black dark:text-light-white hover:text-light-neutral dark:hover:text-dark-neutral transition-colors"
              >
                Blog
              </GlitchText>
            </Link>
            <GradientButton animationSpeed={3} />
          </div>
        </div>
      </div>
    </nav>
  );
}
