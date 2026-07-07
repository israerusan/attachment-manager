import type { AttachmentStat, AttachmentIssue, IssueType } from "../src/types";

/** Build an AttachmentStat with sensible defaults for detector tests. */
export function makeStat(over: Partial<AttachmentStat> = {}): AttachmentStat {
  return {
    path: over.path ?? "assets/example.png",
    name: over.name ?? "example.png",
    basename: over.basename ?? "example",
    extension: over.extension ?? "png",
    size: over.size ?? 1000,
    mtime: over.mtime ?? Date.parse("2026-01-01T00:00:00Z"),
    inboundLinks: over.inboundLinks ?? 0,
    hash: over.hash,
    mentionedInContent: over.mentionedInContent,
  };
}

/** Build an AttachmentIssue with sensible defaults for aggregation tests. */
export function makeIssue(over: Partial<AttachmentIssue> = {}): AttachmentIssue {
  const issueType: IssueType = over.issueType ?? "unused";
  return {
    id: over.id ?? `${over.attachmentPath ?? "assets/example.png"}\n${issueType}`,
    attachmentPath: over.attachmentPath ?? "assets/example.png",
    attachmentName: over.attachmentName ?? "example.png",
    issueType,
    severity: over.severity ?? 3,
    reason: over.reason ?? "reason",
    details: over.details,
    sizeBytes: over.sizeBytes ?? 1000,
    clusterId: over.clusterId,
    sourceRuleId: over.sourceRuleId,
  };
}
