import assert from "node:assert";
import { matchesJunkName, DEFAULT_JUNK_NAME_PATTERNS } from "../src/core/naming/namePatterns";

const P = DEFAULT_JUNK_NAME_PATTERNS;

// Case-insensitive matching.
assert.strictEqual(matchesJunkName("pasted image 20260101", P), true);
assert.strictEqual(matchesJunkName("PASTED IMAGE 20260101", P), true);

// Non-junk names are not matched.
assert.strictEqual(matchesJunkName("budget-2026", P), false);

// A malformed user pattern is skipped, not thrown.
assert.doesNotThrow(() => matchesJunkName("anything", ["("]));
assert.strictEqual(matchesJunkName("anything", ["("]), false);

// Empty/whitespace patterns are ignored.
assert.strictEqual(matchesJunkName("Untitled", ["", "   "]), false);

// A custom pattern works.
assert.strictEqual(matchesJunkName("scan001", ["^scan\\d+$"]), true);

console.log("namePatterns tests passed");
