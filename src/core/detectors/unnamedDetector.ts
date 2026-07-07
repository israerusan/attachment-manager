import type { AttachmentStat, DetectorHit } from "../../types";
import { matchesJunkName } from "../naming/namePatterns";

/**
 * Flags an attachment whose basename looks auto-generated or placeholder
 * ("Pasted image 20260101", "Screenshot …", "image", "Untitled", "IMG_1234").
 * Matching is done on the basename (extension stripped) against the configured
 * patterns. An empty pattern list disables the check.
 */
export function unnamedDetector(stat: AttachmentStat, patterns: string[]): DetectorHit | null {
  if (patterns.length === 0) return null;
  if (matchesJunkName(stat.basename, patterns)) {
    return { reason: "Auto-generated or placeholder name" };
  }
  return null;
}
