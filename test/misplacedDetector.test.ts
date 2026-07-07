import assert from "node:assert";
import { misplacedDetector } from "../src/core/detectors/misplacedDetector";
import { makeStat } from "./_helpers";

// Inside the attachment folder -> not flagged.
assert.strictEqual(misplacedDetector(makeStat({ path: "assets/a.png" }), "assets"), null);
assert.strictEqual(misplacedDetector(makeStat({ path: "assets/sub/a.png" }), "assets"), null);

// Outside the folder -> flagged.
assert.notStrictEqual(misplacedDetector(makeStat({ path: "notes/a.png" }), "assets"), null);
assert.notStrictEqual(misplacedDetector(makeStat({ path: "a.png" }), "assets"), null);

// A folder whose name is a prefix of another must not match by string prefix alone.
assert.notStrictEqual(misplacedDetector(makeStat({ path: "assets2/a.png" }), "assets"), null);

// Trailing and leading slashes on the configured folder are tolerated.
assert.strictEqual(misplacedDetector(makeStat({ path: "assets/a.png" }), "assets/"), null);
assert.strictEqual(misplacedDetector(makeStat({ path: "assets/a.png" }), "/assets"), null);
assert.strictEqual(misplacedDetector(makeStat({ path: "assets/a.png" }), "/assets/"), null);

// Blank folder disables the detector.
assert.strictEqual(misplacedDetector(makeStat({ path: "anywhere/a.png" }), ""), null);
assert.strictEqual(misplacedDetector(makeStat({ path: "anywhere/a.png" }), "   "), null);

console.log("misplacedDetector tests passed");
