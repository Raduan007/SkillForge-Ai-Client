import { useState, useEffect, useCallback } from "react";
import { safeLocalStorage } from "@/utils/storage";

/**
 * Custom state hook synced with localStorage (supports SSR contexts).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = safeLocalStorage.getItem<T>(key);
    return item !== null ? item : initialValue;
  });

  // Sync value on mount or key change
  useEffect(() => {
    const item = safeLocalStorage.getItem<T>(key);
    if (item !== null) {
      setStoredValue(item);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        safeLocalStorage.setItem(key, valueToStore);
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
