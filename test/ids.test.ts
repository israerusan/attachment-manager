import assert from "node:assert";
import { issueKey, issueKeyPath } from "../src/core/utils/ids";

// Round-trip: the note-path prefix is always recoverable from the key.
const p = "assets/some folder/a.png";
assert.strictEqual(issueKeyPath(issueKey(p, "unused")), p);
assert.strictEqual(issueKeyPath(issueKey(p, "duplicate", "rule-123")), p);

// Distinct keys per type and per rule.
assert.notStrictEqual(issueKey(p, "unused"), issueKey(p, "large"));
assert.notStrictEqual(issueKey(p, "custom", "r1"), issueKey(p, "custom", "r2"));

// A key without a separator (defensive) recovers the whole string.
assert.strictEqual(issueKeyPath("no-separator-here"), "no-separator-here");

console.log("ids tests passed");
