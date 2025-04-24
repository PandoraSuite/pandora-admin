export const datetimeFormatter = new Intl.DateTimeFormat(navigator.language, {
  day: '2-digit', // DD
  month: '2-digit', // MM
  year: 'numeric', // YYYY
  hour: '2-digit', // hh
  minute: '2-digit', // mm
  second: '2-digit', // ss
  hour12: false, // 24 hours instead of 12h (a.m./p.m.)
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

export function formatLocalToUTC(localDateStr: string): string {
  const localDate = new Date(localDateStr);
  // Returns date in standardized UTC (ISO 8601)
  return localDate.toUTCString();
}
