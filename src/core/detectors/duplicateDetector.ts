import type { AttachmentStat, DetectorHit } from "../../types";

/**
 * Flags an attachment that is byte-identical to at least one other. `hashToPaths`
 * maps a content hash to every path sharing it (built by the boundary from
 * size-bucketed SHA-256 hashing). A stat with no `hash` was never a size-collision
 * candidate, so it cannot be a duplicate. The reason names how many twins exist;
 * `details` lists a few of them.
 */
export function duplicateDetector(
  stat: AttachmentStat,
  hashToPaths: Map<string, string[]>
): DetectorHit | null {
  if (!stat.hash) return null;
  const paths = hashToPaths.get(stat.hash);
  if (!paths || paths.length < 2) return null;

  const others = paths.filter((p) => p !== stat.path);
  if (others.length === 0) return null;

  const shown = others.slice(0, 5).join(", ");
  const more = others.length > 5 ? `, +${others.length - 5} more` : "";
  return {
    reason: `Identical to ${others.length} other file${others.length === 1 ? "" : "s"}`,
    details: `Same content as: ${shown}${more}`,
  };
}
