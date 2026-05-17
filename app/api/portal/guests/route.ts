import { NextResponse } from "next/server";
import {
  createGuest,
  ensurePortalWedding,
  saveRSVPResponse
} from "@/lib/production-repositories";

export async function POST(request: Request) {
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

  const name = body.name?.trim();
  const household = body.household?.trim() || name;
  const email = body.email?.trim() || undefined;

  if (!name) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }

  const wedding = await ensurePortalWedding();
  const guest = await createGuest({
    weddingId: wedding.id,
    invitationName: name,
    householdKey: household,
    email,
    phone: body.phone?.trim() || undefined,
    side: "friends",
    defaultMeal: body.meal ?? "beef",
    dietaryNotes: body.dietary?.trim() || undefined
  });

  const response = await saveRSVPResponse({
    weddingId: wedding.id,
    guestId: guest.id,
    status: body.status ?? "pending",
    attendingCount:
      body.status === "declined" ? 0 : Math.max(1, Number(body.attendingCount) || 1),
    mealChoice: body.meal ?? "beef",
    dietaryNotes: body.dietary?.trim() || undefined,
    songRequest: body.songRequest?.trim() || undefined,
    messageToCouple: body.messageToCouple?.trim() || undefined,
    customAnswersJson: body.customAnswers
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
