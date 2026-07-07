// Pure grouping helpers for duplicate detection. No Obsidian API — runs in tests.
//
// Byte-identical files must have identical size, so we only ever hash files that
// share a size with another file. That size-bucketing (done here) is what keeps
// duplicate detection affordable on large vaults: unique-size files are never read.

/** Minimal shape the grouping needs from a scanned file. */
export interface SizedFile {
  path: string;
  size: number;
}

/**
 * Return only the files whose size is shared by at least one other file — the
 * sole candidates for being byte-identical. Order is preserved.
 */
export function sizeCollisionCandidates<T extends SizedFile>(files: T[]): T[] {
  const counts = new Map<number, number>();
  for (const f of files) counts.set(f.size, (counts.get(f.size) ?? 0) + 1);
  return files.filter((f) => (counts.get(f.size) ?? 0) >= 2);
}

/**
 * Group hashed files by content hash, returning only clusters of 2+ (the actual
 * duplicates). Keys are hashes; values are the paths sharing that hash, in input
 * order. Files without a hash are ignored.
 */
export function groupByHash(hashed: { path: string; hash?: string }[]): Map<string, string[]> {
  const byHash = new Map<string, string[]>();
  for (const f of hashed) {
    if (!f.hash) continue;
    const bucket = byHash.get(f.hash);
    if (bucket) bucket.push(f.path);
    else byHash.set(f.hash, [f.path]);
  }
  // Drop singletons so the map only ever describes real duplicate clusters.
  for (const [hash, paths] of byHash) {
    if (paths.length < 2) byHash.delete(hash);
  }
  return byHash;
}
