"use client";

import { posts } from "@/posts";
import Image from "next/image";
import Link from "next/link";
import ScrollFloat from "@/components/ScrollFloat";
import useMounted from "@/hooks/useMounted";

export default function BlogSection() {
  const mounted = useMounted();

  return (
    <div className="blog-section">
      {mounted && (
        <ScrollFloat
          containerClassName="flex justify-center items-center w-full"
          textClassName="text-4xl font-bold text-light-primary dark:text-dark-primary"
          animationDuration={0.5}
          ease="back.inOut(2)"
          stagger={0.1}
        >
          My Blog Posts
        </ScrollFloat>
      )}
      <div className="blog-grid grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 bg-light-natural dark:bg-dark-natural">
        {posts.map((p, idx) => (
          <Link
            key={idx}
            href={`/blog/${p.slug}`}
            className="p-4 group rounded-lg border w-[392px] border-gray-200 dark:border-gray-700"
          >
            {/* image */}
            <div className="h-60 w-full relative overflow-hidden rounded-md object-cover group-hover:scale-105 duration-300 transition-all">
              <Image
                src={p.thumbnail}
                alt={`${p.title} - thumbnail`}
                sizes="100vh"
                fill
              />
            </div>

            {/* category */}
            <p className="text-sm bg-gray-100 dark:bg-gray-700/95 text-blue-700 dark:text-blue-500 font-semibold my-4 w-fit px-2 py-1 rounded-sm">
              {p.category}
            </p>

            {/* title */}
            <h2 className="text-2xl leading-7 font-bold py-1 line-clamp-2">
              {p.title}
            </h2>

            {/* author and date */}
            <div className="text-gray-500 flex text-base space-x-10 py-3">
              <div>{p.author}</div>
              <div>{p.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
