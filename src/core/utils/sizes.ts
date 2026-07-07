// Pure byte-size helpers. No Obsidian API — these run in tests under Node.

const UNITS = ["B", "KB", "MB", "GB", "TB"];

/**
 * Human-readable size, e.g. 0 → "0 B", 1536 → "1.5 KB", 5_242_880 → "5 MB".
 * Bytes are shown whole; larger units keep one decimal. Negative/NaN → "0 B".
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const rounded = unit === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${UNITS[unit]}`;
}

/** KB → bytes (floored, never negative). */
export function kbToBytes(kb: number): number {
  if (!Number.isFinite(kb) || kb <= 0) return 0;
  return Math.floor(kb * 1024);
}
