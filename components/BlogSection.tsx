"use client";

import { useEffect, useRef, useState } from "react";
import useMounted from "@/hooks/useMounted";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSceneStore from "@/store/useSceneStore";
import ScrollFloat from "./ScrollFloat";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogSection() {
  const mounted = useMounted();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isSceneLoaded = useSceneStore((state) => state.isLoaded);
  const [isReady, setIsReady] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Custom image sizes for each card
  const imageSizes = [
    { width: 450, height: 300 }, // First card - React logo
    { width: 450, height: 300 }, // Second card - Daily life
    { width: 450, height: 300 }, // Third card - Algorithms
  ];

  // Custom image display properties for each card
  const imageDisplayProps = [
    { objectFit: "contain", objectPosition: "center", padding: "2rem" }, // First card - React logo (smaller)
    { objectFit: "cover", objectPosition: "center", padding: "0" }, // Second card - Daily life
    { objectFit: "cover", objectPosition: "center", padding: "0" }, // Third card - Algorithms
  ];

  const blogPosts = [
    {
      id: 1,
      title: "React Deep Dive Series",
      subtitle:
        "Exploring React's internals: Fiber architecture, reconciliation, and rendering pipeline",
      image: "/react-logo.svg",
      link: "/blog/react/react-deep-dive-chapter-1",
      category: "Technical",
    },
    {
      id: 2,
      title: "Life in Tech",
      subtitle:
        "Personal insights on career growth, AI's impact, and navigating the tech industry",
      image: "/daily-life.jpg",
      link: "/blog/life/dont-be-a-js-coder",
      category: "Insights",
    },
    {
      id: 3,
      title: "Algorithm Journey",
      subtitle:
        "Deep dives into data structures, algorithms, and problem-solving techniques",
      image: "/algorithms.png",
      link: "/blog/algorithm/heap",
      category: "Algorithms",
    },
  ];

  // Set ready state when Scene is loaded
  useEffect(() => {
    if (isSceneLoaded) {
      setIsReady(true);
    }
  }, [isSceneLoaded]);

  // Initialize animations only when ready
  useEffect(() => {
    if (!mounted || !isReady) return;

    // Get all card elements
    const cardElements = gsap.utils.toArray(".blog-card");

    // Set initial positions
    cardElements.forEach((card: any, index: number) => {
      gsap.set(card, {
        y: window.innerHeight,
        opacity: 0,
      });
    });

    // Create ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = cardElements.length;
        const progressPerCard = 1 / totalCards;

        cardElements.forEach((card: any, index: number) => {
          const cardStart = index * progressPerCard * 0.8;
          let cardProgress = (progress - cardStart) / progressPerCard;
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);

          let yPos = window.innerHeight * (1 - cardProgress);
          let xPos = 0;

          // Only apply horizontal movement on larger screens
          if (window.innerWidth >= 768) {
            // md breakpoint
            if (index === 0) {
              xPos = -window.innerWidth * 0.3 * cardProgress;
            } else if (index === 1) {
              xPos = 0;
            } else if (index === 2) {
              xPos = window.innerWidth * 0.3 * cardProgress;
            }
          }

          gsap.to(card, {
            y: yPos,
            x: xPos,
            opacity: cardProgress,
            duration: 0,
            ease: "none",
          });
        });
      },
    });

    return () => {
      // Clean up only our ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      // Reset card positions
      cardElements.forEach((card: any) => {
        gsap.set(card, {
          y: 0,
          x: 0,
          opacity: 1,
        });
      });
    };
  }, [mounted, isReady]);

  // Handle card hover
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);

    // Animate text elements
    const cardElements = gsap.utils.toArray(".blog-card");
    cardElements.forEach((card: any, idx: number) => {
      const title = card.querySelector("h3");
      const subtitle = card.querySelector("p");

      if (idx === index) {
        // Expand text on hover
        gsap.to([title, subtitle], {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Reset text scale
        gsap.to([title, subtitle], {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  if (!mounted || !isReady) return null;

  return (
    <section
      ref={sectionRef}
      className="blog-section h-[100dvh] flex flex-col py-20 overflow-hidden bg-gradient-to-b from-light-white/90 via-light-white/50 to-light-white dark:from-dark-black/90 dark:via-dark-black/50 dark:to-dark-black"
    >
      {mounted && isReady && (
        <div className="w-full flex justify-center items-center">
          <ScrollFloat
            textClassName="font-bold text-light-primary dark:text-dark-primary"
            animationDuration={0.8}
            ease="back.out(1.7)"
            stagger={0.05}
          >
            My Blog Posts
          </ScrollFloat>
        </div>
      )}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center flex-grow">
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 w-full p-8 relative">
          {blogPosts.map((post, idx) => (
            <a
              href={post.link}
              key={idx}
              className={`blog-card p-6 rounded-lg border w-full md:w-[450px] h-[500px] border-gray-200 dark:border-gray-700 bg-light-neutral dark:bg-dark-neutral absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                hoveredCard === idx
                  ? "scale-110 shadow-xl z-10"
                  : "hover:shadow-lg"
              }`}
              onMouseEnter={() => handleCardHover(idx)}
              onMouseLeave={() => handleCardHover(null)}
            >
              <div
                className="w-full bg-light-white/50 dark:bg-dark-black/50 rounded-md mb-6 relative overflow-hidden"
                style={{ height: `${imageSizes[idx].height}px` }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className={`transition-transform duration-300 ${
                    hoveredCard === idx ? "scale-105" : ""
                  }`}
                  style={{
                    objectFit: imageDisplayProps[idx].objectFit as any,
                    objectPosition: imageDisplayProps[idx].objectPosition,
                    padding: imageDisplayProps[idx].padding,
                  }}
                  priority={idx === 0}
                />
              </div>
              <div className="px-4">
                <span className="text-base font-medium text-light-primary dark:text-dark-secondary mb-3 block">
                  {post.category}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white transform origin-left">
                  {post.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 transform origin-left">
                  {post.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
