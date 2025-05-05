"use client";

import GlitchText from "./GlitchText";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  text: string;
  size?: "2xl" | "4xl";
  className?: string;
  hoverClassName?: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  additionalClasses?: string;
}

export default function NavLink({
  href,
  text,
  size = "2xl",
  className = "font-bold text-dark-black dark:text-light-white hover:text-light-neutral dark:hover:text-dark-neutral transition-colors",
  hoverClassName = "text-2xl font-bold text-light-accent dark:text-dark-accent transition-colors",
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  additionalClasses = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const glitchText = (
    <GlitchText
      speed={speed}
      enableShadows={enableShadows}
      enableOnHover={enableOnHover}
      size={size}
      hoverClassName={hoverClassName}
      className={className}
    >
      {text}
    </GlitchText>
  );

  // Use <a> tag only when on home page and navigating to home
  if (isHomePage || href === "/") {
    return (
      <a href={href} className={`flex-shrink-0 ${additionalClasses}`}>
        {glitchText}
      </a>
    );
  }

  // Use Next.js Link for all other cases
  return (
    <Link href={href} className={`flex-shrink-0 ${additionalClasses}`}>
      {glitchText}
    </Link>
  );
}
