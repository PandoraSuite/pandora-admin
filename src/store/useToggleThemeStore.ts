import { loadTheme, saveTheme } from '@composables/theme';
import { Theme } from '@enums/theme';
import { defineStore } from 'pinia';

export interface ThemeState {
  theme: Theme;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: loadTheme(),
  }),

  getters: {
    currentTheme: (state): string => state.theme,
    themeIcon: (state): string =>
      state.theme === Theme.Light ? 'moon' : 'sun',
  },

  actions: {
    toggleTheme(): void {
      // Toggle theme
      this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
      document.documentElement.setAttribute('data-theme', this.theme);

      // Store in localStorage to persist even with page refresh
      saveTheme(this.theme);
    },
  },
});
