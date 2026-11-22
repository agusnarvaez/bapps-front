const PUBLIC_ENV = import.meta.env as Record<string, string | undefined>;

function readPublicStringEnv(
  value: string | undefined,
  defaultValue: string
) {
  if (!value) {
    return defaultValue;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return defaultValue;
  }

  return normalizedValue;
}

export const clientConfig = {
  mailingApiUrl: readPublicStringEnv(
    PUBLIC_ENV.NEXT_PUBLIC_MAILING_API_URL,
    "https://mailing-api.fly.dev"
  ),
} as const;
