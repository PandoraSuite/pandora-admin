import { defineStore } from "pinia";

export interface ThemeState {
  theme: string;
  icon: string;
};

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    theme: localStorage.getItem('theme-icon') || "light",
    icon: localStorage.getItem('theme-icon') || "moon",
  }),

  getters: {
    getTheme: (state): string => state.theme,
    getIcon: (state): string => state.icon,
  },

  actions: {
    toggleTheme(): void {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute("data-theme");

      // Toggle theme
      this.theme = currentTheme === "light" ? "dark" : "light";
      this.icon = currentTheme === "light" ? "sun" : "moon"
      htmlElement.setAttribute("data-theme", this.theme);

      // Store in localStorage to persist even with page refresh
      localStorage.setItem("data-theme", this.theme);
      localStorage.setItem("theme-icon", this.getIcon);
    },
  },
});

