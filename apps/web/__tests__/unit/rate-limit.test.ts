import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  checkRateLimit,
  resetRateLimit,
  formatRetryAfter,
} from "@/lib/rate-limit";

describe("Rate Limiter", () => {
  beforeEach(() => {
    // Reset internal state by clearing any previous entries
    // We'll use a unique IP per test group to avoid interference
  });

  describe("checkRateLimit", () => {
    it("allows the first attempt for a new IP", () => {
      const result = checkRateLimit("test-ip-first");
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4); // MAX_ATTEMPTS (5) - 1
      expect(result.retryAfterMs).toBe(0);
    });

    it("tracks remaining attempts correctly", () => {
      const ip = "test-ip-tracking";
      const r1 = checkRateLimit(ip);
      expect(r1.remaining).toBe(4);

      const r2 = checkRateLimit(ip);
      expect(r2.remaining).toBe(3);

      const r3 = checkRateLimit(ip);
      expect(r3.remaining).toBe(2);
    });

    it("blocks after MAX_ATTEMPTS (5) are exhausted", () => {
      const ip = "test-ip-block";
      // Use up all 5 attempts
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip);
      }

      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.retryAfterMs).toBeGreaterThan(0);
    });

    it("resets after the 15-minute window expires", () => {
      const ip = "test-ip-window";
      // Exhaust all attempts
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip);
      }

      // Verify blocked
      expect(checkRateLimit(ip).allowed).toBe(false);

      // Advance time past the 15-minute window
      vi.useFakeTimers();
      vi.advanceTimersByTime(15 * 60 * 1000 + 1);

      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);

      vi.useRealTimers();
    });
  });

  describe("resetRateLimit", () => {
    it("clears the counter for an IP address", () => {
      const ip = "test-ip-reset";

      // Make a few attempts
      checkRateLimit(ip);
      checkRateLimit(ip);
      checkRateLimit(ip);

      // Reset
      resetRateLimit(ip);

      // Should be back to fresh state
      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });
  });

  describe("formatRetryAfter", () => {
    it("returns '1 minute' for values under 60 seconds", () => {
      expect(formatRetryAfter(30_000)).toBe("1 minute");
    });

    it("returns '1 minute' for exactly 60 seconds", () => {
      expect(formatRetryAfter(60_000)).toBe("1 minute");
    });

    it("returns correct plural minutes", () => {
      expect(formatRetryAfter(120_000)).toBe("2 minutes");
      expect(formatRetryAfter(300_000)).toBe("5 minutes");
      expect(formatRetryAfter(900_000)).toBe("15 minutes");
    });

    it("rounds up partial minutes", () => {
      expect(formatRetryAfter(90_000)).toBe("2 minutes"); // 1.5 min → 2
      expect(formatRetryAfter(61_000)).toBe("2 minutes"); // just over 1 min → 2
    });
  });
});
