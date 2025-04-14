const STORAGE_PREFIX: string = "pandora"

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(`${STORAGE_PREFIX}/${key}`, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(`${STORAGE_PREFIX}/${key}`);
  return value ? JSON.parse(value) as T : null;
}
