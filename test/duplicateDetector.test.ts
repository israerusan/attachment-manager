import assert from "node:assert";
import { duplicateDetector } from "../src/core/detectors/duplicateDetector";
import { makeStat } from "./_helpers";

const hashMap = new Map<string, string[]>([
  ["h1", ["a.png", "b.png", "c.png"]],
  ["h2", ["solo.png"]],
]);

// A file in a 3-member cluster is flagged, naming the other two.
const hit = duplicateDetector(makeStat({ path: "a.png", hash: "h1" }), hashMap);
assert.notStrictEqual(hit, null);
assert.strictEqual(hit?.reason, "Identical to 2 other files");
assert.ok(hit?.details?.includes("b.png"));
assert.ok(hit?.details?.includes("c.png"));

// Singular wording for exactly one twin.
const two = new Map<string, string[]>([["h", ["x.png", "y.png"]]]);
assert.strictEqual(duplicateDetector(makeStat({ path: "x.png", hash: "h" }), two)?.reason, "Identical to 1 other file");

// No hash -> never a duplicate (was not a size-collision candidate).
assert.strictEqual(duplicateDetector(makeStat({ path: "a.png" }), hashMap), null);

// Hash present but only itself in the cluster -> not a duplicate.
assert.strictEqual(duplicateDetector(makeStat({ path: "solo.png", hash: "h2" }), hashMap), null);

// Hash present but not in the map -> not a duplicate.
assert.strictEqual(duplicateDetector(makeStat({ path: "z.png", hash: "nope" }), hashMap), null);

console.log("duplicateDetector tests passed");
