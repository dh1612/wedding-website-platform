import { NextResponse } from "next/server";
import {
  getWeddingSiteBySlug,
  saveRSVPResponse,
  upsertGuestForPublicRsvp
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

function clampText(value: string | undefined, maxLength: number) {
  return value?.trim().slice(0, maxLength) || undefined;
}

function sanitizeCustomAnswers(value: Record<string, string> | undefined) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const entries = Object.entries(value)
    .slice(0, 20)
    .map(([key, answer]) => [key.trim().slice(0, 80), String(answer).trim().slice(0, 500)] as const)
    .filter(([key, answer]) => key && answer);

  return entries.length ? Object.fromEntries(entries) : undefined;
}

export async function POST(request: Request, context: Context) {
  const { slug } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

  const body = (await request.json()) as {
    name?: string;
    household?: string;
    email?: string;
    phone?: string;
    status?: "pending" | "attending" | "declined";
    attendingCount?: number;
    meal?: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
    dietary?: string;
    songRequest?: string;
    messageToCouple?: string;
    customAnswers?: Record<string, string>;
  };

  const name = clampText(body.name, 120);
  const household = clampText(body.household, 120) || name;
  const email = clampText(body.email, 160);

  if (!name) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }

  const guest = await upsertGuestForPublicRsvp({
    weddingId: wedding.id,
    invitationName: name,
    householdKey: household,
    email,
    phone: clampText(body.phone, 40),
    side: "friends",
    defaultMeal: body.meal ?? "beef",
    dietaryNotes: clampText(body.dietary, 1000)
  });

  const response = await saveRSVPResponse({
    weddingId: wedding.id,
    guestId: guest.id,
    status: body.status ?? "pending",
    attendingCount:
      body.status === "declined" ? 0 : Math.max(1, Number(body.attendingCount) || 1),
    mealChoice: body.meal ?? "beef",
    dietaryNotes: clampText(body.dietary, 1000),
    songRequest: clampText(body.songRequest, 200),
    messageToCouple: clampText(body.messageToCouple, 2000),
    customAnswersJson: sanitizeCustomAnswers(body.customAnswers)
  });

  return NextResponse.json({
    id: guest.id,
    name: guest.invitationName,
    household: guest.householdKey ?? "Guest List",
    status: response.status,
    side: guest.side,
    meal: response.mealChoice ?? guest.defaultMeal ?? "custom",
    dietary: response.dietaryNotes ?? guest.dietaryNotes ?? "",
    partySize: response.attendingCount,
    note: guest.notes ?? "",
    songRequest: response.songRequest ?? "",
    messageToCouple: response.messageToCouple ?? "",
    customAnswers: (response.customAnswersJson as Record<string, string> | null | undefined) ?? {}
  });
}
