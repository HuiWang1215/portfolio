"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useState } from "react";
import { useProgress, Html } from "@react-three/drei";

function Loader() {
  const { progress, active } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="model-container h-screen bg-light-white dark:bg-dark-black relative">
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
      {/* Text overlay container */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 1.5),
          transition: "opacity 0.1s ease-out",
        }}
      >
        <div className="text-black text-4xl font-mono max-w-2xl text-center">
          <span className="animate-typing">Hello World!</span>
        </div>
      </div>
    </div>
  );
}
