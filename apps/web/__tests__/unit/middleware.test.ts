import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockGetUser = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(() => ({
    allowed: true,
    remaining: 4,
    retryAfterMs: 0,
  })),
  formatRetryAfter: vi.fn(() => "15 minutes"),
}));

// Import after mocks
import { updateSession } from "@/lib/supabase/middleware";
import { checkRateLimit } from "@/lib/rate-limit";

describe("Auth Middleware — updateSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  });

  function buildRequest(
    path: string,
    method = "GET"
  ): NextRequest {
    const url = `http://localhost:3000${path}`;
    return new NextRequest(url, { method });
  }

  it("allows authenticated users to access /dashboard", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "test@example.com" } },
    });

    const request = buildRequest("/dashboard");
    const response = await updateSession(request);

    // Should NOT redirect — just pass through (200)
    expect(response.status).toBe(200);
  });

  it("redirects unauthenticated users from /dashboard to /login", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    const request = buildRequest("/dashboard");
    const response = await updateSession(request);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/login");
  });

  it("allows unauthenticated users to access /login", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    const request = buildRequest("/login");
    const response = await updateSession(request);

    // Should NOT redirect
    expect(response.status).toBe(200);
  });

  it("returns 429 when rate limit is exceeded on POST /login", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: false,
      remaining: 0,
      retryAfterMs: 900_000,
    });

    const request = buildRequest("/login", "POST");
    const response = await updateSession(request);

    expect(response.status).toBe(429);

    const body = await response.json();
    expect(body.error).toContain("Too many login attempts");
  });

  it("does not rate-limit GET requests to /login", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    const request = buildRequest("/login", "GET");
    const response = await updateSession(request);

    // Rate limit should not be checked for GET
    expect(checkRateLimit).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it("passes through requests to non-protected routes", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    const request = buildRequest("/");
    const response = await updateSession(request);

    expect(response.status).toBe(200);
  });
});
