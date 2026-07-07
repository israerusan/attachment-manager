import assert from "node:assert";
import { buildAttachmentStat } from "../src/core/scan/attachmentStats";

const stat = buildAttachmentStat({
  path: "assets/a.png",
  name: "a.png",
  basename: "a",
  extension: "png",
  size: 2048,
  mtime: 123,
  inboundLinks: 2,
  hash: "abc",
  mentionedInContent: true,
});

assert.strictEqual(stat.path, "assets/a.png");
assert.strictEqual(stat.size, 2048);
assert.strictEqual(stat.inboundLinks, 2);
assert.strictEqual(stat.hash, "abc");
assert.strictEqual(stat.mentionedInContent, true);

console.log("attachmentStats tests passed");
