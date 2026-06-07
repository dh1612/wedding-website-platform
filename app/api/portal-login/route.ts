import { NextResponse } from "next/server";
import {
  createPortalSessionToken,
  getDefaultCouplePortalPassword,
  getPortalCookieName,
  getOperatorPortalPassword,
  getRequiredPortalScope,
  sanitisePortalNextPath
} from "@/lib/portal-auth";
import { verifyPassword } from "@/lib/passwords";
import {
  getWeddingPortalUserBySlug,
  getWeddingRecordForAdmin
} from "@/lib/production-repositories";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_WINDOW = 8;
const FAILURE_DELAY_MS = 900;

type LoginAttemptState = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, LoginAttemptState>();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    return first?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function normaliseRateLimitKey(value: string) {
  return value.trim().toLowerCase() || "unknown";
}

function getRateLimitKeys(request: Request, email: string, nextPath: string) {
  const ip = normaliseRateLimitKey(getClientIp(request));
  const emailKey = normaliseRateLimitKey(email || "anonymous");
  const pathKey = normaliseRateLimitKey(nextPath || "/portal-login");

  return [`portal-login:ip:${ip}`, `portal-login:path:${pathKey}:email:${emailKey}`];
}

function getActiveAttemptState(key: string) {
  const current = loginAttempts.get(key);

  if (!current) {
    return null;
  }

  if (current.resetAt <= Date.now()) {
    loginAttempts.delete(key);
    return null;
  }

  return current;
}

function getRetryAfterMs(keys: string[]) {
  let retryAfterMs = 0;

  for (const key of keys) {
    const current = getActiveAttemptState(key);

    if (!current) {
      continue;
    }

    if (current.count >= MAX_ATTEMPTS_PER_WINDOW) {
      retryAfterMs = Math.max(retryAfterMs, current.resetAt - Date.now());
    }
  }

  return retryAfterMs;
}

function recordFailedAttempt(keys: string[]) {
  const now = Date.now();

  for (const key of keys) {
    const current = getActiveAttemptState(key);

    if (!current) {
      loginAttempts.set(key, {
        count: 1,
        resetAt: now + LOGIN_WINDOW_MS
      });
      continue;
    }

    loginAttempts.set(key, {
      count: current.count + 1,
      resetAt: current.resetAt
    });
  }
}

function clearFailedAttempts(keys: string[]) {
  for (const key of keys) {
    loginAttempts.delete(key);
  }
}

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    next?: string;
  };

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password?.trim() ?? "";
  const nextPath = sanitisePortalNextPath(body.next);
  const rateLimitKeys = getRateLimitKeys(request, email, nextPath);
  const retryAfterMs = getRetryAfterMs(rateLimitKeys);

  if (retryAfterMs > 0) {
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    const response = jsonResponse(
      {
        error:
          "Too many login attempts for now. Please wait a few minutes and try again."
      },
      { status: 429 }
    );
    response.headers.set("Retry-After", `${retryAfterSeconds}`);
    return response;
  }

  const requiredScope = getRequiredPortalScope(nextPath);
  let grantedScope = requiredScope ?? "admin";

  if (password === getOperatorPortalPassword()) {
    grantedScope = "admin";
  } else if (requiredScope?.startsWith("wedding:")) {
    const slug = requiredScope.replace(/^wedding:/, "");
    const [{ weddingId, user }, wedding] = await Promise.all([
      getWeddingPortalUserBySlug(slug),
      getWeddingRecordForAdmin(slug)
    ]);
    const plannerSettings = (wedding?.plannerSettingsJson ?? {}) as {
      packageTier?: "basic" | "smart" | "premium";
      portalUnlocked?: boolean;
      portalPassword?: string;
    };
    const packageTier = plannerSettings.packageTier ?? "smart";
    const portalUnlocked = plannerSettings.portalUnlocked === true;

    if (packageTier !== "premium") {
      return jsonResponse(
        { error: "This private couple portal is only included with the premium package." },
        { status: 403 }
      );
    }

    if (!portalUnlocked) {
      return jsonResponse(
        { error: "This private couple portal will be unlocked after approval or payment." },
        { status: 403 }
      );
    }

    if (weddingId && user) {
      const passwordMatches =
        email === user.email.toLowerCase() &&
        (await verifyPassword(password, user.passwordHash));

      if (!passwordMatches) {
        recordFailedAttempt(rateLimitKeys);
        await delay(FAILURE_DELAY_MS);
        return jsonResponse(
          { error: "That email or password is not correct." },
          { status: 401 }
        );
      }
    } else {
      const weddingPassword =
        plannerSettings.portalPassword?.trim() || getDefaultCouplePortalPassword();

      if (password !== weddingPassword) {
        recordFailedAttempt(rateLimitKeys);
        await delay(FAILURE_DELAY_MS);
        return jsonResponse(
          { error: "That password is not correct." },
          { status: 401 }
        );
      }
    }

    if (!wedding?.id) {
      return jsonResponse(
        { error: "Wedding not found." },
        { status: 404 }
      );
    }
  } else {
    recordFailedAttempt(rateLimitKeys);
    await delay(FAILURE_DELAY_MS);
    return jsonResponse(
      { error: "That password is not correct." },
      { status: 401 }
    );
  }

  clearFailedAttempts(rateLimitKeys);

  const response = jsonResponse({
    ok: true,
    next: nextPath
  });

  response.cookies.set({
    name: getPortalCookieName(),
    value: await createPortalSessionToken(grantedScope),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
