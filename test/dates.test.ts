import assert from "node:assert";
import { isOlderThanDays, daysBetween } from "../src/core/utils/dates";

const NOW = Date.parse("2026-07-06T00:00:00Z");
const DAY = 24 * 60 * 60 * 1000;

// Older than N days: strictly greater than the threshold.
assert.strictEqual(isOlderThanDays(NOW - 100 * DAY, 90, NOW), true);
assert.strictEqual(isOlderThanDays(NOW - 10 * DAY, 90, NOW), false);
// Exactly N days old is NOT "older than N days".
assert.strictEqual(isOlderThanDays(NOW - 90 * DAY, 90, NOW), false);
// A future mtime (clock skew) is never old.
assert.strictEqual(isOlderThanDays(NOW + 5 * DAY, 1, NOW), false);

assert.strictEqual(daysBetween(NOW, NOW - 3 * DAY), 3);
assert.strictEqual(daysBetween(NOW, NOW), 0);
// Absolute value, floored.
assert.strictEqual(daysBetween(NOW - 3 * DAY, NOW), 3);
assert.strictEqual(daysBetween(NOW, NOW - Math.floor(2.9 * DAY)), 2);

console.log("dates tests passed");
