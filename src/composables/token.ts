import { getItem, removeItem, setItem } from './_internal/localStorage';

export function saveToken(token: String): void {
  setItem<String>('token', token);
}

export function loadToken(): String {
  const token: String | null = getItem<String>('token');
  return token ? token : '';
}

export function clearToken(): void {
  removeItem('token');
}
