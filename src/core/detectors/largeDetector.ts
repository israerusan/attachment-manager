import type { AttachmentStat, DetectorHit } from "../../types";
import { formatBytes } from "../utils/sizes";

/**
 * Flags an attachment larger than `thresholdBytes` — an optimization candidate.
 * A threshold of 0 (or negative) disables the check. Uses a strict `>` so a file
 * exactly at the threshold is not flagged.
 */
export function largeDetector(stat: AttachmentStat, thresholdBytes: number): DetectorHit | null {
  if (thresholdBytes <= 0) return null;
  if (stat.size > thresholdBytes) {
    return { reason: `${formatBytes(stat.size)} (over ${formatBytes(thresholdBytes)})` };
  }
  return null;
}
