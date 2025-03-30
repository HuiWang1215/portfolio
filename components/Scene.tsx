"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import Loading from "./Loading";
import Model from "./Model";
import TypewriterText from "./TypewriterText";

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-8">
        {/* Loading bar */}
        <div className="w-96 h-3 bg-light-secondary dark:bg-dark-black/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-light-primary dark:bg-dark-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="font-mono text-light-primary dark:text-dark-primary text-3xl font-semibold">
          <Loading
            to={progress}
            from={0}
            duration={0.5}
            separator="."
            className="font-mono text-3xl"
          />
          %
        </div>

        {/* Loading message */}
        <div className="text-black dark:text-white/80 text-xl animate-pulse mt-4">
          Loading awesome content...
        </div>
      </div>
    </Html>
  );
}

export default function Scene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress]);

  const words = ["I'm a frontend developer", "Let's build and learn something"];

  const adjectives = ["interesting", "fancy", "amazing ! ! !"];

  return (
    <>
      <div className="model-container h-[100dvh] relative bg-gradient-to-bl from-light-primary/70 via-light-secondary/50 to-light-white dark:from-dark-secondary/70 dark:via-dark-primary/50 dark:to-dark-black">
        <Canvas
          gl={{ antialias: true }}
          dpr={[1, 1.5]}
          className="relative h-full"
          camera={{ position: [0, 0, 20], fov: 50 }}
        >
          <directionalLight position={[10, 10, 5]} intensity={8} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Model onScrollProgress={setScrollProgress} />
          </Suspense>
        </Canvas>
      </div>
      {/* Text overlay container */}
      {isLoaded && (
        <div
          className="fixed inset-0"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            transition: "opacity 0.1s ease-out",
            pointerEvents: "none",
            touchAction: "pan-y",
            height: "100dvh",
          }}
        >
          <div className="max-w-7xl mx-auto pt-40 sm:pt-60 px-2 sm:px-4 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-light-primary dark:text-dark-primary">
              Hi! I'm Jonny (Hui) Wang
            </h1>

            <TypewriterText
              words={words}
              typingSpeed={100}
              deletingSpeed={50}
              adjectives={adjectives}
              className="text-3xl sm:text-5xl font-bold text-dark-black/90 dark:text-light-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
