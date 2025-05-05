import { useAnimations, useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, MeshStandardMaterial, Mesh, Color } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const modelUrl =
  "https://pub-506fb8b20a2a47668961c0d63217f1cb.r2.dev/laptop-optimized.glb";

useGLTF.preload(modelUrl);

interface ModelProps {
  onScrollProgress?: (progress: number) => void;
}

export default function Model({ onScrollProgress }: ModelProps) {
  const laptopRef = useRef<Group>(null);
  const { animations, scene } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, scene);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { resolvedTheme } = useTheme();
  const originalMaterialsRef = useRef<{
    screen: {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
    } | null;
    body: {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
    } | null;
  }>({
    screen: null,
    body: null,
  });

  //@ts-ignore
  const action = actions["LTScreen|LTBase.001Action.001"];

  useEffect(() => {
    if (!action || !resolvedTheme) return;

    // Set up the action
    action.play();
    action.paused = true;
    action.time = action.getClip().duration; // Start with lid open
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(1);

    // Set initial scale to make screen take over viewport
    if (laptopRef.current) {
      laptopRef.current.scale.set(150, 150, 75); // Increased scale further
    }
  }, [action, resolvedTheme]);

  // Store original material properties and update colors based on theme
  useEffect(() => {
    if (!laptopRef.current || !resolvedTheme) return;

    const updateMaterials = () => {
      laptopRef.current?.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material as MeshStandardMaterial;
          if (material) {
            if (child.name.includes("Screen")) {
              if (!originalMaterialsRef.current.screen) {
                originalMaterialsRef.current.screen = {
                  color: material.color.clone(),
                  emissive: material.emissive.clone(),
                  emissiveIntensity: material.emissiveIntensity,
                };
              }
              if (resolvedTheme === "dark") {
                material.color.set("#1a1a1a");
                material.emissive.set("#000000");
                material.emissiveIntensity = 0;
              } else {
                material.color.set("#ffffff");
                material.emissive.set("#ffffff");
                material.emissiveIntensity = 0.5;
              }
            } else if (!child.name.includes("Screen")) {
              if (!originalMaterialsRef.current.body) {
                originalMaterialsRef.current.body = {
                  color: material.color.clone(),
                  emissive: material.emissive.clone(),
                  emissiveIntensity: material.emissiveIntensity,
                };
              }
              if (resolvedTheme === "dark") {
                material.color.set("#000000");
              } else {
                material.color.set("#808080");
              }
              material.emissive.set("#000000");
              material.emissiveIntensity = 1;
            }
          }
        }
      });
    };

    // Run immediately
    updateMaterials();

    // Also run when theme changes
    return () => {
      updateMaterials();
    };
  }, [resolvedTheme]);

  useEffect(() => {
    // Create a timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".model-container",
        start: "top top",
        end: "+=200%",
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          onScrollProgress?.(self.progress);
        },
        onEnter: () => {
          if (action) {
            action.play();
          }
        },
      },
    });

    // Force an initial update to sync with current scroll position
    if (window.scrollY > 0) {
      const scrollY = window.scrollY;
      const container = document.querySelector(".model-container");
      if (container) {
        const containerHeight = container.clientHeight;
        const progress = scrollY / (containerHeight * 2); // 200% of container height
        tl.progress(Math.min(Math.max(progress, 0), 1));
      }
    }

    return () => {
      // Clean up the timeline and ScrollTrigger
      if (tl) {
        tl.kill();
      }
      // Also kill any ScrollTrigger instances associated with this timeline
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".model-container") {
          trigger.kill();
        }
      });
    };
  }, [action, onScrollProgress]);

  useFrame(() => {
    if (!action || !laptopRef.current || !laptopRef.current.parent) return;

    // Calculate the animation progress based on scroll
    const animationProgress = Math.min(scrollProgress, 1);

    // Animate the lid closing (reverse the progress to start open)
    action.time = action.getClip().duration * (1 - animationProgress);

    // Scale down the laptop as we scroll (slower scaling)
    const scale = 150 - scrollProgress * 120; // Back to original scaling but will take longer due to longer scroll
    laptopRef.current.scale.set(scale, scale, scale / 2);

    // Move the laptop up as we scroll (slower movement)
    const yPosition = -20 + scrollProgress * 15; // Back to original movement but will take longer due to longer scroll
    laptopRef.current.parent.position.y = yPosition;
  });

  return (
    <group position={[0, -20, 0]}>
      <primitive object={scene} ref={laptopRef} />
    </group>
  );
}
