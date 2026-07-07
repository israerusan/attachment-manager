import assert from "node:assert";
import { largeDetector } from "../src/core/detectors/largeDetector";
import { makeStat } from "./_helpers";

const MB = 1024 * 1024;

// Over the threshold -> flagged with formatted sizes.
const hit = largeDetector(makeStat({ size: 5 * MB }), 1 * MB);
assert.notStrictEqual(hit, null);
assert.ok(hit?.reason.includes("5 MB"));
assert.ok(hit?.reason.includes("1 MB"));

// Exactly at the threshold -> not flagged (strict >).
assert.strictEqual(largeDetector(makeStat({ size: MB }), MB), null);

// One byte over -> flagged.
assert.notStrictEqual(largeDetector(makeStat({ size: MB + 1 }), MB), null);

// Threshold 0 or negative disables the detector.
assert.strictEqual(largeDetector(makeStat({ size: 999 * MB }), 0), null);
assert.strictEqual(largeDetector(makeStat({ size: 999 * MB }), -5), null);

console.log("largeDetector tests passed");
