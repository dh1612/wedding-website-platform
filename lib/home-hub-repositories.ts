import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { rosebankData } from "@/lib/rosebank-data";

export async function getOrCreateHomeHub(slug: string, title: string, fallbackContent: unknown) {
  let hub = await prisma.homeHub.findUnique({
    where: { slug }
  });

  const contentJson = fallbackContent as Prisma.InputJsonValue;

  if (!hub) {
    hub = await prisma.homeHub.create({
      data: {
        slug,
        title,
        contentJson
      }
    });
  }

  return hub;
}

export async function getRosebankHomeHub() {
  return getOrCreateHomeHub("rosebank", rosebankData.projectName, rosebankData);
}

export async function updateHomeHubContent(slug: string, contentJson: unknown) {
  return prisma.homeHub.update({
    where: { slug },
    data: {
      contentJson: contentJson as Prisma.InputJsonValue
    }
  });
}
