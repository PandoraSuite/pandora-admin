import { Theme } from '@enums/theme';
import { getItem, setItem } from './_internal/localStorage';

/**
 * Saves the user's theme preference to localStorage
 * @param value - The theme to save (light or dark)
 */
export function saveTheme(value: Theme): void {
  setItem<Theme>('theme', value);
}

/**
 * Loads the user's theme preference from localStorage
 * @returns The stored theme, or Theme.Light as default
 */
export function loadTheme(): Theme {
  const theme: Theme | null = getItem<Theme>('theme');

  // Validate that the stored value is actually a valid Theme
  if (theme && Object.values(Theme).includes(theme)) {
    return theme;
  }

  return Theme.Light;
}
