import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeState {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
    toggleTheme: () => void;
}

const getInitialTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme");
        const parsedStoredTheme = storedTheme ? JSON.parse(storedTheme) : { state: { theme: "light" } }
        return parsedStoredTheme.state.theme === "dark" ? "dark" : "light";
    }
    return "light";
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: getInitialTheme(),
            setTheme: (theme) => {
                set({ theme });
                document.documentElement.classList.toggle("dark", theme === "dark");
            },
            toggleTheme: () => {
                const newTheme = get().theme === "dark" ? "light" : "dark";
                set({ theme: newTheme });
                document.documentElement.classList.toggle("dark", newTheme === "dark");
            },
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
