// Pure junk-name matching. No Obsidian API — runs in tests under Node.
//
// A "junk" name is an auto-generated or placeholder attachment name that carries
// no meaning — the kind that accumulates by the thousands (pasted images,
// screenshots, camera exports). Patterns are matched against the basename
// (extension stripped), case-insensitively.

/** Default patterns (regex source strings) for auto-generated attachment names. */
export const DEFAULT_JUNK_NAME_PATTERNS: string[] = [
  "^Pasted image \\d+",
  "^Screenshot[ _]",
  "^Screen Shot ",
  "^image( \\(\\d+\\))?$",
  "^Untitled",
  "^IMG[-_ ]?\\d+$",
  "^DSC[-_ ]?\\d+$",
  "^photo[-_ ]?\\d+$",
  "^download( \\(\\d+\\))?$",
  "^unknown( \\(\\d+\\))?$",
];

// Compile each pattern once and reuse across every attachment in a scan. An
// invalid pattern is cached as `null` so it is skipped without recompiling.
const cache = new Map<string, RegExp | null>();

function compile(pattern: string): RegExp | null {
  if (cache.has(pattern)) return cache.get(pattern) ?? null;
  let re: RegExp | null = null;
  try {
    re = new RegExp(pattern, "i");
  } catch {
    re = null; // a malformed user pattern must never throw mid-scan
  }
  cache.set(pattern, re);
  return re;
}

/**
 * True when `basename` matches any junk pattern. Empty/whitespace patterns and
 * malformed regexes are ignored. Matching is case-insensitive.
 */
export function matchesJunkName(basename: string, patterns: string[]): boolean {
  // Cap length so a catastrophic-backtracking user pattern can't hang the scan.
  const name = basename.trim().slice(0, 256);
  if (!name) return false;
  for (const pattern of patterns) {
    if (!pattern.trim()) continue;
    const re = compile(pattern);
    if (re && re.test(name)) return true;
  }
  return false;
}
