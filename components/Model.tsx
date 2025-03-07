import {
  useAnimations,
  useGLTF,
  useScroll,
  Text,
  Html,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, Suspense } from "react";
import { Group } from "three";

// Replace with your custom domain URL
const modelUrl = "https://jonnywang.tech/laptop.glb";

useGLTF.preload(modelUrl);

export default function Model() {
  const laptopRef = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(modelUrl);
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  //@ts-ignore
  const action = actions["LTScreen|LTBase.001Action.001"];
  useEffect(() => {
    if (!action) return;
    action.play().paused = true;
    action.time = action.getClip().duration; // Set initial state to open
  }, [action]);

  useFrame(() => {
    if (!action) return;
    action.time = action.getClip().duration * (1 - scroll.offset); // Reverse the animation

    // Animate the scale based on scroll offset
    const scaleValue = Math.max(10, 30 * (1 - scroll.offset)); // Start at 30 and shrink to 10
    if (laptopRef.current) {
      laptopRef.current.scale.set(
        scaleValue,
        scaleValue,
        Math.max(5, scaleValue / 2)
      );
    }
  });

  return (
    <Suspense fallback={<Html center>Loading...</Html>}>
      <group position={[0, -2, 0]}>
        <primitive object={scene} ref={laptopRef} />
      </group>
    </Suspense>
  );
}
