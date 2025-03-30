"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import useMounted from "@/hooks/useMounted";
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
