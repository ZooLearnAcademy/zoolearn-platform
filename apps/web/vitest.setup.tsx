import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// ── Mock next/navigation ──────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// ── Mock next/headers ─────────────────────────────────────────────────────
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    getAll: vi.fn(() => []),
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  })),
}));

// ── Mock Supabase browser client ──────────────────────────────────────────
const mockAuth = {
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  signInWithOAuth: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  updateUser: vi.fn(),
  getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
  exchangeCodeForSession: vi.fn(),
};

const mockFrom = vi.fn(() => ({
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  upsert: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue({ data: null, error: null }),
}));

vi.mock("@/lib/supabase/browser-client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: mockAuth,
    from: mockFrom,
  }),
}));

// ── Mock framer-motion to avoid animation issues in tests ─────────────────
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: new Proxy(
      {},
      {
        get: (_target, prop) => {
          // Return a forwardRef component for every HTML element (motion.div, motion.form, etc.)
          if (typeof prop === "string") {
            return ({
              children,
              ...props
            }: {
              children?: React.ReactNode;
              [key: string]: unknown;
            }) => {
              // Filter out framer-motion specific props
              const {
                initial,
                animate,
                exit,
                transition,
                layoutId,
                whileHover,
                whileTap,
                variants,
                ...domProps
              } = props;
              const Element = prop as keyof JSX.IntrinsicElements;
              // @ts-ignore
              return <Element {...domProps}>{children}</Element>;
            };
          }
          return undefined;
        },
      }
    ),
  };
});

// ── Mock @workspace/ui components ───────────────────────────────────────────
vi.mock("@workspace/ui/components/input", () => ({
  Input: vi.fn(
    ({ className, type, ...props }: any) => (
      <input data-testid="mock-input" type={type} className={className} {...props} />
    )
  ),
}));

// ── Mock @phosphor-icons/react ────────────────────────────────────────────
vi.mock("@phosphor-icons/react", () => {
  const IconMock = ({ children, ...props }: any) => (
    <span data-testid="icon" {...props}>
      {children}
    </span>
  );
  return {
    GoogleLogo: IconMock,
    Eye: IconMock,
    EyeSlash: IconMock,
    CheckCircle: IconMock,
    EnvelopeSimple: IconMock,
    X: IconMock,
    ArrowLeft: IconMock,
    PaperPlaneTilt: IconMock,
    ShieldCheck: IconMock,
    LockKey: IconMock,
    User: IconMock,
    CalendarBlank: IconMock,
    GenderIntersex: IconMock,
    GraduationCap: IconMock,
    MapPin: IconMock,
    Buildings: IconMock,
    Bell: IconMock,
    CreditCard: IconMock,
    Key: IconMock,
    PencilSimple: IconMock,
    Camera: IconMock,
    SpinnerGap: IconMock,
  };
});

