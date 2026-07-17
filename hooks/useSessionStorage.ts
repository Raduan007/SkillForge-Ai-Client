import { useState, useEffect, useCallback } from "react";
import { safeSessionStorage } from "@/utils/storage";

/**
 * Custom state hook synced with sessionStorage (supports SSR contexts).
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = safeSessionStorage.getItem<T>(key);
    return item !== null ? item : initialValue;
  });

  // Sync value on mount or key change
  useEffect(() => {
    const item = safeSessionStorage.getItem<T>(key);
    if (item !== null) {
      setStoredValue(item);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        safeSessionStorage.setItem(key, valueToStore);
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
