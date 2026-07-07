// Scan boundary helper: turn raw per-attachment data into the normalized snapshot
// the pure detectors and rule engine read. No Obsidian API — this runs in tests.

import type { RawAttachmentInput, AttachmentStat } from "../../types";

/**
 * Normalize a {@link RawAttachmentInput} into an {@link AttachmentStat}. Fields
 * pass through unchanged; the type alias exists so detectors depend on the
 * normalized shape rather than the raw gather shape. The input is not mutated.
 */
export function buildAttachmentStat(input: RawAttachmentInput): AttachmentStat {
  return {
    path: input.path,
    name: input.name,
    basename: input.basename,
    extension: input.extension,
    size: input.size,
    mtime: input.mtime,
    inboundLinks: input.inboundLinks,
    hash: input.hash,
    mentionedInContent: input.mentionedInContent,
  };
}
