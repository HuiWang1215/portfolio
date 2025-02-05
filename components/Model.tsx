import { useAnimations, useGLTF, useScroll, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

useGLTF.preload("/laptop.glb");

export default function Model() {
  const laptopRef = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF("/laptop.glb");
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();
  const [text, setText] = useState("");

  //@ts-ignore
  const action = actions["LTScreen|LTBase.001Action.001"];
  useEffect(() => {
    if (!action) return;
    action.play().paused = true;
    action.time = action.getClip().duration; // Set initial state to open

    // Simulate typing effect
    const fullText = "Hello, welcome to my laptop!";
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
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
    <group position={[0, -2, 0]}>
      <primitive object={scene} ref={laptopRef} />
      <Text
        position={[0, 3, 0]}
        fontSize={0.2}
        color="rgb(123, 123, 123)"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}
