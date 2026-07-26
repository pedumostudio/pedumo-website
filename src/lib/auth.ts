/**
 * Optional authentication foundation.
 *
 * This is intentionally lightweight: it demonstrates a production-shaped auth
 * surface (register, login, logout, session, protected routes) without pulling
 * in a heavy provider. Sessions are signed with HMAC-SHA256 using AUTH_SECRET.
 * User credentials are kept in an in-memory store for the demo; swap this for
 * Auth.js, Clerk or a Postgres-backed user table when going to production.
 *
 * If AUTH_SECRET is not configured, every auth endpoint returns 503 so the
 * rest of the marketing site is unaffected.
 */

type User = { email: string; passwordHash: string; createdAt: number };

const users = new Map<string, User>();
const sessions = new Map<string, { email: string; createdAt: number }>();

const SESSION_COOKIE = "pedumo_session";

function secret(): string | null {
  return process.env.AUTH_SECRET ?? null;
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(message: string): Promise<string> {
  const s = secret();
  if (!s) throw new Error("AUTH_SECRET not configured");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(s),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signSession(sessionId: string): Promise<string> {
  const sig = await hmac(sessionId);
  return `${sessionId}.${sig}`;
}

async function verifySignedSession(token: string): Promise<string | null> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const sessionId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmac(sessionId);
  // constant-time-ish compare
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0 ? sessionId : null;
}

function randomId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAuthConfigured(): boolean {
  return secret() != null;
}

export function parseSessionCookie(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|; )${SESSION_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function getSessionEmail(request: Request): Promise<string | null> {
  const token = parseSessionCookie(request);
  if (!token) return null;
  const sessionId = await verifySignedSession(token);
  if (!sessionId) return null;
  const s = sessions.get(sessionId);
  return s?.email ?? null;
}

export async function register(email: string, password: string): Promise<string | null> {
  if (!isAuthConfigured()) return null;
  const lower = email.toLowerCase();
  if (users.has(lower)) return null;
  const passwordHash = await sha256(password);
  users.set(lower, { email: lower, passwordHash, createdAt: Date.now() });
  return createSession(lower);
}

export async function login(email: string, password: string): Promise<string | null> {
  if (!isAuthConfigured()) return null;
  const user = users.get(email.toLowerCase());
  if (!user) return null;
  const hash = await sha256(password);
  if (hash !== user.passwordHash) return null;
  return createSession(user.email);
}

async function createSession(email: string): Promise<string> {
  const sessionId = randomId();
  sessions.set(sessionId, { email, createdAt: Date.now() });
  return await signSession(sessionId);
}

export function logout(token: string): void {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return;
  sessions.delete(token.slice(0, dot));
}

export function sessionCookieOptions(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}={token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${secure}`;
}

export { SESSION_COOKIE };
