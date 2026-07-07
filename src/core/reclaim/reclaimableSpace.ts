// Pure reclaimable-space computation. No Obsidian API — runs in tests under Node.

import type { AttachmentIssue } from "../../types";

export interface ReclaimBreakdown {
  /** Bytes safely reclaimable now by trashing unused files (the headline number). */
  unusedBytes: number;
  /** Bytes wasted in redundant duplicate copies (informational; keep one per cluster). */
  duplicateExtraBytes: number;
}

/**
 * Compute reclaimable space from a scan's issues. Two independent figures:
 *
 * - `unusedBytes`: the sum of sizes of distinct unused attachments. These are
 *   safely trashable (nothing references them), so this is the honest headline.
 *
 * - `duplicateExtraBytes`: for each duplicate cluster, `(copies − 1) × size` —
 *   the space you'd save keeping one copy. This is informational: v1's safe
 *   dedupe only trashes UNUSED copies (referenced duplicates would need link
 *   repointing), so this figure is NOT added to the headline and may overlap
 *   with `unusedBytes` when duplicate copies are themselves unused.
 *
 * Counting `unusedBytes` per distinct path means a file flagged both `unused`
 * and `large` is never double-counted.
 */
export function computeReclaim(issues: AttachmentIssue[]): ReclaimBreakdown {
  const unusedPaths = new Set<string>();
  let unusedBytes = 0;
  for (const issue of issues) {
    if (issue.issueType === "unused" && !unusedPaths.has(issue.attachmentPath)) {
      unusedPaths.add(issue.attachmentPath);
      unusedBytes += Math.max(0, issue.sizeBytes);
    }
  }

  const clusters = new Map<string, AttachmentIssue[]>();
  for (const issue of issues) {
    if (issue.issueType !== "duplicate" || !issue.clusterId) continue;
    const bucket = clusters.get(issue.clusterId);
    if (bucket) bucket.push(issue);
    else clusters.set(issue.clusterId, [issue]);
  }
  let duplicateExtraBytes = 0;
  for (const [, arr] of clusters) {
    if (arr.length >= 2) duplicateExtraBytes += (arr.length - 1) * Math.max(0, arr[0].sizeBytes);
  }

  return { unusedBytes, duplicateExtraBytes };
}
