import type { MapSpot, StoryTimelineItem, TravelVisualMapNode, WeddingData } from "@/types/wedding";

const JO_AND_MICHAEL_SLUG = "jo-and-michael";
const JO_AND_MICHAEL_IMAGE = "/jo-and-michael-met.jpeg";
const DAY_ONE_VENUE_URL = "https://www.instagram.com/mulino_veneziano";
const DAY_ONE_VENUE_NAME = "Mulino Veneziano";

function normaliseAgiaMarinaNode(node: TravelVisualMapNode): TravelVisualMapNode {
  if (!/agia marina/i.test(node.label)) {
    return node;
  }

  const detailText = (node.detail ?? "").replace(/^(stay base|day\s+\d+|airport)\s*[:\-]\s*/i, "").trim();

  return {
    ...node,
    detail: detailText ? `Stay Base: ${detailText}` : "Stay Base: Agia Marina"
  };
}

function normaliseDayOneNode(node: TravelVisualMapNode): TravelVisualMapNode {
  if (!/day\s*1|welcome/i.test(node.label)) {
    return node;
  }

  return {
    ...node,
    detail: `Day 1: Wine and pizza at ${DAY_ONE_VENUE_NAME}`
  };
}

function normaliseMapSpot(spot: MapSpot): MapSpot {
  if (/agia marina/i.test(spot.label)) {
    const detailText = spot.detail.replace(/^(stay base|day\s+\d+|airport)\s*[:\-]\s*/i, "").trim();

    return {
      ...spot,
      detail: detailText ? `Stay Base: ${detailText}` : "Stay Base"
    };
  }

  if (/day\s*1|welcome/i.test(spot.label)) {
    return {
      ...spot,
      detail: `Wine and pizza at ${DAY_ONE_VENUE_NAME}.`,
      href: DAY_ONE_VENUE_URL
    };
  }

  return spot;
}

function normaliseTimelineItem(item: StoryTimelineItem, index: number): StoryTimelineItem {
  const updated: StoryTimelineItem = {
    ...item,
    note: undefined
  };

  if (/we met/i.test(item.title) || index === 0) {
    updated.image = JO_AND_MICHAEL_IMAGE;
  }

  return updated;
}

function normaliseScheduleItem(item: WeddingData["schedule"][number]): WeddingData["schedule"][number] {
  if (!/day\s*1|welcome|wine|pizza/i.test(`${item.title} ${item.details}`)) {
    return item;
  }

  return {
    ...item,
    details: `Wine and pizza at ${DAY_ONE_VENUE_NAME}. Final timings will be shared once everything is confirmed.`,
    time: item.time
  };
}

export function applyJoAndMichaelPreviewOverrides(slug: string, weddingData: WeddingData): WeddingData {
  if (slug !== JO_AND_MICHAEL_SLUG) {
    return weddingData;
  }

  const nextTimeline = (weddingData.story.timeline ?? []).map(normaliseTimelineItem);
  const nextMapSpots = (weddingData.travel.mapSpots ?? []).map(normaliseMapSpot);
  const nextSchedule = (weddingData.schedule ?? []).map(normaliseScheduleItem);
  const nextVisualMapNodes = weddingData.travel.visualMap?.nodes?.map((node) =>
    normaliseDayOneNode(normaliseAgiaMarinaNode(node))
  );

  return {
    ...weddingData,
    heroImage: JO_AND_MICHAEL_IMAGE,
    schedule: nextSchedule,
    scheduleNote:
      weddingData.scheduleNote?.trim() ||
      `Day 1 plans are for wine and pizza at ${DAY_ONE_VENUE_NAME}. Final timings can stay light here until the couple is ready to confirm them.`,
    styleOptions: {
      ...weddingData.styleOptions,
      heroImageObjectPosition: "center 22%",
      heroImageBrightness: 1.02,
      storyTimelineStacked: true
    },
    story: {
      ...weddingData.story,
      timeline: nextTimeline
    },
    travel: {
      ...weddingData.travel,
      mapSpots: nextMapSpots,
      visualMap: weddingData.travel.visualMap
        ? {
            ...weddingData.travel.visualMap,
            nodes: nextVisualMapNodes ?? weddingData.travel.visualMap.nodes
          }
        : weddingData.travel.visualMap
    }
  };
}
