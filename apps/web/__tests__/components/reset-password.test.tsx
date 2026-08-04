import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetPasswordPage from "@/app/auth/reset-password/page";

// ── Mock Supabase ──────────────────────────────────────────────────────────
const mockUpdateUser = vi.fn();
const mockPush = vi.fn();

vi.mock("@/lib/supabase/browser-client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      updateUser: mockUpdateUser,
    },
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/auth/reset-password",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Reset Password Page", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper to fill inputs — uses fireEvent which is reliable on native mocked inputs
  async function fillPassword(input: HTMLElement, value: string) {
    fireEvent.input(input, { target: { value } });
    fireEvent.change(input, { target: { value } });
  }

  // ── Rendering ────────────────────────────────────────────────────────────

  it("renders the reset password form", () => {
    render(<ResetPasswordPage />);

    expect(screen.getByText("Choose a new password")).toBeInTheDocument();
    expect(screen.getByText("New password")).toBeInTheDocument();
    expect(screen.getByText("Confirm new password")).toBeInTheDocument();
    expect(screen.getByText("Update password")).toBeInTheDocument();
  });

  it("renders the 'Back to login' link", () => {
    render(<ResetPasswordPage />);

    expect(screen.getByText("Back to login")).toBeInTheDocument();
    expect(screen.getByText("Back to login").closest("a")).toHaveAttribute(
      "href",
      "/login"
    );
  });

  // ── Password Strength ───────────────────────────────────────────────────

  it("shows password strength indicator when typing", async () => {
    render(<ResetPasswordPage />);

    const inputs = screen.getAllByPlaceholderText("••••••••");
    await fillPassword(inputs[0], "weakpwd");

    await waitFor(() => {
      expect(screen.getByText("Weak")).toBeInTheDocument();
    });
  });

  it("shows 'Strong' for a complex password", async () => {
    render(<ResetPasswordPage />);

    const inputs = screen.getAllByPlaceholderText("••••••••");
    await fillPassword(inputs[0], "Str0ng!Pass");

    await waitFor(() => {
      expect(screen.getByText("Strong")).toBeInTheDocument();
    });
  });

  // ── Password Match/Mismatch ──────────────────────────────────────────────

  it("shows 'Passwords match' when both fields match", async () => {
    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "Str0ng!Pass");

    await waitFor(() => {
      expect(screen.getByText("Passwords match")).toBeInTheDocument();
    });
  });

  it("shows 'Passwords do not match' when fields differ", async () => {
    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "DifferentPass1!");

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  // ── Button Disabled State ────────────────────────────────────────────────

  it("disables submit button when passwords do not match", async () => {
    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "Mismatch!");

    await waitFor(() => {
      const submitButton = screen.getByText("Update password").closest("button");
      expect(submitButton).toBeDisabled();
    });
  });

  it("disables submit button when password is too weak", async () => {
    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "weak");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "weak");

    await waitFor(() => {
      const submitButton = screen.getByText("Update password").closest("button");
      expect(submitButton).toBeDisabled();
    });
  });

  it("enables submit button when passwords match and strength is sufficient", async () => {
    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "Str0ng!Pass");

    await waitFor(() => {
      const submitButton = screen.getByText("Update password").closest("button");
      expect(submitButton).not.toBeDisabled();
    });
  });

  // ── Form Submission ──────────────────────────────────────────────────────

  it("calls supabase.auth.updateUser on successful submit", async () => {
    mockUpdateUser.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "Str0ng!Pass");

    await waitFor(() => {
      expect(
        screen.getByText("Update password").closest("button")
      ).not.toBeDisabled();
    });

    await user.click(screen.getByText("Update password"));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        password: "Str0ng!Pass",
      });
    });
  });

  it("shows success state after password update", async () => {
    mockUpdateUser.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "Str0ng!Pass");

    await waitFor(() => {
      expect(
        screen.getByText("Update password").closest("button")
      ).not.toBeDisabled();
    });

    await user.click(screen.getByText("Update password"));

    await waitFor(() => {
      expect(screen.getByText("Password updated!")).toBeInTheDocument();
      expect(screen.getByText("Go to Login")).toBeInTheDocument();
    });
  });

  it("displays error message on update failure", async () => {
    mockUpdateUser.mockResolvedValue({
      error: { message: "Password update failed" },
    });

    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "Str0ng!Pass");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "Str0ng!Pass");

    await waitFor(() => {
      expect(
        screen.getByText("Update password").closest("button")
      ).not.toBeDisabled();
    });

    await user.click(screen.getByText("Update password"));

    await waitFor(() => {
      expect(screen.getByText("Password update failed")).toBeInTheDocument();
    });
  });

  // ── Client-Side Validation ───────────────────────────────────────────────

  it("keeps button disabled for weak password even when matching", async () => {
    render(<ResetPasswordPage />);

    fillPassword(screen.getAllByPlaceholderText("••••••••")[0], "abcdefgh");
    fillPassword(screen.getAllByPlaceholderText("••••••••")[1], "abcdefgh");

    await waitFor(() => {
      const submitButton = screen.getByText("Update password").closest("button");
      expect(submitButton).toBeDisabled();
    });
  });
});
