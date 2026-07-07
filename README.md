# Attachment Manager

Find the attachments quietly bloating your vault — unused files, duplicates, oversized images, junk-named pastes, and files scattered outside your attachment folder — then clean them up **safely** and reclaim space.

Most attachment tools either just rename pastes or need you to trust a black box near your files. Attachment Manager shows you exactly what it found, tells you how much space you can reclaim, and every destructive action is **recoverable** (files go to your system/`.trash`) and **link-safe** (moves and renames update every reference automatically).

<!-- TODO: screenshot — dashboard with reclaimable-space hero -->

## What it finds

- **Unused** — attachments no note references. This uses a deliberately conservative two-signal check (resolved links **and** a raw-content scan of note bodies, frontmatter, and canvas files) so a file that's still in use is never flagged.
- **Duplicates** — byte-identical copies (SHA-256, size-bucketed so large unique files are never read).
- **Large files** — anything over your size threshold, so you can spot the megabytes.
- **Poorly named** — auto-generated names like `Pasted image 20260101…`, `Screenshot …`, `IMG_1234`, `Untitled`.
- **Misplaced** — attachments living outside your configured attachment folder.

The dashboard shows a running **reclaimable-space** total, per-category tiles, and a one-at-a-time review queue.

## Free vs Pro

**Free**
- All five detectors, each toggleable
- Dashboard with reclaimable-space total and per-type breakdown
- **Reclaim space one file at a time**: trash an unused file or move any file to your attachment folder, right from its row
- Open / reveal / rename (link-safe) attachments, ignore, exclude, mark reviewed
- Per-detector thresholds, attachment folder, junk-name patterns, exclusions

**Pro — $9 one-time** (no subscription, no account)
- **Bulk cleanup**: trash unused, trash duplicate copies (keeps one, never touches referenced copies), and move to attachment folder — across many files at once
- Saved scan profiles
- Custom rules (by extension, size, folder, name pattern, or age)
- Severity tuning
- Markdown report export

<!-- TODO: screenshot — bulk actions + confirm dialog -->

## Safety

Attachment Manager touches your files, so it's built to never lose data:

- **Nothing is hard-deleted.** Trash respects your Obsidian "Deleted files" setting (system trash or `.trash/`), so anything is recoverable.
- **"Unused" requires two independent signals** to agree before a file can be flagged — the check is biased toward *not* flagging.
- **Duplicate cleanup only trashes unused copies** and always keeps at least one copy; referenced copies are never touched.
- **Moves and renames use Obsidian's link-updating rename**, so Markdown links, wikilinks, embeds, and canvas references are kept intact. (Raw HTML `<img src>` and frontmatter plain-string paths are not rewritten by Obsidian — a documented limitation.)
- Every destructive action re-validates the file immediately before acting and asks for confirmation.

## Getting started

1. Open the ribbon **paperclip** icon (or run **Attachment Manager: Run attachment scan**).
2. Optionally set an **attachment folder** in settings to enable the "misplaced" check and one-click moves.
3. Run a scan, review the results, and reclaim your space.

## License key

Pro is unlocked with an offline license key (Ed25519-signed, verified locally — no server, no login). After purchase, paste the key into **Settings → Community plugins → Attachment Manager → Pro license → License key** and click Validate.

## Privacy

Everything runs locally in your vault. No network calls, no telemetry, no account.
