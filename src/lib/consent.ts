/**
 * Cookie/consent state.
 *
 * Deny-by-default: nothing beyond strictly necessary storage runs until the
 * visitor makes a choice. Advertising and analytics are separate categories so
 * a visitor can accept one without the other, which is what both the DPDP Act
 * and (for any EEA traffic) GDPR/ePrivacy expect.
 */

export const CONSENT_STORAGE_KEY = "railsetu-consent";

/** Bump when the categories change so stored consent is re-asked rather than
 *  silently reused for purposes the visitor never agreed to. */
export const CONSENT_VERSION = 1;

export interface ConsentState {
  version: number;
  /** ISO timestamp of the decision — DPDP expects consent to be demonstrable. */
  decidedAt: string;
  analytics: boolean;
  advertising: boolean;
}

export const DENY_ALL: Omit<ConsentState, "decidedAt"> = {
  version: CONSENT_VERSION,
  analytics: false,
  advertising: false,
};

export function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    // A stored decision from an older category set is not valid consent now.
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.decidedAt !== "string") return null;
    return {
      version: CONSENT_VERSION,
      decidedAt: parsed.decidedAt,
      analytics: Boolean(parsed.analytics),
      advertising: Boolean(parsed.advertising),
    };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeConsent(next: Omit<ConsentState, "decidedAt">): ConsentState {
  const state: ConsentState = { ...next, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage blocked — consent simply won't persist, and we re-ask */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

/** Fired on the window whenever consent changes, so ad slots mounted earlier
 *  can react without a full reload. */
export const CONSENT_EVENT = "railsetu:consent";
