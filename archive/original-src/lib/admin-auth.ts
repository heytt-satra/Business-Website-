import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "tera_blog_admin";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export interface AdminSession {
  email: string;
  expiresAt: number;
}

function getSessionSecret() {
  const secret = process.env.BLOG_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing BLOG_SESSION_SECRET. Add it to your environment before using /admin.");
  }

  return secret;
}

function getAllowedEmails() {
  return (process.env.BLOG_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function parseConfiguredValues(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function encodeSession(payload: AdminSession) {
  const serialized = JSON.stringify(payload);
  const encodedPayload = Buffer.from(serialized).toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function decodeSession(cookieValue: string | undefined) {
  if (!cookieValue) {
    return null;
  }

  const [encodedPayload, signature] = cookieValue.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  if (!safeEqual(sign(encodedPayload), signature)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as AdminSession;

    if (!parsed.email || typeof parsed.expiresAt !== "number") {
      return null;
    }

    if (parsed.expiresAt <= Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function isPasswordValid(password: string) {
  const configuredPassword = process.env.BLOG_ADMIN_PASSWORD;
  if (!configuredPassword) {
    throw new Error("Missing BLOG_ADMIN_PASSWORD. Add it to your environment before using /admin.");
  }

  const incomingHash = hashValue(password);
  return parseConfiguredValues(configuredPassword).some((candidate) => {
    const expectedHash = candidate.startsWith("sha256:")
      ? candidate.slice("sha256:".length)
      : hashValue(candidate);

    return safeEqual(incomingHash, expectedHash);
  });
}

export async function verifyAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const allowedEmails = getAllowedEmails();

  if (allowedEmails.length === 0) {
    throw new Error("Missing BLOG_ADMIN_EMAILS. Add one or more team emails before using /admin.");
  }

  if (!allowedEmails.includes(normalizedEmail)) {
    return false;
  }

  return isPasswordValid(password);
}

export async function createAdminSession(email: string) {
  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(session.expiresAt),
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getAdminSession() {
  const store = await cookies();
  const session = decodeSession(store.get(ADMIN_COOKIE_NAME)?.value);
  return session;
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
