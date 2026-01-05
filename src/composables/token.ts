import { getItem, removeItem, setItem } from './_internal/localStorage';

/**
 * Saves the authentication token to localStorage
 * @param token - The JWT token to store
 */
export function saveToken(token: string): void {
  setItem<string>('token', token);
}

/**
 * Loads the authentication token from localStorage
 * @returns The stored token, or empty string if not found
 */
export function loadToken(): string {
  const token: string | null = getItem<string>('token');
  return token ?? '';
}

/**
 * Removes the authentication token from localStorage
 */
export function clearToken(): void {
  removeItem('token');
}
