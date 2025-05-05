import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { series, Series } from "@/posts";

interface MdxLayoutProps {
  children: React.ReactNode;
  metadata?: {
    title: string;
    description: string;
    date: string;
    category: string;
    series?: string;
    slug?: string;
  };
}

export default function MdxLayout({ children, metadata }: MdxLayoutProps) {
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

  return (
    <div className="flex">
      <article className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <div className="prose dark:prose-invert max-w-none [&_pre]:max-w-none">
          {children}
        </div>
      </article>

      {currentSeries && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 w-64">
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
      )}
    </div>
  );
}
