/**
 * Standard utility formatters for dates, currencies, compact numbers, relative times, and slugs.
 */

/**
 * Formats a date, string, or number timestamp into a readable text format.
 * Example: '2026-07-17T00:00:00Z' -> 'July 17, 2026'
 */
export function formatDate(date: string | Date | number): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/**
 * Formats a numeric value into a currency layout.
 * Example: 1250 -> '$1,250.00'
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formats standard numbers with decimal options.
 */
export function formatNumber(
  num: number,
  options?: Intl.NumberFormatOptions,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Formats large metrics into compact notations (e.g. K, M, B representation).
 * Example: 12500 -> '12.5k'
 */
export function formatCompactNumber(num: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Calculates and formats relative elapsed time descriptions.
 * Example: July 15, 2026 -> '2 days ago' (if today is July 17)
 */
export function formatRelativeTime(date: string | Date | number): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const now = new Date();
  const diffInMs = d.getTime() - now.getTime();
  const diffInSecs = Math.round(diffInMs / 1000);

  const absSecs = Math.abs(diffInSecs);

  if (absSecs < 60) return "just now";

  const diffInMins = Math.round(diffInSecs / 60);
  const absMins = Math.abs(diffInMins);
  if (absMins < 60) {
    return diffInMins > 0 ? `in ${absMins}m` : `${absMins}m ago`;
  }

  const diffInHours = Math.round(diffInMins / 60);
  const absHours = Math.abs(diffInHours);
  if (absHours < 24) {
    return diffInHours > 0 ? `in ${absHours}h` : `${absHours}h ago`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  const absDays = Math.abs(diffInDays);
  if (absDays < 30) {
    return diffInDays > 0 ? `in ${absDays}d` : `${absDays}d ago`;
  }

  const diffInMonths = Math.round(diffInDays / 30);
  const absMonths = Math.abs(diffInMonths);
  if (absMonths < 12) {
    return diffInMonths > 0 ? `in ${absMonths}mo` : `${absMonths}mo ago`;
  }

  const diffInYears = Math.round(diffInMonths / 12);
  const absYears = Math.abs(diffInYears);
  return diffInYears > 0 ? `in ${absYears}y` : `${absYears}y ago`;
}

/**
 * Generates URL-safe slugs from raw text strings.
 * Example: 'React Layouts & Tables! 101' -> 'react-layouts-tables-101'
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}
