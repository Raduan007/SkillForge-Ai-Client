/**
 * Reusable utility helpers for debounce and throttle.
 */

// eslint-disable-next-line no-unused-vars
type AnyFunction = (...args: any[]) => any;

/**
 * Creates a debounced function that delays invoking the callback
 * until after wait milliseconds have elapsed since the last invocation.
 */
export function debounce<T extends AnyFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes the callback
 * at most once per every limit milliseconds.
 */
export function throttle<T extends AnyFunction>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
