export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL || "";
  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    const placeholders = ["USER", "PASSWORD", "HOST", "DATABASE"];
    return ![
      parsed.username,
      parsed.password,
      parsed.hostname,
      parsed.pathname.replace("/", ""),
    ].some((part) => placeholders.includes(decodeURIComponent(part).toUpperCase()));
  } catch {
    return false;
  }
}
