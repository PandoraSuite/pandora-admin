import { Theme } from '@enums/theme';
import { setItem, getItem } from '@composables/_internal/localStorage';

export function saveTheme(value: Theme): void {
    setItem<Theme>("theme", value);
}

export function loadTheme(): Theme {
    const theme: Theme | null = getItem<Theme>("theme");
    return theme ? theme : Theme.Light;
}
