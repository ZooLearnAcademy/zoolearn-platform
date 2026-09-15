/**
 * In-memory rate limiter for authentication routes.
 *
 * Tracks failed attempts per IP address. In production, replace the
 * Map-based store with Upstash Redis for persistence across server
 * instances: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */

interface RateLimitEntry {
  count: number;
  firstAttemptAt: number;
}

// In-memory store — resets on server restart (fine for dev / single-instance)
const store = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;          // max failed attempts before blocking
const WINDOW_MS = 15 * 60 * 1000; // 15-minute sliding window

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

/**
 * Check and record a rate-limited event for the given identifier (IP address).
 * Call this on every login attempt. Only call `resetRateLimit` on success.
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry) {
    // First attempt — record it and allow through
    store.set(identifier, { count: 1, firstAttemptAt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterMs: 0 };
  }

  const windowElapsed = now - entry.firstAttemptAt;

  // Window has expired — reset the counter
  if (windowElapsed > WINDOW_MS) {
    store.set(identifier, { count: 1, firstAttemptAt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterMs: 0 };
  }

  // Still inside the window
  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterMs = WINDOW_MS - windowElapsed;
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  // Increment attempt count
  entry.count += 1;
  store.set(identifier, entry);

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - entry.count,
    retryAfterMs: 0,
  };
}

/**
 * Reset the rate limit counter for an identifier after a successful auth.
 */
export function resetRateLimit(identifier: string): void {
  store.delete(identifier);
}

/**
 * Format the retryAfterMs into a human-readable string for error messages.
 */
export function formatRetryAfter(ms: number): string {
  const minutes = Math.ceil(ms / 60000);
  return minutes === 1 ? "1 minute" : `${minutes} minutes`;
}
