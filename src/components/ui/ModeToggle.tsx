import { useThemeStore } from "@/stores/useThemeStore";

import { Sun, Moon } from "lucide-react";
import Button from "./Button";
import { useEffect } from "react";

const ModeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    root.classList.add(theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
