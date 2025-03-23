import { posts } from "@/posts";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="pt-20 bg-gradient-light dark:bg-gradient-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-5">
        {posts.map((p, idx) => (
          <Link
            key={idx}
            href={`/blog/${p.slug}`}
            className="p-4 group rounded-lg border w-[392px] border-light-neutral dark:border-dark-neutral bg-light-secondary dark:bg-dark-primary"
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
            <p className="text-sm bg-light-accent dark:bg-dark-accent text-light-primary dark:text-dark-secondary font-semibold my-4 w-fit px-2 py-1 rounded-sm">
              {p.category}
            </p>

            {/* title */}
            <h2 className="text-2xl leading-7 font-bold py-1 line-clamp-2 text-light-primary dark:text-dark-secondary">
              {p.title}
            </h2>

            {/* author and date */}
            <div className="text-light-neutral dark:text-dark-neutral flex text-base space-x-10 py-3">
              <div>{p.author}</div>
              <div>{p.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
