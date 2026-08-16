import type { MapSpot, StoryTimelineItem, TravelVisualMapNode, WeddingData } from "@/types/wedding";

const JO_AND_MICHAEL_SLUG = "jo-and-michael";
const JO_AND_MICHAEL_IMAGE = "/jo-and-michael-met.jpeg";
const JO_AND_MICHAEL_MAP_IMAGE = "/jo-and-mike-weekend-map-day1.svg";
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
    label: "Wine & Pizza",
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
      label: "Day 1",
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

export function applyJoAndMichaelPreviewOverrides(slug: string, weddingData: WeddingData): WeddingData {
  if (slug !== JO_AND_MICHAEL_SLUG) {
    return weddingData;
  }

  const nextTimeline = (weddingData.story.timeline ?? []).map(normaliseTimelineItem);
  const nextMapSpots = (weddingData.travel.mapSpots ?? []).map(normaliseMapSpot);
  const nextVisualMapNodes = weddingData.travel.visualMap?.nodes?.map((node) =>
    normaliseDayOneNode(normaliseAgiaMarinaNode(node))
  );
  const nextSchedule: WeddingData["schedule"] = [
    {
      time: "",
      title: "Day 1",
      details: `Wine and pizza at ${DAY_ONE_VENUE_NAME}. Final timings will be shared once everything is confirmed.`
    },
    {
      time: "",
      title: "Day 2",
      details: "The ceremony and reception will both take place at Sea View for the main wedding day."
    },
    {
      time: "",
      title: "Day 3",
      details: "The final day will be at our villa. Full details will follow in due course."
    }
  ];

  return {
    ...weddingData,
    heroImage: JO_AND_MICHAEL_IMAGE,
    hero: {
      eyebrow: "Wedding in Greece",
      previewNote:
        weddingData.hero?.previewNote ??
        "This first draft is here to show the direction of your website. Final wording and guest-facing details will be refined before anything goes live.",
      primaryActionLabel: weddingData.hero?.primaryActionLabel ?? "RSVP Details",
      primaryActionHref: weddingData.hero?.primaryActionHref ?? "#rsvp",
      secondaryActionLabel: weddingData.hero?.secondaryActionLabel ?? "Wedding Details",
      secondaryActionHref: weddingData.hero?.secondaryActionHref ?? "#faq"
    },
    schedule: nextSchedule,
    scheduleNote: `Day 1 plans are for wine and pizza at ${DAY_ONE_VENUE_NAME}. Final timings can stay light here until the couple is ready to confirm them.`,
    styleOptions: {
      ...weddingData.styleOptions,
      heroImageObjectPosition: "center 22%",
      heroImageBrightness: 1.38,
      heroImageOverlayOpacity: 0.04,
      storyTimelineStacked: true
    },
    story: {
      ...weddingData.story,
      timeline: nextTimeline
    },
    travel: {
      ...weddingData.travel,
      mapImage: JO_AND_MICHAEL_MAP_IMAGE,
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
