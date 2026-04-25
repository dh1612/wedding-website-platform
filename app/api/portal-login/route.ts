import { NextResponse } from "next/server";
import {
  createPortalSessionToken,
  getPortalCookieName,
  getPortalPassword
} from "@/lib/portal-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    password?: string;
    next?: string;
  };

  if (body.password !== getPortalPassword()) {
    return NextResponse.json(
      { error: "That password is not correct." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    ok: true,
    next: body.next || "/couple-portal"
  });

  response.cookies.set({
    name: getPortalCookieName(),
    value: await createPortalSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
