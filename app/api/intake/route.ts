import { NextResponse } from "next/server";
import {
  buildWeddingDataFromIntake,
  buildWeddingSlug,
  type IntakeSubmission
} from "@/lib/intake";
import { createWeddingDraft } from "@/lib/production-repositories";

export async function POST(request: Request) {
  const submission = (await request.json()) as IntakeSubmission;

  if (!submission.couple?.trim() || !submission.email?.trim() || !submission.date?.trim()) {
    return NextResponse.json(
      { error: "Couple, contact email, and date are required." },
      { status: 400 }
    );
  }

  const weddingData = await buildWeddingDataFromIntake(submission);
  const slug = buildWeddingSlug(submission.couple, submission.date);

  const created = await createWeddingDraft({
    slug,
    title: `${submission.couple} Wedding`,
    eventDate: new Date(submission.date),
    contentJson: weddingData,
    plannerSettingsJson: {
      packageTier: submission.packageTier,
      intake: submission
    },
    status: "draft"
  });

  return NextResponse.json({
    id: created.id,
    slug: created.slug,
    status: created.status,
    previewUrl: `/preview/${created.slug}`,
    liveUrl: `/site/${created.slug}`,
    message: "Your wedding site is being prepared."
  });
}
