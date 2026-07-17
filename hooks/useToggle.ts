import { useState, useCallback } from "react";

/**
 * Simplifies toggling boolean values.
 * Returns state, toggle handler, and explicit value update helper.
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (val: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
