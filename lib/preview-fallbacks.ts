import { getThemeById } from "@/lib/themes";
import type {
  AccommodationItem,
  FAQItem,
  ScheduleItem,
  WeddingData
} from "@/types/wedding";

type PreviewFallbackContent = {
  heroTagline: string;
  heroAnnouncement: string;
  storyParagraphs: string[];
  storyImages: string[];
  travelDescription: string;
  travelLocationOverviewTitle: string;
  travelLocationOverviewText: string;
  travelMapUtilityTitle: string;
  travelMapUtilityDescription: string;
  ceremony: {
    location: string;
    time: string;
    address: string;
    description: string;
  };
  reception: {
    location: string;
    time: string;
    address: string;
    description: string;
  };
  transport: string;
  parking: string;
  directions: string;
  mapSpots: Array<{ label: string; detail: string; href?: string }>;
  accommodationDescription: string;
  accommodation: AccommodationItem[];
  scheduleDescription: string;
  scheduleNote: string;
  schedule: ScheduleItem[];
  faq: FAQItem[];
  rsvpDescription: string;
  rsvpPanelDescription: string;
};

const sharedFaq: FAQItem[] = [
  {
    q: "Can details still change before the website goes live?",
    a: "Yes. The preview is a private first draft, so timings, wording, sections, and guest information can all be refined before the final version is shared."
  },
  {
    q: "What if we only have a few details so far?",
    a: "That is absolutely fine. The first version is shaped to show the look and structure of the website, then the fuller guest-facing details are added later."
  },
  {
    q: "Can travel, stay, and RSVP information be tailored later?",
    a: "Yes. Guest logistics, RSVP wording, and any extra planning notes are refined once the couple decides to move forward."
  }
];

function withThemeImages(themeId: string, content: Omit<PreviewFallbackContent, "storyImages">) {
  const theme = getThemeById(themeId);
  const storyImages = [theme.heroImage, theme.detailImage ?? theme.heroImage].filter(
    (value, index, items) => Boolean(value) && items.indexOf(value) === index
  );

  return {
    ...content,
    storyImages
  };
}

export function getPreviewFallbackContent(
  themeId: string,
  wedding?: Pick<WeddingData, "couple" | "date" | "locationSummary">
): PreviewFallbackContent {
  const coupleName = wedding?.couple?.trim() || "Your Wedding";
  const location = wedding?.locationSummary?.trim() || "the wedding location";

  switch (themeId) {
    case "champagne-aegean":
      return withThemeImages(themeId, {
        heroTagline:
          "A sun-washed celebration shaped around warm light, guest ease, and the feeling of a destination weekend.",
        heroAnnouncement:
          "This first preview shows how the website can hold ceremony plans, travel guidance, and the overall rhythm of the celebration before every detail is fully confirmed.",
        storyParagraphs: [
          `${coupleName} has the kind of celebration that wants to feel easy, elegant, and generous to guests from the first moment they arrive.`,
          "In the finished version, this area can carry the tone of the wedding weekend properly: a little atmosphere, a little personality, and the practical details guests actually need."
        ],
        travelDescription:
          "A destination-style website works best when the travel section feels calm and useful. Flights, transfers, local notes, and venue guidance can all live here cleanly.",
        travelLocationOverviewTitle: "What guests will want to know first",
        travelLocationOverviewText:
          "This section can bring together the ceremony setting, reception location, local transport, and a few reassuring pointers for anyone travelling in for the wedding.",
        travelMapUtilityTitle: "A simple guide to the weekend locations",
        travelMapUtilityDescription:
          "Maps, local landmarks, and arrival notes can sit here so guests immediately understand where they are going and how the day flows.",
        ceremony: {
          location: "Ceremony setting to be confirmed",
          time: "A ceremony time can sit here once finalised",
          address: "Venue name, area, and map link can all be added here.",
          description:
            "This card becomes the clean guest-facing reference point for the ceremony once the final details are locked in."
        },
        reception: {
          location: "Reception setting to be confirmed",
          time: "Reception timing can be refined here",
          address: "Reception location and any transfer notes can be added here.",
          description:
            "This is where the celebration side of the day is introduced clearly, without guests needing to ask around."
        },
        transport:
          "Transfers, taxis, local arrivals, or shuttle notes can all be presented here in a much cleaner format than a long message thread.",
        parking:
          "If guests are driving, parking notes and arrival guidance can be added here before anything is shared.",
        directions:
          "A final version can include quick directions, landmark notes, and any venue-specific arrival advice guests should know.",
        mapSpots: [
          { label: "Arrival", detail: "Airport, ferry, or transfer details can be listed here." },
          { label: "Venue", detail: "The main ceremony and celebration location sits here." },
          { label: "Stay", detail: "A helpful hotel area or recommended base can be shown here." }
        ],
        accommodationDescription:
          "A short curated stay guide helps guests book confidently and stops the same questions coming back to the couple repeatedly.",
        accommodation: [
          {
            name: "A recommended guest hotel can sit here",
            note: "Best for guests who want the easiest route to the venue."
          },
          {
            name: "A second stay option can be listed here",
            note: "Ideal if guests want something nearby but a little more relaxed."
          }
        ],
        scheduleDescription:
          "The website can carry a simple, elegant version of the wedding timeline so guests immediately understand how the day unfolds.",
        scheduleNote:
          "This is sample structure only. Final timings can stay light and elegant rather than feeling over-explained.",
        schedule: [
          { time: "Guests arrive", title: "Welcome drinks", details: "A calm lead-in to the ceremony or celebration." },
          { time: "Ceremony", title: "Wedding ceremony", details: "The key timing guests need in one clean place." },
          { time: "Evening", title: "Dinner and dancing", details: "A simple signal for how the rest of the celebration flows." }
        ],
        faq: sharedFaq,
        rsvpDescription:
          "For packages that include RSVP, this section becomes the clean guest response point for attendance, dietary notes, and any practical updates.",
        rsvpPanelDescription:
          "If RSVP is included in the chosen package, guests can respond here and the couple can track replies without chasing messages."
      });
    case "petal-script":
      return withThemeImages(themeId, {
        heroTagline:
          "A softer, floral-led website direction with more romance in the presentation and a gentle editorial feel throughout.",
        heroAnnouncement:
          "This draft is designed to show the atmosphere and structure first, then the couple's own final wording and imagery can be layered in afterwards.",
        storyParagraphs: [
          `This space can become a short, elegant version of ${coupleName}'s story, a welcome note, or a little of the feeling behind the day.`,
          "Even with only a few details shared so far, the preview is meant to feel romantic and finished enough to show the potential of the final website."
        ],
        travelDescription:
          "This layout works especially well when the guest logistics feel beautifully organised rather than overwhelming. Ceremony, reception, and stay details can all be shaped here.",
        travelLocationOverviewTitle: "A softer guide for guests",
        travelLocationOverviewText:
          "Instead of a dense block of logistics, the final version can gently guide guests through where to go, when to arrive, and what is worth knowing in advance.",
        travelMapUtilityTitle: "Useful places, without the clutter",
        travelMapUtilityDescription:
          "A calmer overview of the practical side, with maps, key locations, and the kind of travel notes guests usually ask for.",
        ceremony: {
          location: "Ceremony details will be introduced here",
          time: "A final ceremony time can be added here",
          address: "Venue name, area, and map details are refined before launch.",
          description:
            "This card becomes the polished ceremony reference point once the couple's final details are in place."
        },
        reception: {
          location: "Reception details will sit here",
          time: "Reception timing can be confirmed here",
          address: "Venue address and guest directions can be added here.",
          description:
            "The reception side is presented as part of the same elegant guest journey, not as an afterthought."
        },
        transport:
          "A little transport guidance goes a long way for guests. This can include arrival advice, transfers, or simply the easiest route between venues.",
        parking:
          "Parking notes, drop-off details, or accessibility advice can be added here if the couple wants them included.",
        directions:
          "If the venue needs extra explanation, this is where the practical guidance can live without cluttering the opening section.",
        mapSpots: [
          { label: "Ceremony", detail: "The ceremony venue can be highlighted here with map access." },
          { label: "Reception", detail: "The reception setting and arrival notes can be shown here." },
          { label: "Stay", detail: "A hotel cluster or recommended area can be pointed out here." }
        ],
        accommodationDescription:
          "A guest stay guide here keeps the site useful even before every final recommendation has been chosen.",
        accommodation: [
          {
            name: "A favourite stay option can be featured here",
            note: "Perfect for guests who want the most straightforward choice."
          },
          {
            name: "A second nearby option can sit here",
            note: "A nice way to offer a little range without overloading the page."
          }
        ],
        scheduleDescription:
          "The preview can still show a graceful sense of how the day moves, even while final timings are still being refined.",
        scheduleNote:
          "This is a sample rhythm only. Final timings are usually shaped later, once ceremony and reception details are confirmed.",
        schedule: [
          { time: "Afternoon", title: "Guests gather", details: "A gentle opening moment before the ceremony begins." },
          { time: "Ceremony", title: "The vows", details: "The key ceremony timing can sit here cleanly for guests." },
          { time: "Evening", title: "Celebration continues", details: "Dinner, speeches, and dancing can be wrapped into one elegant flow." }
        ],
        faq: sharedFaq,
        rsvpDescription:
          "For RSVP-enabled packages, this becomes the guest reply area, styled to match the rest of the website rather than feeling bolted on.",
        rsvpPanelDescription:
          "Guests can respond here, and any dietary notes or extra answers can be captured in a way that still feels on-brand."
      });
    case "summer-garden":
      return withThemeImages(themeId, {
        heroTagline:
          "A wilder Atlantic direction with open skies, stronger landscape energy, and room for a fuller wedding weekend feel.",
        heroAnnouncement:
          "The first preview is there to show the atmosphere of the website as much as the structure, especially when the couple is still gathering the final guest details.",
        storyParagraphs: [
          `This space can hold the story of the wedding weekend, a short welcome note, or just enough atmosphere to make ${coupleName}'s website feel personal.`,
          "The final version can carry stronger local detail too, especially if guests are travelling in and want a better feel for the place around the celebration."
        ],
        travelDescription:
          "This kind of website shines when it helps guests feel confident about where they are going, where to stay, and what the wider weekend might look like.",
        travelLocationOverviewTitle: "A weekend guide, not just an address",
        travelLocationOverviewText:
          "Venue notes, travel timings, local landmarks, and suggested guest planning details can all be shaped into a calmer overview here.",
        travelMapUtilityTitle: "Map, area, and useful places",
        travelMapUtilityDescription:
          "A simple local guide can point guests towards the main venue, a good base for staying, and any helpful travel anchors nearby.",
        ceremony: {
          location: "Ceremony details can be refined here",
          time: "Final ceremony time can be confirmed here",
          address: "Venue, area, and guest directions can all be included here.",
          description:
            "Guests usually want this section to answer the practical questions first, while still feeling connected to the setting of the day."
        },
        reception: {
          location: "Reception details can be introduced here",
          time: "Reception timing can be added here",
          address: "The celebration venue and any movement between locations can be shown here.",
          description:
            "The final reception card can hold timings, place details, and anything guests need to know for the evening."
        },
        transport:
          "If guests are driving, taking taxis, or moving between venues, those practical notes can all be held here instead of being repeated in separate messages.",
        parking:
          "Parking, shuttle notes, or local arrival tips can be added here once the couple wants that guidance included.",
        directions:
          "Directions can stay short and clear, with a map link, local landmark, or whatever guests are most likely to need.",
        mapSpots: [
          { label: "Venue", detail: "The main wedding location can be highlighted here." },
          { label: "Stay", detail: "A recommended guest base or hotel area can be shown here." },
          { label: "Around the area", detail: "Extra local notes or landmarks can be added if helpful." }
        ],
        accommodationDescription:
          "A stronger stay section helps destination or out-of-town guests feel looked after from the start.",
        accommodation: [
          {
            name: "A nearby hotel can be listed here",
            note: "Ideal for guests wanting the simplest possible stay option."
          },
          {
            name: "A second guest option can sit here",
            note: "Helpful for families, groups, or anyone staying for the full weekend."
          }
        ],
        scheduleDescription:
          "Even a first draft can show the shape of the day or weekend, which makes the whole website feel more real straight away.",
        scheduleNote:
          "This sample outline is there to show structure and pacing. The final version is refined once the actual timings are ready.",
        schedule: [
          { time: "Arrival", title: "Guests arrive and settle in", details: "A practical cue for when the day starts taking shape." },
          { time: "Ceremony", title: "Ceremony begins", details: "The main guest timing can sit here clearly." },
          { time: "Day Two", title: "A relaxed second-day moment", details: "Ideal for brunch, drinks, or a lighter follow-on gathering." }
        ],
        faq: sharedFaq,
        rsvpDescription:
          "For RSVP-enabled packages, guests can reply here without the couple needing to keep track of it all manually.",
        rsvpPanelDescription:
          "This area can collect attendance, notes, and any extra guest answers, while still matching the rest of the website."
      });
    case "summer-coast":
      return withThemeImages(themeId, {
        heroTagline:
          "A cooler, calmer west-of-Ireland direction with more space, soft stone tones, and a slightly more grounded feel.",
        heroAnnouncement:
          "This preview is designed to show how the website can hold the key guest information beautifully, even before every line of content has been fully written.",
        storyParagraphs: [
          `This space can become a short welcome, a little context about the day, or simply a gentler introduction to the celebration.`,
          "The finished website can stay understated while still feeling rich, useful, and much more complete once the couple's final details are folded in."
        ],
        travelDescription:
          "When a wedding has guests travelling, this section becomes one of the most useful parts of the site. It can hold the practical notes without losing the overall calm of the design.",
        travelLocationOverviewTitle: "A clear first guide for guests",
        travelLocationOverviewText:
          "This area can hold the shape of the day, useful travel notes, and the practical advice guests need before they arrive.",
        travelMapUtilityTitle: "Useful locations at a glance",
        travelMapUtilityDescription:
          "Map links, nearby landmarks, and key guest planning points can be grouped here in a more reassuring format.",
        ceremony: {
          location: "Ceremony information can be added here",
          time: "The ceremony time can be confirmed here",
          address: "Venue and address details can be refined here before launch.",
          description:
            "This becomes the simple reference card guests go back to when they need a quick reminder."
        },
        reception: {
          location: "Reception information can be added here",
          time: "Reception timing can sit here",
          address: "Venue details and local directions can be added here.",
          description:
            "The final version can make the transition from ceremony to celebration feel more joined up for guests."
        },
        transport:
          "Whether guests are driving, car-sharing, or checking local transport, those notes can all live here in one easy place.",
        parking:
          "Parking and arrival details can be added once the couple decides how much guest guidance they want on the site.",
        directions:
          "This is where any location-specific explanation can sit, so the opening sections stay clean and the detail stays easy to find.",
        mapSpots: [
          { label: "Venue", detail: "The main venue location can be shown clearly here." },
          { label: "Travel", detail: "Guests can be guided towards the simplest arrival route." },
          { label: "Stay", detail: "A nearby guest base or recommended accommodation can be highlighted here." }
        ],
        accommodationDescription:
          "A refined stay section helps the preview feel more complete and gives couples a clearer sense of what the finished guest site can become.",
        accommodation: [
          {
            name: "A guest stay option can be listed here",
            note: "Useful for guests who want the simplest, most direct booking choice."
          },
          {
            name: "Another recommended stay can appear here",
            note: "Helpful if the couple wants to offer a little more flexibility."
          }
        ],
        scheduleDescription:
          "A calm timeline adds shape to the draft immediately, even if the exact timings are still being finalised.",
        scheduleNote:
          "This is sample structure for review. The final timeline can stay short and elegant once the actual wedding-day flow is confirmed.",
        schedule: [
          { time: "Guests arrive", title: "Arrival and settling in", details: "An easy cue for when guests should begin making their way in." },
          { time: "Ceremony", title: "Ceremony begins", details: "The key timing guests need first." },
          { time: "Celebration", title: "Reception and evening", details: "The later flow of the day can be introduced here simply." }
        ],
        faq: sharedFaq,
        rsvpDescription:
          "For RSVP-enabled packages, this section becomes the clean reply point for guests once the couple is ready to collect responses.",
        rsvpPanelDescription:
          "Attendance, dietary notes, and any extra answers can all be handled here in the more complete version."
      });
    case "maison-mosaic":
      return withThemeImages(themeId, {
        heroTagline:
          "A more editorial direction where the website feels curated section by section, even while the final details are still taking shape.",
        heroAnnouncement:
          "This draft is especially about showing tone and structure: how the story, schedule, stay guide, and guest information can feel more elevated once refined.",
        storyParagraphs: [
          `This story area can become a welcome note, a short introduction, or a more editorial version of the background to ${coupleName}'s day.`,
          "The final website can stay clean and modern while still feeling warm, personal, and much more considered than a template left half-filled."
        ],
        travelDescription:
          "This layered layout works well for couples who want the website to feel both polished and useful. Travel, venue, and planning details can all be separated more intentionally here.",
        travelLocationOverviewTitle: "A cleaner editorial overview",
        travelLocationOverviewText:
          "This section can open with the setting, then move guests through the practical details without everything collapsing into one block of text.",
        travelMapUtilityTitle: "Maps, landmarks, and key pointers",
        travelMapUtilityDescription:
          "Useful places and planning notes can be arranged here in a way that feels calm, structured, and easy to scan.",
        ceremony: {
          location: "Ceremony details can be styled here",
          time: "The final ceremony time can sit here",
          address: "Address, venue details, and guest guidance can be added here.",
          description:
            "The ceremony card becomes one clear anchor for guests, while keeping the layout elegant rather than overbuilt."
        },
        reception: {
          location: "Reception details can be styled here",
          time: "Reception timing can sit here",
          address: "Venue and arrival notes can be shaped here before launch.",
          description:
            "This card can take on a stronger editorial look once the couple's full details are ready."
        },
        transport:
          "A more layered template needs the practical information to stay organised. This is where transfers, taxis, or local movement can be handled cleanly.",
        parking:
          "Parking or arrival notes can be added here if the couple wants guests to have that extra clarity before the day.",
        directions:
          "Any last-mile guidance or location-specific explanation can sit here without cluttering the lead sections.",
        mapSpots: [
          { label: "Main venue", detail: "The ceremony and celebration location can be highlighted here." },
          { label: "Guest base", detail: "A recommended place to stay or gather can be added here." },
          { label: "Useful note", detail: "Any extra landmark or guest pointer can be surfaced here." }
        ],
        accommodationDescription:
          "The stay section can feel more elevated too, with a smaller number of curated options rather than a long undifferentiated list.",
        accommodation: [
          {
            name: "A primary stay option can be featured here",
            note: "A stronger main recommendation if the couple wants to guide guests clearly."
          },
          {
            name: "A second curated option can sit here",
            note: "Useful for giving guests a little flexibility while keeping the page tidy."
          }
        ],
        scheduleDescription:
          "This kind of preview benefits from showing a bit of rhythm, so couples can picture how the final site will hold the shape of the day.",
        scheduleNote:
          "The timing here is purely illustrative. The point is to show structure, not to lock the couple into final wording too early.",
        schedule: [
          { time: "Welcome", title: "Guests gather", details: "A lead-in moment that gives the page some flow straight away." },
          { time: "Ceremony", title: "The main event", details: "A clear focal point in the timeline once details are finalised." },
          { time: "Afterwards", title: "Celebration continues", details: "Ideal for dinner, music, and the later part of the day." }
        ],
        faq: sharedFaq,
        rsvpDescription:
          "For RSVP-enabled packages, the reply experience can be folded into the same editorial look, rather than feeling like a generic add-on.",
        rsvpPanelDescription:
          "This becomes the practical guest response point, but still sits neatly within the wider visual direction of the website."
      });
    case "soft-blush":
    default:
      return withThemeImages(themeId, {
        heroTagline:
          "A romantic, country-house direction designed to feel polished even before the final wording, timings, and guest details are all in place.",
        heroAnnouncement:
          "This first draft is here to show the shape, tone, and potential of the website. Final wording, guest information, and imagery are refined later before anything goes live.",
        storyParagraphs: [
          `This space can become a short welcome note, a little of ${coupleName}'s story, or simply enough personality to make the website feel like them.`,
          "The final version is usually fuller and more tailored than the first draft. This preview is meant to show the direction beautifully, even while some details are still being gathered."
        ],
        travelDescription:
          "The guest website works best when venue, travel, and timing information are easy to absorb. This section is where the practical side begins to feel organised and polished.",
        travelLocationOverviewTitle: "A first look at the setting",
        travelLocationOverviewText:
          "This area can hold the mood of the location, the ceremony and reception context, and the practical notes guests are most likely to need before the day.",
        travelMapUtilityTitle: "Useful locations and guest guidance",
        travelMapUtilityDescription:
          "Map links, local pointers, and the simplest guest planning notes can all be added here once the couple is ready.",
        ceremony: {
          location: "Ceremony details can be added here",
          time: "A ceremony time can be confirmed here",
          address: "Venue name, address, and a map link can all be included here.",
          description:
            "Once the ceremony details are finalised, this card becomes one of the clearest guest reference points on the site."
        },
        reception: {
          location: "Reception details can be added here",
          time: "Reception timing can be confirmed here",
          address: "Venue details and guest directions can all sit here.",
          description:
            "This is where the celebration side of the day is introduced, in a way that still feels elegant and calm."
        },
        transport:
          "A final version can include whatever guests need most here, from shuttle notes to simple arrival advice.",
        parking:
          "Parking details or local arrival instructions can be added here if the couple wants them included.",
        directions:
          "If guests need a little extra help getting there, that guidance can be folded in here before the website is shared.",
        mapSpots: [
          { label: "Ceremony", detail: "The ceremony venue can be highlighted here." },
          { label: "Reception", detail: "The reception location can be noted here." },
          { label: "Stay", detail: "A recommended guest base or nearby hotel can sit here." }
        ],
        accommodationDescription:
          "A small stay guide here gives guests a clearer sense of where to base themselves and adds a more complete feeling to the site.",
        accommodation: [
          {
            name: "A recommended hotel can be listed here",
            note: "Perfect for guests who want the easiest route to the wedding."
          },
          {
            name: "A second guest option can sit here",
            note: "Useful if the couple wants to offer a little more flexibility."
          }
        ],
        scheduleDescription:
          "Even a light first draft benefits from a simple timeline. It helps couples see the website becoming more real, more quickly.",
        scheduleNote:
          "This is sample structure for review. The final version can stay elegant and concise while still giving guests the timings they need.",
        schedule: [
          { time: "Guests arrive", title: "Arrival and welcome", details: "A soft opening moment to show how the day begins." },
          { time: "Ceremony", title: "Wedding ceremony", details: "The key timing and title can sit here clearly for guests." },
          { time: "Evening", title: "Dinner and dancing", details: "The celebration can continue here in the final version." }
        ],
        faq: sharedFaq,
        rsvpDescription:
          "For RSVP-enabled packages, this section becomes the guest response point for attendance, dietary notes, and any extra wedding details the couple wants collected.",
        rsvpPanelDescription:
          "Guests can respond here once the couple is ready, and the wording of the form can be shaped around exactly what they want to ask."
      });
  }
}
