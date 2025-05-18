"use client";

import GradientButton from "./GradientButton";
import { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed pt-4 top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-end pb-4">
          {/* Left side - Name */}
          <div className="flex items-end">
            <div className="flex items-center space-x-3">
              <NavLink
                href="/"
                text="J"
                size="4xl"
                speed={0.3}
                className="font-bold text-4xl sm:text-4xl lg:text-5xl text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors [text-shadow:1px_1px_0_black,_-1px_1px_0_black,_1px_-1px_0_black,_-1px_-1px_0_black] dark:[text-shadow:1px_1px_0_white,_-1px_1px_0_white,_1px_-1px_0_white,_-1px_-1px_0_white] transform [rotate:8deg] hover:[rotate:0deg] transition-transform duration-300"
                hoverClassName="text-4xl sm:text-4xl lg:text-5xl font-bold text-light-accent dark:text-dark-accent transition-colors"
              />
              <NavLink
                href="/"
                text="W"
                size="4xl"
                speed={0.3}
                className="font-bold text-4xl sm:text-4xl lg:text-5xl text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors [text-shadow:1px_1px_0_black,_-1px_1px_0_black,_1px_-1px_0_black,_-1px_-1px_0_black] dark:[text-shadow:1px_1px_0_white,_-1px_1px_0_white,_1px_-1px_0_white,_-1px_-1px_0_white] transform [rotate:-8deg] hover:[rotate:0deg] transition-transform duration-300"
                hoverClassName="text-4xl sm:text-4xl lg:text-5xl font-bold text-light-accent dark:text-dark-accent transition-colors"
              />
            </div>
          </div>

          {/* Right side - Navigation and Theme button */}
          <div className="flex items-center space-x-8 pr-2 sm:px-4 lg:pr-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/" text="Home" size="2xl" />
              <NavLink href="/blog" text="Blog" size="2xl" />
              <NavLink href="/about" text="About" size="2xl" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-light-neutral dark:hover:bg-dark-neutral transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-light-primary dark:bg-dark-primary transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-light-primary dark:bg-dark-primary transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-light-primary dark:bg-dark-primary transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>

            <GradientButton animationSpeed={2} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mobile-menu absolute top-full left-0 right-0 bg-light-white/95 dark:bg-dark-black/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800"
          >
            <div
              className="flex flex-col py-4 px-4 space-y-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <NavLink href="/" text="Home" size="2xl" />
              <NavLink href="/blog" text="Blog" size="2xl" />
              <NavLink href="/about" text="About" size="2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
