import { FC, CSSProperties, useState } from "react";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  hoverClassName?: string; // New prop for hover-specific classes
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

interface CustomCSSProperties extends CSSProperties {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
  hoverClassName = "", // Default to empty string if not provided
  size = "2xl",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const inlineStyles: CustomCSSProperties = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };

  const baseClasses = `${sizeClasses[size]} relative mx-auto select-none cursor-pointer whitespace-nowrap`;

  const pseudoClasses = !enableOnHover
    ? "after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060606] after:overflow-hidden after:whitespace-nowrap after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after " +
      "before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060606] before:overflow-hidden before:whitespace-nowrap before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before"
    : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060606] after:overflow-hidden after:whitespace-nowrap after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060606] before:overflow-hidden before:whitespace-nowrap before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      "hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after " +
      "hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before";

  // Use the appropriate className based on hover state
  const dynamicClasses = isHovered ? hoverClassName : className;
  const combinedClasses = `${baseClasses} ${pseudoClasses} ${dynamicClasses}`;

  const handleStart = () => {
    setIsHovered(true);
  };

  const handleEnd = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={inlineStyles}
      data-text={children}
      className={combinedClasses}
      onMouseEnter={handleStart}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      {children}
    </div>
  );
};

export default GlitchText;
