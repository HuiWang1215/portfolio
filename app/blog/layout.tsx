import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | My Portfolio",
  description:
    "Explore my latest articles on web development, technology, and programming insights.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
  );
}
