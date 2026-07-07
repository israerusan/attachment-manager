import assert from "node:assert";
import { formatBytes, kbToBytes } from "../src/core/utils/sizes";

assert.strictEqual(formatBytes(0), "0 B");
assert.strictEqual(formatBytes(-5), "0 B");
assert.strictEqual(formatBytes(NaN), "0 B");
assert.strictEqual(formatBytes(512), "512 B");
assert.strictEqual(formatBytes(1024), "1 KB");
assert.strictEqual(formatBytes(1536), "1.5 KB");
assert.strictEqual(formatBytes(5 * 1024 * 1024), "5 MB");
assert.strictEqual(formatBytes(1024 * 1024 * 1024), "1 GB");

assert.strictEqual(kbToBytes(1), 1024);
assert.strictEqual(kbToBytes(0), 0);
assert.strictEqual(kbToBytes(-3), 0);
assert.strictEqual(kbToBytes(1.5), 1536);

console.log("sizes tests passed");
