import type { AttachmentStat, DetectorHit } from "../../types";

/** True when `path` is the folder itself or lives anywhere beneath it. */
function isInsideFolder(path: string, folder: string): boolean {
  return path === folder || path.startsWith(`${folder}/`);
}

/**
 * Flags an attachment that lives outside the configured attachment folder — a
 * candidate to move so attachments stay organized in one place. A blank folder
 * disables the check (the user hasn't declared where attachments should live).
 * The folder is trimmed and its trailing slash removed for prefix matching.
 */
export function misplacedDetector(stat: AttachmentStat, attachmentFolder: string): DetectorHit | null {
  const folder = attachmentFolder.trim().replace(/^\/+|\/+$/g, "");
  if (!folder) return null;
  if (isInsideFolder(stat.path, folder)) return null;
  return { reason: `Outside "${folder}"` };
}
