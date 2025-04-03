import { defineStore } from "pinia";

export type ThemeState = {
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

      // Alternar tema
      this.theme = currentTheme === "light" ? "dark" : "light";
      this.icon = currentTheme === "light" ? "sun" : "moon"
      htmlElement.setAttribute("data-theme", this.theme);

      // Almacenar en localStorage para persistir aún con refresco de página
      const themIcon: string = this.getIcon;
      localStorage.setItem("data-theme", this.theme);
      localStorage.setItem("theme-icon", themIcon);
    },
  },
});

