const STORAGE_PREFIX = 'pandora' as const;

/**
 * Stores a value in localStorage with JSON serialization and namespacing
 * @param key - Storage key (will be prefixed with namespace)
 * @param value - Value to store (must be JSON-serializable)
 * @throws {Error} If localStorage is unavailable or quota exceeded
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}/${key}`, JSON.stringify(value));
  } catch (error) {
    if (error instanceof DOMException) {
      // Handle QuotaExceededError or SecurityError
      console.error(`Failed to save to localStorage: ${error.message}`);
      throw new Error(`Storage operation failed: ${error.name}`);
    }
    throw error;
  }
}

/**
 * Retrieves a value from localStorage with JSON deserialization
 * @param key - Storage key (will be prefixed with namespace)
 * @returns Parsed value or null if not found or invalid
 */
export function getItem<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(`${STORAGE_PREFIX}/${key}`);
    if (!value) return null;

    return JSON.parse(value) as T;
  } catch (error) {
    // Invalid JSON or other parsing error
    console.error(
      `Failed to parse localStorage value for key "${key}":`,
      error,
    );
    return null;
  }
}

/**
 * Removes a value from localStorage
 * @param key - Storage key (will be prefixed with namespace)
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}/${key}`);
  } catch (error) {
    console.error(`Failed to remove localStorage item "${key}":`, error);
  }
}
