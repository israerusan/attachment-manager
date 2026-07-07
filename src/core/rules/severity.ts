// Pure severity ordering and aggregation over detected issues. No Obsidian API —
// these run in tests under Node.

import type { IssueType, AttachmentIssue, SortMode } from "../../types";
import { ISSUE_TYPES } from "../../types";

// One reused collator — meaningfully faster than String.localeCompare across
// thousands of comparisons, and numeric-aware so "image2" sorts before "image10".
const COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

/**
 * Return a new array of issues ordered per `mode` (input is never mutated):
 * - "severity": severity desc, then size desc, then name asc, then path asc.
 * - "size": size desc, then name asc, then path asc.
 * - "name": name asc, then path asc.
 * - "path": path asc.
 */
export function sortIssues(issues: AttachmentIssue[], mode: SortMode): AttachmentIssue[] {
  const sorted = issues.slice();
  sorted.sort((a, b) => {
    if (mode === "severity") {
      if (b.severity !== a.severity) return b.severity - a.severity;
      if (b.sizeBytes !== a.sizeBytes) return b.sizeBytes - a.sizeBytes;
      const byName = COLLATOR.compare(a.attachmentName, b.attachmentName);
      if (byName !== 0) return byName;
      return COLLATOR.compare(a.attachmentPath, b.attachmentPath);
    }
    if (mode === "size") {
      if (b.sizeBytes !== a.sizeBytes) return b.sizeBytes - a.sizeBytes;
      const byName = COLLATOR.compare(a.attachmentName, b.attachmentName);
      if (byName !== 0) return byName;
      return COLLATOR.compare(a.attachmentPath, b.attachmentPath);
    }
    if (mode === "name") {
      const byName = COLLATOR.compare(a.attachmentName, b.attachmentName);
      if (byName !== 0) return byName;
      return COLLATOR.compare(a.attachmentPath, b.attachmentPath);
    }
    return COLLATOR.compare(a.attachmentPath, b.attachmentPath);
  });
  return sorted;
}

/**
 * Group issues by their type, preserving input order within each group. Every
 * {@link IssueType} key is present, mapped to an empty array when it has none.
 */
export function groupByType(issues: AttachmentIssue[]): Record<IssueType, AttachmentIssue[]> {
  const grouped = {} as Record<IssueType, AttachmentIssue[]>;
  for (const type of ISSUE_TYPES) grouped[type] = [];
  for (const issue of issues) grouped[issue.issueType].push(issue);
  return grouped;
}

/** Count issues by type. Every {@link IssueType} key is present, defaulting to 0. */
export function countByType(issues: AttachmentIssue[]): Record<IssueType, number> {
  const counts = {} as Record<IssueType, number>;
  for (const type of ISSUE_TYPES) counts[type] = 0;
  for (const issue of issues) counts[issue.issueType] += 1;
  return counts;
}

/** Sum of the severities across all issues. */
export function totalSeverity(issues: AttachmentIssue[]): number {
  return issues.reduce((sum, issue) => sum + issue.severity, 0);
}
