import * as React from "react";
import { ThemeProvider as ReactThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ReactThemesProvider>) {
  return <ReactThemesProvider {...props}>{children}</ReactThemesProvider>;
}
