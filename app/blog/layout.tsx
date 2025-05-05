import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frontend Blog",
  description:
    "Frontend Blog | Explore my latest articles on frontend development, technology, and programming insights.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-light-white dark:bg-dark-black">
      {children}
    </div>
  );
}
