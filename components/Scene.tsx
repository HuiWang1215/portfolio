"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import Loading from "./Loading";
import Model from "./Model";
import TypewriterText from "./TypewriterText";
import useSceneStore from "@/store/useSceneStore";

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

function WaveBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[30vh] overflow-visible">
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "100%" }}
      >
        <path
          className="fill-light-primary/20 dark:fill-dark-secondary/20"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          className="fill-light-secondary/60 dark:fill-dark-primary/60"
          d="M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,250.7C672,235,768,213,864,192C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          className="fill-light-white dark:fill-dark-black"
          d="M0,288L48,277.3C96,267,192,245,288,224C384,203,480,181,576,186.7C672,192,768,224,864,229.3C960,235,1056,213,1152,202.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}

export default function Scene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { progress } = useProgress();
  const setIsLoaded = useSceneStore((state) => state.setIsLoaded);
  const isLoaded = useSceneStore((state) => state.isLoaded);

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress, setIsLoaded]);

  const words = ["A frontend developer", "Let's build and learn something"];

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
        <WaveBackground />
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
              className="text-3xl sm:text-5xl font-bold"
            />
          </div>
        </div>
      )}
    </>
  );
}
