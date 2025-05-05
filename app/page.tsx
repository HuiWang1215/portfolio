import BlogSection from "@/components/BlogSection";
import Scene from "@/components/Scene";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-light-white dark:bg-dark-black">
      <Scene />
      <BlogSection />
      <Footer />
    </main>
  );
}
