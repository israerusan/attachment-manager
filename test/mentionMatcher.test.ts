import assert from "node:assert";
import { MentionMatcher, fileNameVariants } from "../src/core/safety/mentionMatcher";

// Variants cover raw + percent-encoded (spaces, &, parens, non-ascii).
assert.deepStrictEqual(fileNameVariants("a b.png"), ["a b.png", "a%20b.png"]);
assert.deepStrictEqual(fileNameVariants("a&b.png"), ["a&b.png", "a%26b.png"]);
assert.deepStrictEqual(fileNameVariants("plain.png"), ["plain.png"]);

// Aho-Corasick finds every owner whose pattern occurs anywhere in a source text.
const m = new MentionMatcher();
m.addPattern("logo.png", 0);
m.addPattern("a%26b.png", 1); // encoded form owned by candidate 1
m.addPattern("unused.png", 2);
m.build();

const hits = new Set<number>();
m.scanInto('see ![[assets/logo.png]] and <img src="a%26b.png">'.toLowerCase(), hits);
assert.ok(hits.has(0), "logo.png matched");
assert.ok(hits.has(1), "encoded a%26b.png matched");
assert.ok(!hits.has(2), "unused.png not matched");

// Overlapping/adjacent patterns and repeated scans accumulate into the same set.
const m2 = new MentionMatcher();
m2.addPattern("cat.png", 0);
m2.addPattern("at.png", 1); // suffix overlaps with cat.png via fail links
m2.build();
const h2 = new Set<number>();
m2.scanInto("cat.png", h2);
assert.ok(h2.has(0) && h2.has(1), "fail-link output (at.png inside cat.png) is reported");

console.log("mentionMatcher tests passed");
