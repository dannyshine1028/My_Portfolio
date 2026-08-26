import crypto from "crypto";

export const ADMIN_COOKIE = "admin_session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12時間

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not set. Netlifyの環境変数（Site settings → Environment variables）に設定してください。"
    );
  }
  return secret;
}

export function createSessionToken(): string {
  const payload = `${Date.now()}`;
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  if (!payload || !sig) return false;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;

  const age = Date.now() - Number(payload);
  return Number.isFinite(age) && age >= 0 && age < SESSION_MAX_AGE_MS;
}
