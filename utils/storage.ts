/**
 * Safely handles typed LocalStorage and SessionStorage transactions (supporting SSR environments).
 */

class SafeStorage {
  private storage: Storage | null = null;

  constructor(type: "local" | "session") {
    if (typeof window !== "undefined") {
      try {
        this.storage = type === "local" ? window.localStorage : window.sessionStorage;
      } catch (e) {
        console.warn(`Storage type "${type}" is not supported or accessible in this environment.`, e);
      }
    }
  }

  /**
   * Retrieves and parses data from storage.
   */
  getItem<T>(key: string): T | null {
    if (!this.storage) return null;
    try {
      const item = this.storage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading key "${key}" from storage:`, error);
      return null;
    }
  }

  /**
   * Serializes and writes data to storage.
   */
  setItem<T>(key: string, value: T): void {
    if (!this.storage) return;
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing key "${key}" to storage:`, error);
    }
  }

  /**
   * Removes item from storage.
   */
  removeItem(key: string): void {
    if (!this.storage) return;
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting key "${key}" from storage:`, error);
    }
  }

  /**
   * Clears all storage keys.
   */
  clear(): void {
    if (!this.storage) return;
    try {
      this.storage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }
}

// Export single, safe instances
export const safeLocalStorage = new SafeStorage("local");
export const safeSessionStorage = new SafeStorage("session");
