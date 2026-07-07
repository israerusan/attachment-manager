import assert from "node:assert";
import { sortIssues, countByType, groupByType, totalSeverity } from "../src/core/rules/severity";
import { makeIssue } from "./_helpers";

const a = makeIssue({ attachmentPath: "a", attachmentName: "a.png", severity: 1, sizeBytes: 900, issueType: "unnamed" });
const b = makeIssue({ attachmentPath: "b", attachmentName: "b.png", severity: 3, sizeBytes: 100, issueType: "unused" });
const c = makeIssue({ attachmentPath: "c", attachmentName: "c.png", severity: 3, sizeBytes: 500, issueType: "duplicate" });

// severity: severity desc, then size desc.
const bySeverity = sortIssues([a, b, c], "severity").map((i) => i.attachmentPath);
assert.deepStrictEqual(bySeverity, ["c", "b", "a"]); // c(3,500) > b(3,100) > a(1)

// size: size desc regardless of severity.
const bySize = sortIssues([a, b, c], "size").map((i) => i.attachmentPath);
assert.deepStrictEqual(bySize, ["a", "c", "b"]); // 900 > 500 > 100

// name: alphabetical by name.
const byName = sortIssues([c, b, a], "name").map((i) => i.attachmentName);
assert.deepStrictEqual(byName, ["a.png", "b.png", "c.png"]);

// path: alphabetical by path.
const byPath = sortIssues([c, b, a], "path").map((i) => i.attachmentPath);
assert.deepStrictEqual(byPath, ["a", "b", "c"]);

// Input is never mutated.
const input = [c, b, a];
sortIssues(input, "severity");
assert.strictEqual(input[0], c);

// Aggregations.
const counts = countByType([a, b, c]);
assert.strictEqual(counts.unused, 1);
assert.strictEqual(counts.duplicate, 1);
assert.strictEqual(counts.unnamed, 1);
assert.strictEqual(counts.large, 0);

const grouped = groupByType([a, b, c]);
assert.strictEqual(grouped.unused.length, 1);
assert.strictEqual(grouped.misplaced.length, 0);

assert.strictEqual(totalSeverity([a, b, c]), 7);

console.log("severity tests passed");
