import assert from "node:assert";
import { unusedDetector } from "../src/core/detectors/unusedDetector";
import { makeStat } from "./_helpers";

// Zero inbound and not mentioned -> flagged.
const hit = unusedDetector(makeStat({ inboundLinks: 0, mentionedInContent: false }));
assert.notStrictEqual(hit, null);
assert.strictEqual(hit?.reason, "Not referenced by any note");

// Undefined mentioned (safety scan skipped) still flags when inbound is 0.
assert.notStrictEqual(unusedDetector(makeStat({ inboundLinks: 0 })), null);

// The critical safety case: inbound 0 but mentioned in content -> NOT flagged.
assert.strictEqual(unusedDetector(makeStat({ inboundLinks: 0, mentionedInContent: true })), null);

// Any inbound link -> not flagged.
assert.strictEqual(unusedDetector(makeStat({ inboundLinks: 1 })), null);
assert.strictEqual(unusedDetector(makeStat({ inboundLinks: 5, mentionedInContent: false })), null);

// Negative inbound is treated as zero.
assert.notStrictEqual(unusedDetector(makeStat({ inboundLinks: -2, mentionedInContent: false })), null);

console.log("unusedDetector tests passed");
