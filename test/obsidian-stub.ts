// Minimal stand-in for the `obsidian` module so any test that transitively
// imports it can be bundled and executed under Node. The core (detectors, rule
// engine, severity, reports) is pure and does not import `obsidian`; this exists
// only as a safety net for the esbuild alias.
export const apiVersion = "1.5.0";

/** Minimal stand-in so modules that import `normalizePath` bundle under Node.
 *  (Only the pure `resolveScanConfig` path is exercised in tests; it doesn't
 *  actually call this — the export just needs to exist for the import to resolve.) */
export function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/|\/$/g, "");
}
