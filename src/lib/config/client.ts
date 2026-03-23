const TRUTHY_ENV_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSY_ENV_VALUES = new Set(["0", "false", "no", "off"]);

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

function readPublicBooleanEnv(
  value: string | undefined,
  defaultValue: boolean
) {
  if (!value) {
    return defaultValue;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (TRUTHY_ENV_VALUES.has(normalizedValue)) {
    return true;
  }

  if (FALSY_ENV_VALUES.has(normalizedValue)) {
    return false;
  }

  return defaultValue;
}

export const clientConfig = {
  showTeamPhotos: readPublicBooleanEnv(
    process.env.NEXT_PUBLIC_SHOW_TEAM_PHOTOS,
    false
  ),
  mailingApiUrl: readPublicStringEnv(
    process.env.NEXT_PUBLIC_MAILING_API_URL,
    "https://mailing-api.fly.dev"
  ),
} as const;
