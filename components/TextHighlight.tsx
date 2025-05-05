import React from "react";
import Link from "next/link";

type ThemeType = "default" | "warning" | "danger" | "info" | "success" | "code";

interface TextHighlightProps {
  children: React.ReactNode;
  theme?: ThemeType;
  fontSize?: string;
  className?: string;
  href?: string;
  internal?: boolean;
}

const themeStyles: Record<
  ThemeType,
  { color: string; backgroundColor: string }
> = {
  default: {
    color: "#1565c0",
    backgroundColor: "#e3f2fd",
  },
  warning: {
    color: "#ef6c00",
    backgroundColor: "#fff3e0",
  },
  danger: {
    color: "#c62828",
    backgroundColor: "#ffebee",
  },
  info: {
    color: "#0277bd",
    backgroundColor: "#e1f5fe",
  },
  success: {
    color: "#2e7d32",
    backgroundColor: "#e8f5e9",
  },
  code: {
    color: "#37474f",
    backgroundColor: "#f5f5f5",
  },
};

const TextHighlight: React.FC<TextHighlightProps> = ({
  children,
  theme = "default",
  fontSize = "inherit",
  className = "",
  href,
  internal = false,
}) => {
  const { color, backgroundColor } = themeStyles[theme];

  const baseStyles = {
    color,
    backgroundColor,
    fontSize,
    padding: "0.1em 0.3em",
    borderRadius: "0.2em",
    fontFamily: theme === "code" ? "monospace" : "inherit",
  };

  if (href) {
    if (internal) {
      return (
        <Link
          href={href}
          className={`${className} hover:opacity-80 transition-opacity`}
          style={baseStyles}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:opacity-80 transition-opacity`}
        style={baseStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <span className={className} style={baseStyles}>
      {children}
    </span>
  );
};

export default TextHighlight;
