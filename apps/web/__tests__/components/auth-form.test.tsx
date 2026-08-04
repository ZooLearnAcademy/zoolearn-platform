import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ── Mock Supabase (must be before import) ──────────────────────────────────
const mockAuth = vi.hoisted(() => ({
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  signInWithOAuth: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  updateUser: vi.fn(),
  getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
  exchangeCodeForSession: vi.fn(),
}));

vi.mock("@/lib/supabase/browser-client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: mockAuth,
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  }),
}));

import { AuthForm } from "@/components/auth-form";

describe("AuthForm Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper
  const fillInput = (element: HTMLElement, value: string) => {
    fireEvent.change(element, { target: { value } });
  };

  // ── Rendering ────────────────────────────────────────────────────────────

  it("renders login mode by default with Welcome back title", () => {
    render(<AuthForm />);

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders email and password inputs in login mode", () => {
    render(<AuthForm />);

    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  // ── Tab Switching ────────────────────────────────────────────────────────

  it("switches to signup mode when signup tab is clicked", async () => {
    render(<AuthForm />);

    await user.click(screen.getByText("signup"));

    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });

  it("shows Full Name field in signup mode", async () => {
    render(<AuthForm />);

    // Switch to signup
    await user.click(screen.getByText("signup"));

    await waitFor(() => {
      expect(screen.getByText("Full Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    });
  });

  it("switches back to login mode from signup", async () => {
    render(<AuthForm />);

    await user.click(screen.getByText("signup"));
    expect(screen.getByText("Create an account")).toBeInTheDocument();

    await user.click(screen.getByText("login"));
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  // ── Forgot Password Mode ────────────────────────────────────────────────

  it("switches to forgot password mode", async () => {
    render(<AuthForm />);

    // Find forgot password button
    const forgotBtn = screen.getByText("Forgot password?");
    await user.click(forgotBtn);

    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(screen.getByText("Send Reset Link")).toBeInTheDocument();
  });

  it("shows Back to Login button in forgot mode", async () => {
    render(<AuthForm />);

    await user.click(screen.getByText("Forgot password?"));

    expect(screen.getByText(/Back to Login/)).toBeInTheDocument();
  });

  it("navigates back from forgot to login mode", async () => {
    render(<AuthForm />);

    await user.click(screen.getByText("Forgot password?"));
    expect(screen.getByText("Reset Password")).toBeInTheDocument();

    await user.click(screen.getByText(/Back to Login/));
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  // ── Password Visibility Toggle ──────────────────────────────────────────

  it("toggles password visibility", async () => {
    render(<AuthForm />);

    // Password fields should be type="password" initially
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    const passwordInput = passwordInputs[0];
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the eye toggle — it's the button right after the password input
    const allButtons = screen.getAllByRole("button");
    const toggleBtn = allButtons.find((btn) => {
      const text = btn.textContent || "";
      return (
        !text.includes("Sign") &&
        !text.includes("login") &&
        !text.includes("signup") &&
        !text.includes("Forgot") &&
        !text.includes("Google") &&
        !text.includes("Create") &&
        !text.includes("Send") &&
        btn.getAttribute("type") === "button"
      );
    });

    if (toggleBtn) {
      await user.click(toggleBtn);
      expect(passwordInput).toHaveAttribute("type", "text");
    }
  });

  // ── Form Submission — Login ──────────────────────────────────────────────

  it("calls signInWithPassword on login submit", async () => {
    mockAuth.signInWithPassword.mockResolvedValue({ error: null });

    render(<AuthForm />);

    fillInput(screen.getByPlaceholderText("name@example.com"), "test@example.com");
    // Get the password input specifically (there may be multiple ••••••••)
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fillInput(passwordInputs[0], "Password123!");
    await user.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(mockAuth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123!",
      });
    });
  });

  it("displays error message on failed login", async () => {
    mockAuth.signInWithPassword.mockRejectedValue(
      new Error("Invalid login credentials")
    );

    render(<AuthForm />);

    fillInput(screen.getByPlaceholderText("name@example.com"), "wrong@example.com");
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fillInput(passwordInputs[0], "wrongpass");
    await user.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(
        screen.getByText("Invalid login credentials")
      ).toBeInTheDocument();
    });
  });

  // ── Form Submission — Signup ─────────────────────────────────────────────

  it("calls signUp with name on signup submit", async () => {
    mockAuth.signUp.mockResolvedValue({ error: null });

    render(<AuthForm />);
    await user.click(screen.getByText("signup"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    });

    fillInput(screen.getByPlaceholderText("John Doe"), "Test User");
    fillInput(screen.getByPlaceholderText("name@example.com"), "new@example.com");
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fillInput(passwordInputs[0], "StrongPass1!");
    await user.click(screen.getByText("Create Account"));

    await waitFor(() => {
      expect(mockAuth.signUp).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "new@example.com",
          password: "StrongPass1!",
          options: expect.objectContaining({
            data: { full_name: "Test User" },
          }),
        })
      );
    });
  });

  it("shows email verification popup after successful signup", async () => {
    mockAuth.signUp.mockResolvedValue({ error: null });

    render(<AuthForm />);
    await user.click(screen.getByText("signup"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    });

    fillInput(screen.getByPlaceholderText("John Doe"), "Test User");
    fillInput(screen.getByPlaceholderText("name@example.com"), "verify@example.com");
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fillInput(passwordInputs[0], "StrongPass1!");
    await user.click(screen.getByText("Create Account"));

    await waitFor(() => {
      expect(screen.getByText("Check your email!")).toBeInTheDocument();
      expect(screen.getByText("verify@example.com")).toBeInTheDocument();
      expect(
        screen.getByText("Got it, take me to Login")
      ).toBeInTheDocument();
    });
  });

  // ── Forgot Password Submission ───────────────────────────────────────────

  it("calls resetPasswordForEmail on forgot password submit", async () => {
    mockAuth.resetPasswordForEmail.mockResolvedValue({ error: null });

    render(<AuthForm />);
    await user.click(screen.getByText("Forgot password?"));

    fillInput(screen.getByPlaceholderText("name@example.com"), "forgot@example.com");
    await user.click(screen.getByText("Send Reset Link"));

    await waitFor(() => {
      expect(mockAuth.resetPasswordForEmail).toHaveBeenCalledWith(
        "forgot@example.com",
        expect.objectContaining({
          redirectTo: expect.stringContaining("/auth/callback?type=recovery"),
        })
      );
    });
  });

  // ── Google OAuth ─────────────────────────────────────────────────────────

  it("triggers Google OAuth on button click", async () => {
    mockAuth.signInWithOAuth.mockResolvedValue({ error: null });

    render(<AuthForm />);
    await user.click(screen.getByText("Google"));

    expect(mockAuth.signInWithOAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "google",
        options: expect.objectContaining({
          redirectTo: expect.stringContaining(
            "/auth/callback?next=/dashboard"
          ),
        }),
      })
    );
  });

  // ── Password Strength Indicator (Signup) ─────────────────────────────────

  it("shows password strength indicator in signup mode", async () => {
    render(<AuthForm />);
    await user.click(screen.getByText("signup"));

    await waitFor(() => {
      expect(screen.getAllByPlaceholderText("••••••••").length).toBeGreaterThan(
        0
      );
    });

    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fillInput(passwordInputs[0], "weak");

    await waitFor(() => {
      expect(screen.getByText("Password strength:")).toBeInTheDocument();
    });
  });

  // ── Google OAuth Error ───────────────────────────────────────────────────

  it("shows error when Google OAuth fails", async () => {
    mockAuth.signInWithOAuth.mockResolvedValue({
      error: { message: "OAuth provider error" },
    });

    render(<AuthForm />);
    await user.click(screen.getByText("Google"));

    await waitFor(() => {
      expect(screen.getByText("OAuth provider error")).toBeInTheDocument();
    });
  });

  // ── Terms & Privacy Links ────────────────────────────────────────────────

  it("renders Terms of Service and Privacy Policy links", () => {
    render(<AuthForm />);
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  // ── Or Continue With divider ─────────────────────────────────────────────

  it("renders the 'Or continue with' divider", () => {
    render(<AuthForm />);
    expect(screen.getByText("Or continue with")).toBeInTheDocument();
  });
});
