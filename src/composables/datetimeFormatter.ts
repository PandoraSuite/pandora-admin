/**
 * Configured formatter for displaying dates in the user's locale
 * Uses 24-hour format with seconds, in the user's timezone
 */
export const datetimeFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  navigator.language,
  {
    day: '2-digit', // DD
    month: '2-digit', // MM
    year: 'numeric', // YYYY
    hour: '2-digit', // hh
    minute: '2-digit', // mm
    second: '2-digit', // ss
    hour12: false, // 24 hours instead of 12h (a.m./p.m.)
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
);

/**
 * Converts a local date string to UTC format
 * @param localDateStr - Date string in any format parseable by Date constructor
 * @returns UTC formatted date string (e.g., "Mon, 14 Oct 2025 12:30:45 GMT")
 * @throws {RangeError} If the date string is invalid
 */
export function formatLocalToUTC(localDateStr: string): string {
  const localDate: Date = new Date(localDateStr);

  // Check if date is valid
  if (isNaN(localDate.getTime())) {
    throw new RangeError(`Invalid date string: "${localDateStr}"`);
  }

  return localDate.toUTCString();
}
