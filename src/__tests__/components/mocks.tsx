import { vi } from "vitest";

// ─── next-intl ────────────────────────────────────────────────
// Returns translation keys as-is so tests can assert on keys
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const t = (key: string) => `${namespace}.${key}`;
    return t;
  },
  useLocale: () => "es",
}));

// ─── next/navigation ─────────────────────────────────────────
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => "/es",
  useRouter: () => ({ push: pushMock }),
}));

// ─── next/image ──────────────────────────────────────────────
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { alt = "", fill, priority, ...rest } = props;
    void fill;
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt as string} {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

// ─── next/link ───────────────────────────────────────────────
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  ),
}));

// ─── framer-motion ───────────────────────────────────────────
const motionComponentCache: Record<string, React.FC<Record<string, unknown> & { children?: React.ReactNode }>> = {};

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        if (!motionComponentCache[prop]) {
          const Component = ({
            children,
            initial,
            animate,
            exit,
            transition,
            whileHover,
            whileTap,
            whileInView,
            viewport,
            layout,
            variants,
            ...rest
          }: Record<string, unknown> & { children?: React.ReactNode }) => {
            void initial;
            void animate;
            void exit;
            void transition;
            void whileHover;
            void whileTap;
            void whileInView;
            void viewport;
            void layout;
            void variants;
            const Tag = prop as keyof HTMLElementTagNameMap;
            return <Tag {...(rest as Record<string, unknown>)}>{children}</Tag>;
          };
          Component.displayName = `motion.${prop}`;
          motionComponentCache[prop] = Component;
        }
        return motionComponentCache[prop];
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
  useInView: () => true,
}));

export { pushMock };
