import assert from "node:assert";
import {
  dirName,
  baseName,
  splitExtension,
  joinPath,
  moveTargetPath,
  dedupePath,
  uniquePath,
} from "../src/core/paths/pathRewrite";

assert.strictEqual(dirName("a/b/c.png"), "a/b");
assert.strictEqual(dirName("c.png"), "");
assert.strictEqual(baseName("a/b/c.png"), "c.png");

assert.deepStrictEqual(splitExtension("photo.png"), { stem: "photo", ext: "png" });
assert.deepStrictEqual(splitExtension("noext"), { stem: "noext", ext: "" });
assert.deepStrictEqual(splitExtension(".hidden"), { stem: ".hidden", ext: "" });

assert.strictEqual(joinPath("assets", "a.png"), "assets/a.png");
assert.strictEqual(joinPath("", "a.png"), "a.png");
assert.strictEqual(joinPath("/assets/", "a.png"), "assets/a.png");

// Move into folder keeps the filename; a file already there stays put.
assert.strictEqual(moveTargetPath("notes/a.png", "assets"), "assets/a.png");
assert.strictEqual(moveTargetPath("assets/a.png", "assets"), "assets/a.png");
assert.strictEqual(moveTargetPath("notes/a.png", ""), "notes/a.png");

// Dedupe inserts " (n)" before the extension.
assert.strictEqual(dedupePath("assets/logo.png", 2), "assets/logo (2).png");
assert.strictEqual(dedupePath("logo.png", 3), "logo (3).png");

// uniquePath returns the desired path when free, else the next free suffix.
assert.strictEqual(uniquePath("assets/a.png", () => false), "assets/a.png");
const taken = new Set(["assets/a.png", "assets/a (2).png"]);
assert.strictEqual(uniquePath("assets/a.png", (p) => taken.has(p)), "assets/a (3).png");

console.log("pathRewrite tests passed");
