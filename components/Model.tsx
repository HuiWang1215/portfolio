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
  const [error, setError] = useState<string | null>(null);
  const { animations, scene } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, scene);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();
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
    if (!action) return;

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
  }, [action]);

  // Store original material properties
  useEffect(() => {
    if (!laptopRef.current) return;

    laptopRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        const material = child.material as MeshStandardMaterial;
        if (material) {
          if (
            child.name.includes("Screen") &&
            !originalMaterialsRef.current.screen
          ) {
            originalMaterialsRef.current.screen = {
              color: material.color.clone(),
              emissive: material.emissive.clone(),
              emissiveIntensity: material.emissiveIntensity,
            };
          } else if (
            !child.name.includes("Screen") &&
            !originalMaterialsRef.current.body
          ) {
            originalMaterialsRef.current.body = {
              color: material.color.clone(),
              emissive: material.emissive.clone(),
              emissiveIntensity: material.emissiveIntensity,
            };
          }
        }
      }
    });
  }, []);

  // Update screen color based on theme
  useEffect(() => {
    if (!laptopRef.current || !originalMaterialsRef.current.screen) return;

    laptopRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        const material = child.material as MeshStandardMaterial;
        if (material) {
          if (child.name.includes("Screen")) {
            if (theme === "dark") {
              material.color.set("#1a1a1a");
              material.emissive.set("#000000");
              material.emissiveIntensity = 0;
            } else {
              // Reset to original screen material properties
              material.color.set("#ffffff"); // Set to white in light mode
              material.emissive.set("#ffffff"); // White emissive
              material.emissiveIntensity = 0.5; // Subtle glow
            }
          } else if (child.name.includes("Body")) {
            // Use theme-based colors for the body
            if (theme === "dark") {
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
  }, [theme]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".model-container",
        start: "top top",
        end: "+=150%",
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

    return () => {
      if (tl) {
        tl.kill();
      }
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

  if (error) {
    return (
      <Html center>
        <div
          style={{
            background: "rgba(255,0,0,0.1)",
            padding: "20px",
            borderRadius: "5px",
            color: "red",
            textAlign: "center",
          }}
        >
          <p>Error loading model: {error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </Html>
    );
  }

  return (
    <group position={[0, -20, 0]}>
      <primitive object={scene} ref={laptopRef} />
    </group>
  );
}
