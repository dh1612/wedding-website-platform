import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getWeddingData } from "@/lib/wedding-data";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listWeddings(input?: {
  query?: string;
  status?: "draft" | "approved" | "live" | "all";
}) {
  const query = input?.query?.trim();
  const where: Prisma.WeddingWhereInput = {
    ...(input?.status && input.status !== "all" ? { status: input.status } : {}),
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { slug: { contains: query, mode: "insensitive" } }
          ]
        }
      : {})
  };

  return prisma.wedding.findMany({
    where,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      eventDate: true,
      createdAt: true,
      publishedAt: true,
      plannerSettingsJson: true,
      _count: {
        select: {
          guests: true,
          rsvpResponses: true,
          seatingPlans: true
        }
      }
    }
  });
}

export async function getWeddingBySlug(slug: string) {
  return prisma.wedding.findUnique({
    where: { slug },
    include: {
      guests: true,
      rsvpResponses: true,
      seatingPlans: {
        include: {
          tables: {
            include: {
              seatAssignments: true
            }
          }
        }
      }
    }
  });
}

export async function getWeddingSiteBySlug(slug: string) {
  return prisma.wedding.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      eventDate: true,
      timezone: true,
      contentJson: true,
      liveContentJson: true,
      plannerSettingsJson: true
    }
  });
}

export async function getWeddingRecordForAdmin(slug: string) {
  return prisma.wedding.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      eventDate: true,
      timezone: true,
      contentJson: true,
      liveContentJson: true,
      plannerSettingsJson: true,
      publishedAt: true,
      adminUsers: {
        orderBy: {
          createdAt: "asc"
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true
        }
      }
    }
  });
}

export async function getWeddingPortalUserBySlug(slug: string) {
  const wedding = await prisma.wedding.findUnique({
    where: { slug },
    select: {
      id: true,
      adminUsers: {
        orderBy: {
          createdAt: "asc"
        },
        take: 1,
        select: {
          id: true,
          email: true,
          passwordHash: true,
          role: true
        }
      }
    }
  });

  return {
    weddingId: wedding?.id ?? null,
    user: wedding?.adminUsers[0] ?? null
  };
}

export async function createWeddingDraft(input: {
  slug: string;
  title: string;
  eventDate?: Date;
  timezone?: string;
  contentJson?: unknown;
  liveContentJson?: unknown;
  plannerSettingsJson?: unknown;
  status?: "draft" | "approved" | "live";
}) {
  return prisma.wedding.create({
    data: {
      slug: input.slug,
      title: input.title,
      eventDate: input.eventDate,
      timezone: input.timezone ?? "Europe/Dublin",
      status: input.status,
      contentJson: input.contentJson as Prisma.InputJsonValue | undefined,
      liveContentJson: input.liveContentJson as Prisma.InputJsonValue | undefined,
      plannerSettingsJson:
        input.plannerSettingsJson as Prisma.InputJsonValue | undefined
    }
  });
}

export async function updateWeddingStatus(input: {
  slug: string;
  status: "draft" | "approved" | "live";
}) {
  const wedding = await prisma.wedding.findUnique({
    where: { slug: input.slug },
    select: {
      contentJson: true,
      publishedAt: true
    }
  });

  return prisma.wedding.update({
    where: { slug: input.slug },
    data: {
      status: input.status,
      ...(input.status === "live"
        ? {
            liveContentJson: wedding?.contentJson as Prisma.InputJsonValue | undefined,
            publishedAt: wedding?.publishedAt ?? new Date()
          }
        : {})
    }
  });
}

export async function updateWeddingAccessState(input: {
  slug: string;
  status?: "draft" | "approved" | "live";
  websiteUnlocked?: boolean;
  portalUnlocked?: boolean;
  unlockRequestedAt?: string | null;
  paymentStatus?: "unpaid" | "payment_requested" | "paid";
  paymentRequestedAt?: string | null;
  paymentCompletedAt?: string | null;
}) {
  const wedding = await prisma.wedding.findUnique({
    where: { slug: input.slug },
    select: {
      contentJson: true,
      publishedAt: true,
      plannerSettingsJson: true
    }
  });

  const plannerSettings = (wedding?.plannerSettingsJson ?? {}) as Record<string, unknown>;
  const nextPlannerSettings = {
    ...plannerSettings,
    ...(typeof input.websiteUnlocked === "boolean"
      ? { websiteUnlocked: input.websiteUnlocked }
      : {}),
    ...(typeof input.portalUnlocked === "boolean"
      ? { portalUnlocked: input.portalUnlocked }
      : {}),
    ...(typeof input.unlockRequestedAt !== "undefined"
      ? { unlockRequestedAt: input.unlockRequestedAt }
      : {}),
    ...(typeof input.paymentStatus !== "undefined"
      ? { paymentStatus: input.paymentStatus }
      : {}),
    ...(typeof input.paymentRequestedAt !== "undefined"
      ? { paymentRequestedAt: input.paymentRequestedAt }
      : {}),
    ...(typeof input.paymentCompletedAt !== "undefined"
      ? { paymentCompletedAt: input.paymentCompletedAt }
      : {})
  };

  return prisma.wedding.update({
    where: { slug: input.slug },
    data: {
      ...(input.status ? { status: input.status } : {}),
      plannerSettingsJson: nextPlannerSettings as Prisma.InputJsonValue,
      ...(input.status === "live"
        ? {
            liveContentJson: wedding?.contentJson as Prisma.InputJsonValue | undefined,
            publishedAt: wedding?.publishedAt ?? new Date()
          }
        : {})
    }
  });
}

export async function updateWeddingBySlug(input: {
  currentSlug: string;
  slug: string;
  title: string;
  eventDate?: Date;
  contentJson?: unknown;
  liveContentJson?: unknown;
  plannerSettingsJson?: unknown;
  status?: "draft" | "approved" | "live";
}) {
  return prisma.wedding.update({
    where: { slug: input.currentSlug },
    data: {
      slug: input.slug,
      title: input.title,
      eventDate: input.eventDate,
      contentJson: input.contentJson as Prisma.InputJsonValue | undefined,
      ...(typeof input.liveContentJson !== "undefined"
        ? { liveContentJson: input.liveContentJson as Prisma.InputJsonValue | undefined }
        : {}),
      plannerSettingsJson:
        input.plannerSettingsJson as Prisma.InputJsonValue | undefined,
      status: input.status
    }
  });
}

export async function upsertWeddingPortalUser(input: {
  weddingId: string;
  email: string;
  passwordHash?: string;
}) {
  const existing = await prisma.weddingAdminUser.findFirst({
    where: { weddingId: input.weddingId },
    select: { id: true }
  });

  if (!existing) {
    if (!input.passwordHash) {
      return null;
    }

    return prisma.weddingAdminUser.create({
      data: {
        weddingId: input.weddingId,
        email: input.email,
        passwordHash: input.passwordHash,
        role: "owner"
      }
    });
  }

  return prisma.weddingAdminUser.update({
    where: { id: existing.id },
    data: {
      email: input.email,
      ...(input.passwordHash ? { passwordHash: input.passwordHash } : {})
    }
  });
}

export async function deleteWeddingDraftBySlug(slug: string) {
  const wedding = await prisma.wedding.findUnique({
    where: { slug },
    select: {
      id: true,
      status: true
    }
  });

  if (!wedding || wedding.status !== "draft") {
    return false;
  }

  await prisma.wedding.delete({
    where: { id: wedding.id }
  });

  return true;
}

export async function ensurePortalWedding() {
  const weddingData = getWeddingData();
  const slug = `${slugify(weddingData.couple)}-portal`;
  const eventDate = new Date(weddingData.date);

  let wedding = await prisma.wedding.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      eventDate: true
    }
  });

  if (!wedding) {
    wedding = await prisma.wedding.create({
      data: {
        slug,
        title: `${weddingData.couple} Wedding`,
        eventDate: Number.isNaN(eventDate.getTime()) ? undefined : eventDate,
        contentJson: weddingData as Prisma.InputJsonValue
      },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        eventDate: true
      }
    });
  }

  return wedding;
}

export async function createGuest(input: {
  weddingId: string;
  invitationName: string;
  householdKey?: string;
  email?: string;
  phone?: string;
  side?: "bride" | "groom" | "friends" | "family" | "work" | "other";
  defaultMeal?: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
  dietaryNotes?: string;
  plusOneAllowed?: boolean;
  notes?: string;
}) {
  return prisma.guest.create({
    data: {
      weddingId: input.weddingId,
      invitationName: input.invitationName,
      householdKey: input.householdKey,
      email: input.email,
      phone: input.phone,
      side: input.side ?? "other",
      defaultMeal: input.defaultMeal,
      dietaryNotes: input.dietaryNotes,
      plusOneAllowed: input.plusOneAllowed ?? false,
      notes: input.notes
    }
  });
}

export async function findMatchingGuestForPublicRsvp(input: {
  weddingId: string;
  invitationName: string;
  householdKey?: string;
  email?: string;
}) {
  const email = input.email?.trim().toLowerCase();
  const invitationName = input.invitationName.trim();
  const householdKey = input.householdKey?.trim();

  if (email) {
    const byEmail = await prisma.guest.findFirst({
      where: {
        weddingId: input.weddingId,
        email: {
          equals: email,
          mode: "insensitive"
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    if (byEmail) {
      return byEmail;
    }
  }

  return prisma.guest.findFirst({
    where: {
      weddingId: input.weddingId,
      invitationName,
      ...(householdKey ? { householdKey } : {})
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
}

export async function upsertGuestForPublicRsvp(input: {
  weddingId: string;
  invitationName: string;
  householdKey?: string;
  email?: string;
  phone?: string;
  side?: "bride" | "groom" | "friends" | "family" | "work" | "other";
  defaultMeal?: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
  dietaryNotes?: string;
}) {
  const existing = await findMatchingGuestForPublicRsvp(input);

  if (!existing) {
    return createGuest(input);
  }

  return prisma.guest.update({
    where: { id: existing.id },
    data: {
      invitationName: input.invitationName,
      householdKey: input.householdKey,
      email: input.email,
      phone: input.phone,
      side: input.side ?? existing.side,
      defaultMeal: input.defaultMeal,
      dietaryNotes: input.dietaryNotes
    }
  });
}

export async function saveRSVPResponse(input: {
  weddingId: string;
  guestId: string;
  status: "pending" | "attending" | "declined";
  attendingCount?: number;
  mealChoice?: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
  dietaryNotes?: string;
  songRequest?: string;
  messageToCouple?: string;
  customAnswersJson?: unknown;
}) {
  return prisma.rSVPResponse.upsert({
    where: {
      weddingId_guestId: {
        weddingId: input.weddingId,
        guestId: input.guestId
      }
    },
    update: {
      status: input.status,
      attendingCount: input.attendingCount ?? 1,
      mealChoice: input.mealChoice,
      dietaryNotes: input.dietaryNotes,
      songRequest: input.songRequest,
      messageToCouple: input.messageToCouple,
      customAnswersJson: input.customAnswersJson as Prisma.InputJsonValue | undefined
    },
    create: {
      weddingId: input.weddingId,
      guestId: input.guestId,
      status: input.status,
      attendingCount: input.attendingCount ?? 1,
      mealChoice: input.mealChoice,
      dietaryNotes: input.dietaryNotes,
      songRequest: input.songRequest,
      messageToCouple: input.messageToCouple,
      customAnswersJson: input.customAnswersJson as Prisma.InputJsonValue | undefined
    }
  });
}

export async function createSeatingPlan(input: {
  weddingId: string;
  name: string;
  roomLabel?: string;
  isDefault?: boolean;
}) {
  return prisma.seatingPlan.create({
    data: {
      weddingId: input.weddingId,
      name: input.name,
      roomLabel: input.roomLabel,
      isDefault: input.isDefault ?? false
    }
  });
}

export async function listChecklistItems(weddingId: string) {
  return prisma.checklistItem.findMany({
    where: { weddingId },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }]
  });
}

export async function createChecklistItem(input: {
  weddingId: string;
  title: string;
  category: string;
  notes?: string;
  dueDate?: Date;
  sortOrder?: number;
}) {
  return prisma.checklistItem.create({
    data: {
      weddingId: input.weddingId,
      title: input.title,
      category: input.category,
      notes: input.notes,
      dueDate: input.dueDate,
      sortOrder: input.sortOrder ?? 0
    }
  });
}

export async function updateChecklistItem(input: {
  id: string;
  title?: string;
  category?: string;
  completed?: boolean;
  notes?: string | null;
  dueDate?: Date | null;
  sortOrder?: number;
}) {
  return prisma.checklistItem.update({
    where: { id: input.id },
    data: {
      title: input.title,
      category: input.category,
      completed: input.completed,
      notes: input.notes,
      dueDate: input.dueDate,
      sortOrder: input.sortOrder
    }
  });
}

export async function deleteChecklistItem(id: string) {
  return prisma.checklistItem.delete({
    where: { id }
  });
}

export async function listCalendarItems(weddingId: string) {
  return prisma.calendarItem.findMany({
    where: { weddingId },
    orderBy: [{ startDate: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }]
  });
}

export async function createCalendarItem(input: {
  weddingId: string;
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
  sortOrder?: number;
}) {
  return prisma.calendarItem.create({
    data: {
      weddingId: input.weddingId,
      title: input.title,
      category: input.category,
      startDate: input.startDate,
      endDate: input.endDate,
      notes: input.notes,
      sortOrder: input.sortOrder ?? 0
    }
  });
}

export async function updateCalendarItem(input: {
  id: string;
  title?: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  notes?: string | null;
  sortOrder?: number;
}) {
  return prisma.calendarItem.update({
    where: { id: input.id },
    data: {
      title: input.title,
      category: input.category,
      startDate: input.startDate,
      endDate: input.endDate,
      notes: input.notes,
      sortOrder: input.sortOrder
    }
  });
}

export async function deleteCalendarItem(id: string) {
  return prisma.calendarItem.delete({
    where: { id }
  });
}

export async function listPortalGuests(weddingId: string) {
  const guests = await prisma.guest.findMany({
    where: { weddingId },
    orderBy: [{ householdKey: "asc" }, { invitationName: "asc" }],
    include: {
      rsvpResponses: {
        where: { weddingId },
        take: 1,
        orderBy: { submittedAt: "desc" }
      }
    }
  });

  return guests.map((guest) => {
    const response = guest.rsvpResponses[0];

    return {
      id: guest.id,
      name: guest.invitationName,
      household: guest.householdKey ?? "Guest List",
      email: guest.email ?? "",
      status: response?.status ?? "pending",
      side: guest.side,
      meal: response?.mealChoice ?? guest.defaultMeal ?? "custom",
      dietary: response?.dietaryNotes ?? guest.dietaryNotes ?? "",
      partySize: response?.attendingCount ?? 1,
      note: guest.notes ?? "",
      songRequest: response?.songRequest ?? "",
      messageToCouple: response?.messageToCouple ?? "",
      customAnswers:
        (response?.customAnswersJson as Record<string, string> | null | undefined) ?? {}
    };
  });
}

export async function deleteGuest(id: string) {
  return prisma.guest.delete({
    where: { id }
  });
}

export async function deleteGuestForWedding(input: {
  id: string;
  weddingId: string;
}) {
  const guest = await prisma.guest.findFirst({
    where: {
      id: input.id,
      weddingId: input.weddingId
    },
    select: { id: true }
  });

  if (!guest) {
    return null;
  }

  await prisma.guest.delete({
    where: { id: guest.id }
  });

  return guest;
}

export async function updateChecklistItemForWedding(input: {
  id: string;
  weddingId: string;
  title?: string;
  category?: string;
  completed?: boolean;
  notes?: string | null;
  dueDate?: Date | null;
  sortOrder?: number;
}) {
  const existing = await prisma.checklistItem.findFirst({
    where: {
      id: input.id,
      weddingId: input.weddingId
    },
    select: { id: true }
  });

  if (!existing) {
    return null;
  }

  return prisma.checklistItem.update({
    where: { id: existing.id },
    data: {
      title: input.title,
      category: input.category,
      completed: input.completed,
      notes: input.notes,
      dueDate: input.dueDate,
      sortOrder: input.sortOrder
    }
  });
}

export async function deleteChecklistItemForWedding(input: {
  id: string;
  weddingId: string;
}) {
  const existing = await prisma.checklistItem.findFirst({
    where: {
      id: input.id,
      weddingId: input.weddingId
    },
    select: { id: true }
  });

  if (!existing) {
    return null;
  }

  await prisma.checklistItem.delete({
    where: { id: existing.id }
  });

  return existing;
}

export async function updateCalendarItemForWedding(input: {
  id: string;
  weddingId: string;
  title?: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  notes?: string | null;
  sortOrder?: number;
}) {
  const existing = await prisma.calendarItem.findFirst({
    where: {
      id: input.id,
      weddingId: input.weddingId
    },
    select: { id: true }
  });

  if (!existing) {
    return null;
  }

  return prisma.calendarItem.update({
    where: { id: existing.id },
    data: {
      title: input.title,
      category: input.category,
      startDate: input.startDate,
      endDate: input.endDate,
      notes: input.notes,
      sortOrder: input.sortOrder
    }
  });
}

export async function deleteCalendarItemForWedding(input: {
  id: string;
  weddingId: string;
}) {
  const existing = await prisma.calendarItem.findFirst({
    where: {
      id: input.id,
      weddingId: input.weddingId
    },
    select: { id: true }
  });

  if (!existing) {
    return null;
  }

  await prisma.calendarItem.delete({
    where: { id: existing.id }
  });

  return existing;
}
