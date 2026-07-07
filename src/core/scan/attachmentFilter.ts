// Pure attachment classification. No Obsidian API — runs in tests under Node.
//
// An "attachment" is any vault file that is NOT an editable Obsidian document
// (markdown / canvas / base). Those three are how you REFERENCE attachments, so
// they are scanned as sources, never treated as attachments themselves.

/** Extensions that are Obsidian documents, not attachments. */
export const NON_ATTACHMENT_EXTENSIONS = new Set(["md", "canvas", "base"]);

/** Lower-cased extension without the dot, or "" when there is none. */
export function extensionOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return ""; // no extension, or a dotfile like ".gitignore"
  return name.slice(dot + 1).toLowerCase();
}

/**
 * True when a path should be treated as an attachment: it has an extension and
 * that extension is not a document type. `extraExtensions` is currently only a
 * forward-compatibility hook (all non-document files are already included).
 */
export function isAttachment(path: string, extraExtensions: string[] = []): boolean {
  const ext = extensionOf(path);
  if (!ext) return false; // extension-less files aren't attachments we manage
  if (NON_ATTACHMENT_EXTENSIONS.has(ext)) {
    // Allow a user to opt a document type back in (rare), via extras.
    return extraExtensions.map((e) => e.toLowerCase().replace(/^\./, "")).includes(ext);
  }
  return true;
}
