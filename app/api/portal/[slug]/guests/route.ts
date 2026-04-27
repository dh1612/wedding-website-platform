import { NextResponse } from "next/server";
import {
  createGuest,
  getWeddingSiteBySlug,
  saveRSVPResponse
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

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
  };

  const name = body.name?.trim();
  const household = body.household?.trim() || name;

  if (!name || !body.email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const guest = await createGuest({
    weddingId: wedding.id,
    invitationName: name,
    householdKey: household,
    email: body.email.trim(),
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
    messageToCouple: body.messageToCouple?.trim() || undefined
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
