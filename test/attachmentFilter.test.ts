import assert from "node:assert";
import { isAttachment, extensionOf } from "../src/core/scan/attachmentFilter";

assert.strictEqual(extensionOf("assets/a.PNG"), "png");
assert.strictEqual(extensionOf("notes/readme.md"), "md");
assert.strictEqual(extensionOf("no-extension"), "");
assert.strictEqual(extensionOf(".gitignore"), "");

// Documents are not attachments.
assert.strictEqual(isAttachment("notes/a.md"), false);
assert.strictEqual(isAttachment("board.canvas"), false);
assert.strictEqual(isAttachment("data.base"), false);

// Everything else with an extension is an attachment.
assert.strictEqual(isAttachment("assets/a.png"), true);
assert.strictEqual(isAttachment("docs/report.pdf"), true);
assert.strictEqual(isAttachment("audio/clip.mp3"), true);

// Extension-less files are not managed.
assert.strictEqual(isAttachment("LICENSE"), false);

// A document type can be opted back in via extras.
assert.strictEqual(isAttachment("board.canvas", ["canvas"]), true);

console.log("attachmentFilter tests passed");
