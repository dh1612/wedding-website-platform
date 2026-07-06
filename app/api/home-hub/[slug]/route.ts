import { NextResponse } from "next/server";
import { getOrCreateHomeHub, updateHomeHubContent } from "@/lib/home-hub-repositories";
import { rosebankData } from "@/lib/rosebank-data";

function isAuthorized(request: Request) {
  const expectedKey = process.env.ROSEBANK_ACCESS_KEY?.trim();

  if (!expectedKey) {
    return true;
  }

  const providedKey = request.headers.get("x-home-hub-key")?.trim();
  return providedKey === expectedKey;
}

export async function GET(_request: Request, context: { params: Promise<unknown> }) {
  const { slug } = (await context.params) as { slug: string };

  if (slug !== "rosebank") {
    return NextResponse.json({ error: "Home hub not found." }, { status: 404 });
  }

  const hub = await getOrCreateHomeHub(slug, rosebankData.projectName, rosebankData);
  return NextResponse.json({
    slug: hub.slug,
    title: hub.title,
    contentJson: hub.contentJson ?? rosebankData
  });
}

export async function PUT(request: Request, context: { params: Promise<unknown> }) {
  const { slug } = (await context.params) as { slug: string };

  if (slug !== "rosebank") {
    return NextResponse.json({ error: "Home hub not found." }, { status: 404 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    contentJson?: unknown;
  };

  if (!body.contentJson) {
    return NextResponse.json({ error: "contentJson is required." }, { status: 400 });
  }

  const hub = await updateHomeHubContent(slug, body.contentJson);
  return NextResponse.json({
    slug: hub.slug,
    updatedAt: hub.updatedAt
  });
}
