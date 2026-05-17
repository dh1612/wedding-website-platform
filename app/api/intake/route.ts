import { NextResponse } from "next/server";
import {
  buildWeddingDataFromIntake,
  buildWeddingSlug,
  type IntakeSubmission
} from "@/lib/intake";
import { sendIntakeConfirmationEmail } from "@/lib/intake-email";
import { createWeddingDraft } from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";

function stripUndefined<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getReadableErrorMessage(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unknown server error";

  if (!process.env.DATABASE_URL) {
    return "The live database is not connected yet. Please check the Vercel environment variables.";
  }

  if (message.includes("Can't reach database server")) {
    return "The live site cannot reach the database server yet. The Vercel database connection still needs to be updated.";
  }

  if (
    message.includes("Environment variable not found") ||
    message.includes("DATABASE_URL")
  ) {
    return "The database connection setting is missing from Vercel.";
  }

  if (message.includes("Invalid `prisma")) {
    return `The database save step failed on the live server: ${message}`;
  }

  return `We could not save your details just yet. Server said: ${message}`;
}

export async function POST(request: Request) {
  const submission = stripUndefined((await request.json()) as IntakeSubmission);

  if (!submission.couple?.trim() || !submission.email?.trim() || !submission.date?.trim()) {
    return NextResponse.json(
      { error: "Couple, contact email, and date are required." },
      { status: 400 }
    );
  }

  try {
    const weddingData = await buildWeddingDataFromIntake(submission);
    const slug = buildWeddingSlug(submission.couple, submission.date);
    const previewPath = `/preview/${slug}`;

    const created = await createWeddingDraft({
      slug,
      title: `${submission.couple} Wedding`,
      eventDate: new Date(submission.date),
      contentJson: stripUndefined(weddingData),
      plannerSettingsJson: stripUndefined({
        packageTier: submission.packageTier,
        websiteUnlocked: false,
        portalUnlocked: false,
        unlockRequestedAt: null,
        paymentStatus: "unpaid",
        paymentRequestedAt: null,
        paymentCompletedAt: null,
        intake: submission
      }),
      status: "draft"
    });

    const requestUrl = new URL(request.url);
    const previewUrl = new URL(previewPath, requestUrl.origin).toString();
    const styleName = getThemeById(weddingData.theme).name;

    try {
      await sendIntakeConfirmationEmail({
        to: submission.email.trim(),
        couple: submission.couple.trim(),
        packageTier: submission.packageTier,
        previewUrl,
        styleName
      });
    } catch (emailError) {
      console.error("Intake confirmation email failed", emailError);
    }

    return NextResponse.json({
      id: created.id,
      slug: created.slug,
      status: created.status,
      previewUrl: previewPath,
      liveUrl: `/site/${created.slug}`,
      message:
        "Thank you. Your details are in and the first version is now being prepared. A private review link will be shared once it has been checked."
    });
  } catch (error) {
    console.error("Intake submission failed", error);
    return NextResponse.json(
      {
        error: getReadableErrorMessage(error)
      },
      { status: 500 }
    );
  }
}
