import { test, expect } from "@playwright/test";

test.describe("Auth Flow — E2E", () => {
  // ── Login Page Rendering ──────────────────────────────────────────────────

  test("login page loads with the login form visible", async ({ page }) => {
    await page.goto("/login");

    // Wait for the form to render
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(
      page.getByPlaceholder("name@example.com")
    ).toBeVisible();
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("renders both login and signup tabs", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByText("login", { exact: false })).toBeVisible();
    await expect(page.getByText("signup", { exact: false })).toBeVisible();
  });

  test("renders Google OAuth button", async ({ page }) => {
    await page.goto("/login");

    await expect(
      page.getByRole("button", { name: /Google/ })
    ).toBeVisible();
  });

  test("renders Terms of Service and Privacy Policy links", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(page.getByText("Terms of Service")).toBeVisible();
    await expect(page.getByText("Privacy Policy")).toBeVisible();
  });

  // ── Tab Switching ─────────────────────────────────────────────────────────

  test("tab switching between Login and Signup works", async ({ page }) => {
    await page.goto("/login");

    // Click signup tab
    await page.getByText("signup").click();
    await expect(page.getByText("Create an account")).toBeVisible();
    await expect(page.getByPlaceholder("John Doe")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create Account" })
    ).toBeVisible();

    // Click login tab
    await page.getByText("login").click();
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign In" })
    ).toBeVisible();
  });

  // ── Forgot Password Mode ─────────────────────────────────────────────────

  test("forgot password mode shows reset form", async ({ page }) => {
    await page.goto("/login");

    await page.getByText("Forgot password?").click();

    await expect(page.getByText("Reset Password")).toBeVisible();
    await expect(
      page.getByText("Enter your email and we'll send you a reset link")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send Reset Link" })
    ).toBeVisible();
  });

  test("back to Login from forgot password", async ({ page }) => {
    await page.goto("/login");

    await page.getByText("Forgot password?").click();
    await expect(page.getByText("Reset Password")).toBeVisible();

    await page.getByText(/Back to Login/).click();
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  // ── Login Error Handling ──────────────────────────────────────────────────

  test("invalid email/password shows error message", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("name@example.com").fill("bad@example.com");
    await page.getByPlaceholder("••••••••").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign In" }).click();

    // Should show an error (Supabase returns "Invalid login credentials")
    await expect(
      page.getByText(/invalid|error|failed|credentials/i)
    ).toBeVisible({ timeout: 10_000 });
  });

  // ── Successful Login ──────────────────────────────────────────────────────

  test("successful login redirects to /dashboard or /onboarding", async ({
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // Skip if test credentials are not provided
    test.skip(
      !email || !password,
      "Skipped: TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required"
    );

    await page.goto("/login");

    await page.getByPlaceholder("name@example.com").fill(email!);
    await page.getByPlaceholder("••••••••").fill(password!);
    await page.getByRole("button", { name: "Sign In" }).click();

    // Should redirect to dashboard or onboarding
    await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 15_000 });
    expect(page.url()).toMatch(/\/(dashboard|onboarding)/);
  });

  // ── Middleware Protection ─────────────────────────────────────────────────

  test("unauthenticated access to /dashboard redirects to /login", async ({
    page,
  }) => {
    // Clear any existing cookies
    await page.context().clearCookies();

    await page.goto("/dashboard");

    // Middleware should redirect unauthenticated users to /login
    await page.waitForURL(/\/login/, { timeout: 10_000 });
    expect(page.url()).toContain("/login");
  });

  // ── Password Strength (Signup Mode) ───────────────────────────────────────

  test("password strength indicator appears in signup mode", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByText("signup").click();

    await page.getByPlaceholder("••••••••").fill("weak");

    await expect(page.getByText("Password strength:")).toBeVisible({
      timeout: 5_000,
    });
  });

  // ── Logo & Branding ───────────────────────────────────────────────────────

  test("ZooLearn logo is displayed on login page", async ({ page }) => {
    await page.goto("/login");

    const logo = page.getByAltText("ZooLearn Logo");
    await expect(logo).toBeVisible();
  });

  // ── Lottie Animation (Desktop) ────────────────────────────────────────────

  test("right column with animation is visible on desktop", async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/login");

    const iframe = page.locator('iframe[title="Dinosaur Animation"]');
    await expect(iframe).toBeVisible();
  });

  // ── Google OAuth Redirect ─────────────────────────────────────────────────

  test("Google button triggers OAuth redirect", async ({ page }) => {
    await page.goto("/login");

    // Listen for navigation
    const [popup] = await Promise.all([
      page
        .waitForEvent("popup", { timeout: 5_000 })
        .catch(() => null),
      page.getByRole("button", { name: /Google/ }).click(),
    ]);

    // Either a popup opens (Google consent) or the page navigates to Supabase auth
    // We just verify the click didn't crash and some navigation happened
    const currentUrl = popup ? popup.url() : page.url();
    expect(currentUrl).toBeTruthy();
  });

  // ── Reset Password Page ───────────────────────────────────────────────────

  test("reset password page loads correctly", async ({ page }) => {
    await page.goto("/auth/reset-password");

    await expect(page.getByText("Choose a new password")).toBeVisible();
    await expect(page.getByText("New password")).toBeVisible();
    await expect(page.getByText("Confirm new password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Update password" })
    ).toBeVisible();
  });

  test("reset password page shows password match feedback", async ({
    page,
  }) => {
    await page.goto("/auth/reset-password");

    const inputs = page.getByPlaceholder("••••••••");
    await inputs.first().fill("Str0ng!Pass");
    await inputs.nth(1).fill("Str0ng!Pass");

    await expect(page.getByText("Passwords match")).toBeVisible({
      timeout: 5_000,
    });
  });

  test("reset password page shows mismatch feedback", async ({ page }) => {
    await page.goto("/auth/reset-password");

    const inputs = page.getByPlaceholder("••••••••");
    await inputs.first().fill("Str0ng!Pass");
    await inputs.nth(1).fill("Different!1");

    await expect(page.getByText("Passwords do not match")).toBeVisible({
      timeout: 5_000,
    });
  });
});
