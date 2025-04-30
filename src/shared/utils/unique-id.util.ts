const Hashids = require('hashids');

// Initialize Hashids with your salt and alphabet
const hashids = new Hashids('nanobox', 0, '0123456789abcdef');

// Track sequence and day state
let sequence = 1;
let yesterDay = '';

/**
 * Generates a unique ID combining host and a time-based hash
 * @param host The host identifier to include in the ID
 * @returns A unique string in format "host-hash"
 */
export function getUniqueId(host: string): string {
  // Format current date as yyMMddHHmmSSSS
  const now = new Date();
  const todayStr = formatDate(now);

  // Reset sequence if day has changed
  const dayPart = todayStr.substring(0, 6); // yyMMdd
  if (dayPart !== yesterDay) {
    sequence = 1;
    yesterDay = dayPart;
  }

  // Calculate next seed value and increment sequence
  const todayNumber = parseInt(todayStr, 10);
  const nextSeed = todayNumber + sequence++;

  // Encode the seed using hashids
  const hash = hashids.encode(nextSeed);

  return `${host}-${hash}`;
}

/**
 * Formats a Date object as yyMMddHHmmSSSS string
 * @param date The date to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  const pad = (num: number, length = 2) => num.toString().padStart(length, '0');

  return [
    date.getFullYear().toString().substring(2), // yy
    pad(date.getMonth() + 1), // MM
    pad(date.getDate()), // dd
    pad(date.getHours()), // HH
    pad(date.getMinutes()), // mm
    pad(date.getMilliseconds(), 4), // SSSS (4-digit milliseconds)
  ].join('');
}
