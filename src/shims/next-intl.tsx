import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

type Messages = Record<string, unknown>;

type IntlContextValue = {
  locale: string;
  messages: Messages;
};

const IntlContext = createContext<IntlContextValue | null>(null);

function getValueFromPath(
  messages: Messages,
  path: string
): string | undefined {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, messages);

  return typeof value === "string" ? value : undefined;
}

export function NextIntlClientProvider({
  locale,
  messages,
  children,
}: {
  locale?: string;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo<IntlContextValue>(
    () => ({
      locale: locale ?? "es",
      messages,
    }),
    [locale, messages]
  );

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

export function useLocale() {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error("useLocale must be used inside NextIntlClientProvider");
  }

  return context.locale;
}

export function useTranslations(namespace?: string) {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error(
      "useTranslations must be used inside NextIntlClientProvider"
    );
  }

  return (key: string) => {
    const fullPath = namespace ? `${namespace}.${key}` : key;
    return getValueFromPath(context.messages, fullPath) ?? fullPath;
  };
}
