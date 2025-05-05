import { postsByCategory } from "@/posts";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-gradient-light dark:bg-gradient-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 pt-20">
        {Object.entries(postsByCategory).map(([category, posts]) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-light-primary dark:text-dark-primary capitalize">
              {category}
            </h2>
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${category}/${post.slug}`}
                  className="block p-6 rounded-lg bg-light-neutral dark:bg-dark-neutral hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-2 text-black dark:text-white transition-transform duration-300 group-hover:scale-[1.02]">
                    {post.title}
                  </h3>
                  <p className="text-black/80 dark:text-white/80 transition-transform duration-300 group-hover:scale-[1.02]">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
