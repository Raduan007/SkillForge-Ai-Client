import { useState, useCallback } from "react";

/**
 * Copies a text to the system clipboard and tracks the copied state status.
 */
export function useCopyToClipboard(): [boolean, (text: string) => Promise<boolean>] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (typeof window === "undefined" || !navigator.clipboard) {
      console.warn("Clipboard transactions are not supported or blocked in this window environment.");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset toast confirmation after 2 seconds
      return true;
    } catch (error) {
      console.warn("Failed to write to clipboard:", error);
      setCopied(false);
      return false;
    }
  }, []);

  return [copied, copy];
}
