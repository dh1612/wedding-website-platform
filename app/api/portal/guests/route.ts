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
    status?: "pending" | "attending" | "declined";
    meal?: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
    dietary?: string;
  };

  const name = body.name?.trim();
  const household = body.household?.trim();

  if (!name || !household) {
    return NextResponse.json(
      { error: "Name and household are required." },
      { status: 400 }
    );
  }

  const wedding = await ensurePortalWedding();
  const guest = await createGuest({
    weddingId: wedding.id,
    invitationName: name,
    householdKey: household,
    side: "friends",
    defaultMeal: body.meal ?? "beef",
    dietaryNotes: body.dietary?.trim() || undefined
  });

  const response = await saveRSVPResponse({
    weddingId: wedding.id,
    guestId: guest.id,
    status: body.status ?? "pending",
    attendingCount: body.status === "attending" ? 1 : 1,
    mealChoice: body.meal ?? "beef",
    dietaryNotes: body.dietary?.trim() || undefined
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
    note: guest.notes ?? ""
  });
}
