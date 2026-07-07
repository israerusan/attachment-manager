# Attachment Manager

**The attachment cleaner for Obsidian you can trust with bulk delete.** It cross-checks canvas, frontmatter, and HTML before flagging anything "unused," so it won't remove a file that's still in use — then clears unused files, duplicates, oversized images, and junk-named pastes, and shows the space you'll get back. Free to scan and reclaim one file at a time; Pro adds one-click bulk cleanup.

[**➜ Unlock Pro — $9 one-time**](https://buymeacoffee.com/attachmentmanager) · no subscription · no account · works offline

> **Safe by design:** nothing is hard-deleted (files go to trash, fully recoverable), and every move/rename updates your links automatically. [How safety works ↓](#is-it-safe-yes--heres-how)

<!-- TODO: screenshot — dashboard with the reclaimable-space hero -->

Your vault is quietly hoarding megabytes of attachments no note uses anymore — duplicates, oversized images, and junk-named pastes. Attachment Manager finds them, shows you exactly how much space you'll get back, and cleans them up **safely** — every action is **recoverable** and **link-safe**.

## What it finds

- **Unused** — attachments no note references. A deliberately conservative two-signal check (resolved links **and** a raw-content scan of note bodies, frontmatter, and canvas) catches references that link-only tools miss — a file embedded only in a canvas or a raw `<img>` tag is never mistaken for junk.
- **Duplicates** — byte-identical copies (SHA-256, size-bucketed so large unique files are never read).
- **Large files** — anything over your size threshold, so you can spot the megabytes.
- **Poorly named** — auto-generated names like `Pasted image 20260101…`, `Screenshot …`, `IMG_1234`, `Untitled`.
- **Misplaced** — attachments living outside your configured attachment folder.

The dashboard shows a running **reclaimable-space** total, per-category tiles, and a one-at-a-time review queue.

<!-- TODO: screenshot — per-category tiles + one-at-a-time review queue -->

## How this is different from the free attachment plugins

The Obsidian ecosystem has free tools that rename pasted images, and one or two that list "orphaned" attachments. If those cover you, use them. Attachment Manager exists for the moment you want to actually **delete in bulk without gambling** — and for having every job in one tool instead of three.

- **It won't false-delete a file that's still in use.** Most free orphan-finders flag a file "unused" from resolved Markdown links alone — so they miss attachments referenced only in **canvas files, YAML frontmatter, or raw `<img src>` HTML**, and cheerfully offer to delete them. Attachment Manager requires **two independent signals** to agree (resolved links **and** a raw-content scan of note bodies, frontmatter, and canvas) before anything is ever flagged. It is biased toward *not* flagging.
- **Nothing is hard-deleted.** Files go to your Obsidian trash (system trash or `.trash/`) and are fully recoverable. Free "delete" scripts often unlink permanently.
- **Moves and renames keep your links intact**, using Obsidian's link-updating rename.
- **It shows the payoff before you touch anything** — a live reclaimable-space total.
- **One tool, five detectors** — unused, duplicate (SHA-256), large, junk-named, and misplaced — instead of stitching together a renamer plus an orphan-lister plus a manual dedupe.

## Free vs Pro

The free tier finds everything and lets you clean up file-by-file. Pro is about doing it in bulk.

| | Free | Pro — **$9 one-time** |
|---|:---:|:---:|
| All five detectors (unused, duplicate, large, poorly-named, misplaced) | ✓ | ✓ |
| Dashboard with reclaimable-space total + per-type breakdown | ✓ | ✓ |
| Reclaim one file at a time (trash / move from its row) | ✓ | ✓ |
| Open, reveal, rename (link-safe), ignore, exclude, mark reviewed | ✓ | ✓ |
| Per-detector thresholds, folders, junk-name patterns, exclusions | ✓ | ✓ |
| **Bulk cleanup** — trash unused, dedupe, and move across many files at once | | ✓ |
| Saved scan profiles | | ✓ |
| Custom rules (extension, size, folder, name, age) | | ✓ |
| Severity tuning | | ✓ |
| Markdown report export | | ✓ |

No subscription, no account. [Unlock Pro →](https://buymeacoffee.com/attachmentmanager)

<!-- TODO: screenshot — bulk actions + the trash confirm dialog -->

## Is it safe? (Yes — here's how)

Attachment Manager touches your files, so it's built to never lose data:

- **Nothing is hard-deleted.** Trash respects your Obsidian "Deleted files" setting (system trash or `.trash/`), so anything is recoverable — and the confirm dialog tells you exactly where files will go.
- **"Unused" requires two independent signals** to agree before a file can be flagged — the check is biased toward *not* flagging.
- **Duplicate cleanup only trashes unused copies** and always keeps at least one copy; a referenced copy is never touched.
- **Moves and renames use Obsidian's link-updating rename**, so Markdown links, wikilinks, embeds, and canvas references are kept intact. (Raw HTML `<img src>` and frontmatter plain-string paths are not rewritten by Obsidian — a documented limitation.)
- Every destructive action re-validates the file immediately before acting and asks for confirmation.

## "A free plugin already finds orphans — why $9?"

Because "finds orphans" and "safe to bulk-delete hundreds of files" are very different things. Free orphan-finders check resolved links only, so they miss canvas / frontmatter / HTML references and can flag a file that's still in use. Attachment Manager's two-signal check is built to never do that — and it puts unused detection, duplicates, oversized files, junk-name cleanup, recoverable trashing, and link-safe moves in one place. The free tier is genuinely useful on its own; $9 (one-time, no subscription, no account) unlocks doing it all in bulk with a single click.

- **One-time payment**, not a subscription
- **Offline license** — buy once, no account, works forever
- **Runs 100% locally** — your files never leave your machine

## Getting started

1. Open the ribbon **paperclip** icon (or run **Attachment Manager: Run attachment scan**).
2. Optionally set an **attachment folder** in settings to enable the "misplaced" check and one-click moves.
3. Run a scan, review the results, and reclaim your space.

## License key

Pro is unlocked with an offline license key (Ed25519-signed, verified locally — no server, no login). After purchase, paste the key into **Settings → Community plugins → Attachment Manager → Pro license → License key** and click Validate.

## Privacy

Everything runs locally in your vault. No network calls, no telemetry, no account.

## Ready to reclaim space in bulk?

[**Unlock Attachment Manager Pro — $9 one-time →**](https://buymeacoffee.com/attachmentmanager)

One payment, yours forever. Offline license, no account.
