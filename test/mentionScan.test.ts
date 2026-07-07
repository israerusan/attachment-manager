import assert from "node:assert";
import { buildMentionCorpus, isMentioned, extractCanvasFilePaths } from "../src/core/safety/mentionScan";

const corpus = buildMentionCorpus([
  "See ![[assets/Logo.png]] and a banner: cover.JPG",
  '<img src="assets/my%20photo.png">',
]);

// Full filename matches, case-insensitively, path-embedded.
assert.strictEqual(isMentioned("Logo.png", corpus), true);
assert.strictEqual(isMentioned("logo.png", corpus), true);
assert.strictEqual(isMentioned("cover.jpg", corpus), true);

// Percent-encoded spaces match a filename that contains a space.
assert.strictEqual(isMentioned("my photo.png", corpus), true);

// An unrelated file is not mentioned.
assert.strictEqual(isMentioned("unused.png", corpus), false);

// A bare stem without extension does NOT clear a flag (too broad).
assert.strictEqual(isMentioned("", corpus), false);

// Canvas file extraction pulls out embedded file paths; malformed JSON is safe.
const canvas = JSON.stringify({
  nodes: [
    { type: "file", file: "assets/diagram.png" },
    { type: "text", text: "hello" },
    { type: "file", file: "assets/photo.jpg" },
  ],
});
assert.deepStrictEqual(extractCanvasFilePaths(canvas), ["assets/diagram.png", "assets/photo.jpg"]);
assert.deepStrictEqual(extractCanvasFilePaths("{ not json"), []);
assert.deepStrictEqual(extractCanvasFilePaths("{}"), []);

console.log("mentionScan tests passed");
