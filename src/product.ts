// Central product metadata and marketing copy. Keeping these in one place keeps
// the license binding, upsell surfaces, and settings copy consistent.

/** Signed into every license payload; a key only unlocks the product it names. */
export const PRODUCT_ID = "attachment-manager";

/** Plugin-owned folder for exported reports; always skipped by scans. */
export const REPORT_FOLDER = "Attachment Manager Reports";

export const PRODUCT_NAME = "Attachment Manager";
export const PRO_NAME = "Attachment Manager Pro";

/** Where "Unlock Pro" sends people. Confirm the real handle before release. */
export const PURCHASE_URL = "https://buymeacoffee.com/attachmentmanager";

/** One-time price. Kept in one place so every surface stays consistent. */
export const PRO_PRICE_LABEL = "$9 one-time";

/** One-line pitch for the Pro tier, reused across upsell surfaces. */
export const PRO_TAGLINE =
  "Safe bulk cleanup, saved scan profiles, custom rules, and report export. $9 one-time, no subscription, no account.";

/** Contextual upsell copy, keyed by the feature the user reached for. */
export const PRO_UPSELL: Record<string, string> = {
  profiles: "Saved scan profiles are a Pro feature. " + PRO_TAGLINE,
  rules: "Custom rules are a Pro feature. " + PRO_TAGLINE,
  bulk: "Bulk actions (trash, dedupe, move, rename) are a Pro feature. " + PRO_TAGLINE,
  export: "Report export is a Pro feature. " + PRO_TAGLINE,
  severity: "Severity tuning is a Pro feature. " + PRO_TAGLINE,
};
