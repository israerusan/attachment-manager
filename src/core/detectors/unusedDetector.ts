import type { AttachmentStat, DetectorHit } from "../../types";

/**
 * Flags an attachment nothing references. Two signals must agree, because the
 * fix is deletion and a false positive would trash a still-used file:
 *  1. zero resolved inbound links (embeds + links Obsidian could resolve), and
 *  2. `mentionedInContent !== true` — a raw-content safety scan (note bodies incl.
 *     frontmatter, canvas `file` values, text attachments) found no mention of the
 *     filename.
 * The boundary sets `mentionedInContent` only when this detector runs; an
 * undefined value is treated as "not mentioned" (still requires inbound == 0).
 */
export function unusedDetector(stat: AttachmentStat): DetectorHit | null {
  if (stat.inboundLinks <= 0 && stat.mentionedInContent !== true) {
    return { reason: "Not referenced by any note" };
  }
  return null;
}
