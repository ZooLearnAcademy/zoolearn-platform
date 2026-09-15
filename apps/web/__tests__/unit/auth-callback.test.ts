import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockExchangeCodeForSession = vi.fn();
const mockGetUser = vi.fn();
const mockUpsert = vi.fn();

vi.mock("@/lib/supabase/server-client", () => ({
  createSupabaseServerClient: vi.fn(async () => ({
    auth: {
      exchangeCodeForSession: mockExchangeCodeForSession,
      getUser: mockGetUser,
    },
    from: () => ({
      upsert: mockUpsert,
    }),
  })),
}));

// We need to dynamically import the route handler after mocks are set up
// because the route file imports createSupabaseServerClient at the top level.

describe("Auth Callback Route — GET /auth/callback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function buildRequest(params: Record<string, string>): Request {
    const url = new URL("http://localhost:3000/auth/callback");
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return new Request(url.toString(), {
      headers: new Headers({ "x-forwarded-host": "" }),
    });
  }

  it("redirects to /login with error when no code is provided", async () => {
    const { GET } = await import("@/app/auth/callback/route");
    const request = buildRequest({});
    const response = await GET(request);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/login");
    expect(location).toContain("error=auth_callback_error");
  });

  it("redirects to /login with error when code exchange fails", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      error: { message: "Invalid code" },
    });

    const { GET } = await import("@/app/auth/callback/route");
    const request = buildRequest({ code: "invalid-code" });
    const response = await GET(request);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/login");
    expect(location).toContain("error=auth_callback_error");
  });

  it("exchanges code, upserts profile, and redirects to 'next' param on success", async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-123",
          email: "test@example.com",
          user_metadata: {
            full_name: "Test User",
            avatar_url: "https://example.com/avatar.jpg",
          },
        },
      },
    });
    mockUpsert.mockResolvedValue({ error: null });

    const { GET } = await import("@/app/auth/callback/route");
    const request = buildRequest({ code: "valid-code", next: "/dashboard" });
    const response = await GET(request);

    // Verify code exchange was called
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid-code");

    // Verify profile upsert was called with correct data
    expect(mockUpsert).toHaveBeenCalledWith(
      {
        user_id: "user-123",
        full_name: "Test User",
        email: "test@example.com",
        avatar_url: "https://example.com/avatar.jpg",
      },
      { onConflict: "user_id" }
    );

    // Verify redirect to dashboard
    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/dashboard");
  });

  it("redirects to /auth/reset-password on type=recovery", async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-456",
          email: "reset@example.com",
          user_metadata: { full_name: "Reset User" },
        },
      },
    });
    mockUpsert.mockResolvedValue({ error: null });

    const { GET } = await import("@/app/auth/callback/route");
    const request = buildRequest({ code: "recovery-code", type: "recovery" });
    const response = await GET(request);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/auth/reset-password");
  });

  it("defaults to '/' when no 'next' param is provided", async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-789",
          email: "default@example.com",
          user_metadata: {},
        },
      },
    });
    mockUpsert.mockResolvedValue({ error: null });

    const { GET } = await import("@/app/auth/callback/route");
    const request = buildRequest({ code: "some-code" });
    const response = await GET(request);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    // Should end with "/" (the default next value)
    expect(location).toMatch(/\/$/);
  });

  it("uses email prefix as full_name fallback when metadata is empty", async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-fallback",
          email: "fallback@example.com",
          user_metadata: {},
        },
      },
    });
    mockUpsert.mockResolvedValue({ error: null });

    const { GET } = await import("@/app/auth/callback/route");
    const request = buildRequest({ code: "fallback-code", next: "/" });
    await GET(request);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        full_name: "fallback",
        avatar_url: null,
      }),
      expect.anything()
    );
  });
});
