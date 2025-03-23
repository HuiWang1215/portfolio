"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-light-white/90 dark:bg-dark-black/90 backdrop-blur-sm border-b border-light-neutral dark:border-dark-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Home button */}
          <Link
            href="/"
            className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
          >
            Home
          </Link>

          {/* Blog button */}
          <Link
            href="/blog"
            className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
          >
            Blog
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
