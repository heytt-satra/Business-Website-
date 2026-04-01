export const FALLBACK_SITE_URL = "http://127.0.0.1:3000";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl());
}

export function toAbsoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
