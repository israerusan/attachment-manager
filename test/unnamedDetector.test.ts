import assert from "node:assert";
import { unnamedDetector } from "../src/core/detectors/unnamedDetector";
import { DEFAULT_JUNK_NAME_PATTERNS } from "../src/core/naming/namePatterns";
import { makeStat } from "./_helpers";

const P = DEFAULT_JUNK_NAME_PATTERNS;

// Auto-generated names are flagged.
assert.notStrictEqual(unnamedDetector(makeStat({ basename: "Pasted image 20260101120000" }), P), null);
assert.notStrictEqual(unnamedDetector(makeStat({ basename: "Screenshot 2026-01-01 at 10.00" }), P), null);
assert.notStrictEqual(unnamedDetector(makeStat({ basename: "image" }), P), null);
assert.notStrictEqual(unnamedDetector(makeStat({ basename: "image (3)" }), P), null);
assert.notStrictEqual(unnamedDetector(makeStat({ basename: "Untitled" }), P), null);
assert.notStrictEqual(unnamedDetector(makeStat({ basename: "IMG_1234" }), P), null);

// Real names are not flagged.
assert.strictEqual(unnamedDetector(makeStat({ basename: "architecture-diagram" }), P), null);
assert.strictEqual(unnamedDetector(makeStat({ basename: "my vacation photo" }), P), null);

// Empty pattern list disables the detector.
assert.strictEqual(unnamedDetector(makeStat({ basename: "Untitled" }), []), null);

console.log("unnamedDetector tests passed");
