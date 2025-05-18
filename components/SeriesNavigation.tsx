"use client";

import Link from "next/link";
import { ChevronRight, BookOpen, X } from "lucide-react";
import { series, Series } from "@/posts";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SeriesNavigationProps {
  metadata?: {
    title: string;
    description: string;
    date: string;
    category: string;
    series?: string;
    slug?: string;
  };
}

export default function SeriesNavigation({ metadata }: SeriesNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentSeries = metadata?.series
    ? series.find((s: Series) => s.series === metadata.series)
    : undefined;
  const currentPostIndex =
    currentSeries?.posts.findIndex(
      (post: { slug: string }) => post.slug === metadata?.slug
    ) ?? -1;
  const nextPost =
    currentPostIndex !== -1
      ? currentSeries?.posts[currentPostIndex + 1]
      : undefined;

  if (!currentSeries) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 w-64">
        <div className="bg-light-neutral dark:bg-dark-neutral rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
            {currentSeries.series}
          </h3>
          <ul className="space-y-2">
            {currentSeries.posts.map(
              (post: { slug: string; title: string }) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${metadata?.category}/${post.slug}`}
                    className={`block py-1 px-2 rounded ${
                      post.slug === metadata?.slug
                        ? "bg-light-primary/40 dark:bg-dark-primary text-black dark:text-white"
                        : "hover:bg-light-secondary/40 dark:hover:bg-dark-secondary/40 text-black dark:text-white"
                    }`}
                  >
                    {post.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {nextPost && (
          <div className="mt-8">
            <Link
              href={`/blog/${metadata?.category}/${nextPost.slug}`}
              className="flex items-center justify-between bg-light-primary/30 dark:bg-dark-primary hover:bg-light-secondary/40 dark:hover:bg-dark-secondary/40 text-black dark:text-white rounded-lg p-4 transition-colors"
            >
              <span>Next: {nextPost.title}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-8 right-8 lg:hidden bg-light-primary dark:bg-dark-primary text-black dark:text-white p-4 rounded-full shadow-lg z-50"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <BookOpen className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-8 lg:hidden w-[calc(100%-4rem)] max-w-sm bg-light-neutral dark:bg-dark-neutral rounded-lg shadow-lg p-4 z-40"
          >
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
              {currentSeries.series}
            </h3>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
              {currentSeries.posts.map(
                (post: { slug: string; title: string }) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${metadata?.category}/${post.slug}`}
                      className={`block py-1 px-2 rounded ${
                        post.slug === metadata?.slug
                          ? "bg-light-primary/40 dark:bg-dark-primary text-black dark:text-white"
                          : "hover:bg-light-secondary/40 dark:hover:bg-dark-secondary/40 text-black dark:text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {post.title}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {nextPost && (
              <div className="mt-4 pt-4 border-t border-light-secondary/20 dark:border-dark-secondary/20">
                <Link
                  href={`/blog/${metadata?.category}/${nextPost.slug}`}
                  className="flex items-center justify-between bg-light-primary/30 dark:bg-dark-primary hover:bg-light-secondary/40 dark:hover:bg-dark-secondary/40 text-black dark:text-white rounded-lg p-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Next: {nextPost.title}</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
