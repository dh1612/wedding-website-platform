import type { CSSProperties } from "react";
import { getThemeById } from "@/lib/themes";
import type { ThemeDefinition } from "@/lib/themes";
import type { WeddingData } from "@/types/wedding";

type VenuePreviewConfig = {
  slug: string;
  venueName: string;
  shortLabel: string;
  metadataTitle: string;
  couple: string;
  date: string;
  themeId: string;
  location: string;
  mapQuery: string;
  officialUrl: string;
  airportLabel: string;
  airportQuery: string;
  airportDetail: string;
  nearbyAreaLabel: string;
  nearbyAreaDetail: string;
  extraAreaLabel: string;
  extraAreaDetail: string;
  tagline: string;
  announcement: string;
  announcementHtml?: string;
  locationOverviewHtml: string;
  stayDescription: string;
  scheduleHeading: string;
  scheduleDescription: string;
  schedule: WeddingData["schedule"];
  dayTwoTitle: string;
  dayTwoDescription: string;
  faq: WeddingData["faq"];
  storyTimeline: WeddingData["story"]["timeline"];
  heroImage?: string;
  heroImageObjectPosition?: string;
  heroImageBrightness?: number;
  fontBody: string;
  fontDisplay: string;
  fontScript: string;
  footerLine?: string;
  legalNote?: string;
};

type VenuePreviewPageData = {
  routePath: string;
  metadataTitle: string;
  theme: ThemeDefinition;
  weddingData: WeddingData;
};

const venueConfigs: VenuePreviewConfig[] = [
  {
    slug: "fota-island-resort",
    venueName: "Fota Island Resort",
    shortLabel: "Fota Island",
    metadataTitle: "Fota Island Resort wedding website concept",
    couple: "Aoife & Cian",
    date: "May 21, 2028",
    themeId: "tailored-vows",
    location: "Cork",
    mapQuery: "Fota Island Resort Cork",
    officialUrl: "https://www.fotaisland.ie/",
    airportLabel: "Cork Airport",
    airportQuery: "Cork Airport",
    airportDetail: "The easiest arrival point for most guests travelling into Cork.",
    nearbyAreaLabel: "Fota & Carrigtwohill",
    nearbyAreaDetail: "A straightforward base for guests who want to stay close to the celebrations.",
    extraAreaLabel: "Cork City",
    extraAreaDetail: "A fuller city stay for guests who may turn the weekend into an extra night away.",
    tagline:
      "A polished country-resort wedding website shaped around elegant hosting, easy guest logistics, and celebrating at Fota Island Resort from the very first guest click.",
    announcement:
      "Fota Island Resort suits the kind of wedding weekend where everything feels calm from the first arrival, with golf-course greenery, beautifully finished interiors, and the sort of hospitality guests settle into very quickly.",
    announcementHtml:
      "<p>Nestled within the beautiful grounds of <strong>Fota Island Resort</strong>, this kind of wedding website gives guests a polished introduction to the day before they even arrive.</p><p><strong>Perfect for keeping guests informed before the big day:</strong></p><ul><li>Directions</li><li>Accommodation</li><li>RSVP</li><li>Gift list</li><li>FAQs</li><li>Timeline</li></ul><p>For coordinators, it helps answer the questions couples and guests usually ask long before they land in the inbox.</p>",
    locationOverviewHtml:
      "<p>For couples who want resort comfort without losing that sense of occasion, <strong>Fota Island Resort</strong> works beautifully. Guests can arrive, stay well, and feel looked after without the day becoming over-complicated.</p><p>The grounds, the resort setting, and the sense of a full weekend away give guests plenty to look forward to before and after the wedding itself, which makes the website feel less like a list of timings and more like a proper introduction to celebrating at Fota.</p>",
    stayDescription:
      "A stay that feels properly elevated, with spacious rooms, resort comfort, and the ease of having the main celebrations centred within Fota Island Resort.",
    scheduleHeading: "A Weekend At The Resort",
    scheduleDescription:
      "A first-draft view of how a Fota wedding weekend can unfold with space for arrivals, the main celebration, and a softer close the following morning.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive into Cork",
        details:
          "Check-ins, quiet drinks, and time to settle before the main wedding day begins."
      },
      {
        time: "Saturday, 1:30 PM",
        title: "Arrivals at the resort",
        details:
          "Guests arrive with enough time to enjoy the setting rather than rushing from car to ceremony."
      },
      {
        time: "Saturday, 3:00 PM",
        title: "Ceremony",
        details:
          "The celebration begins in a setting that already feels substantial and beautifully hosted."
      },
      {
        time: "Saturday, 5:00 PM",
        title: "Reception & dinner",
        details:
          "Drinks, dinner, and the evening flow naturally when guests already feel anchored to the venue."
      },
      {
        time: "Sunday, 11:00 AM",
        title: "A final catch-up",
        details:
          "A slower send-off for anyone staying on before journeys home begin."
      }
    ],
    dayTwoTitle: "A softer Sunday morning",
    dayTwoDescription:
      "One of the best things about a resort venue is that guests can linger a little longer and still have the weekend feel contained and easy.",
    faq: [
      {
        q: "Would this suit guests coming from different parts of Ireland?",
        a: "Yes. Cork is an easy destination to explain, and a venue like Fota makes the main wedding day feel very contained once guests arrive."
      },
      {
        q: "Could the website highlight golf, spa, or pre-wedding downtime?",
        a: "Absolutely. The page can easily point guests towards the wider resort experience as part of the weekend."
      },
      {
        q: "Can accommodation guidance stay elegant rather than over-detailed?",
        a: "Yes. The website can keep the tone polished while still making the practical choices obvious."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Summer 2023",
        title: "They met",
        note:
          "What started casually quickly became the kind of relationship built around long weekends and easy conversation."
      },
      {
        dateLabel: "Spring 2024",
        title: "The first proper trip away",
        note:
          "A change of scene confirmed they both loved celebrations that felt relaxed rather than over-structured."
      },
      {
        dateLabel: "Autumn 2025",
        title: "The proposal",
        note:
          "A private yes, followed by plenty of talk about how they wanted their wedding to feel."
      },
      {
        dateLabel: "Winter 2026",
        title: "Venue visits began",
        note:
          "They kept coming back to spaces that could hold guests comfortably and still feel special."
      },
      {
        dateLabel: "Spring 2028",
        title: "The weekend ahead",
        note:
          "Now the focus is on welcoming everyone into a resort weekend that feels polished from the first look onward."
      }
    ],
    fontBody: "var(--font-lato), Arial, sans-serif",
    fontDisplay: "var(--font-playfair), Didot, serif",
    fontScript: "var(--font-alex-brush), 'Snell Roundhand', cursive",
    footerLine: "Crafted Wedding Sites • Cork, Ireland",
    legalNote:
      "This website is an independent concept created by Crafted Wedding Sites to demonstrate how a bespoke wedding website could complement weddings at Fota Island Resort. It is not affiliated with or endorsed by Fota Island Resort."
  },
  {
    slug: "castlemartyr-resort",
    venueName: "Castlemartyr Resort",
    shortLabel: "Castlemartyr",
    metadataTitle: "Castlemartyr Resort wedding website concept",
    couple: "Saoirse & Eoin",
    date: "June 8, 2028",
    themeId: "soft-blush",
    location: "Cork",
    mapQuery: "Castlemartyr Resort Cork",
    officialUrl: "https://www.castlemartyrresort.ie/",
    airportLabel: "Cork Airport",
    airportQuery: "Cork Airport",
    airportDetail: "The simplest arrival point for most guests travelling into East Cork.",
    nearbyAreaLabel: "Castlemartyr Village",
    nearbyAreaDetail: "A convenient base for guests who want to stay close and keep the day easy.",
    extraAreaLabel: "Midleton",
    extraAreaDetail: "A wider guest base with extra dining and accommodation options nearby.",
    tagline:
      "A romantic country-estate wedding website designed for couples who want elegance, soft structure, and celebrating at Castlemartyr Resort from the very first guest click.",
    announcement:
      "Castlemartyr already carries that sense of arrival couples hope for: historic character, refined rooms, and a weekend atmosphere that feels grand without becoming stiff.",
    announcementHtml:
      "<p>Set within the beautiful estate setting of <strong>Castlemartyr Resort</strong>, this kind of wedding website gives guests a graceful introduction to the day before they even arrive.</p><p><strong>Perfect for keeping guests informed before the big day:</strong></p><ul><li>Directions</li><li>Accommodation</li><li>RSVP</li><li>Gift list</li><li>FAQs</li><li>Timeline</li></ul><p>For coordinators, it helps answer the questions couples and guests usually ask long before the weekend itself begins.</p>",
    locationOverviewHtml:
      "<p>Some venues naturally hold a more romantic pacing, and <strong>Castlemartyr Resort</strong> is one of them. Guests can understand the shape of the weekend quickly while still feeling like they are being invited into something beautiful.</p><p>The estate setting, refined interiors, and sense of occasion give guests something to feel excited about early, which makes the website especially useful as both a practical guide and an early glimpse of the tone the couple wants to set.</p>",
    stayDescription:
      "A country-estate stay that feels special from arrival onward, with the comfort of keeping the most important moments anchored within Castlemartyr Resort.",
    scheduleHeading: "A Country Estate Weekend",
    scheduleDescription:
      "The first draft can show a clear guest journey without losing the softer, romantic pace couples usually want for a venue like this.",
    schedule: [
      {
        time: "Friday evening",
        title: "Arrivals and first drinks",
        details:
          "Guests arrive into the estate setting and begin the weekend slowly."
      },
      {
        time: "Saturday, 2:00 PM",
        title: "Guests gather at Castlemartyr",
        details:
          "The wedding day begins with enough time for guests to settle and enjoy the atmosphere."
      },
      {
        time: "Saturday, 3:30 PM",
        title: "Ceremony",
        details:
          "The formal celebration starts in a setting already carrying its own sense of occasion."
      },
      {
        time: "Saturday, 5:30 PM",
        title: "Reception & dinner",
        details:
          "Drinks, dinner, and the evening celebration continue in the estate surroundings."
      },
      {
        time: "Sunday, 11:00 AM",
        title: "A gentle farewell",
        details:
          "One last catch-up before guests make their way home."
      }
    ],
    dayTwoTitle: "A slower Sunday together",
    dayTwoDescription:
      "This kind of venue lends itself beautifully to a final morning that still feels part of the celebration rather than an abrupt ending.",
    faq: [
      {
        q: "Would the website work for a more formal venue tone?",
        a: "Yes. The structure can stay highly practical while the wording and design feel noticeably more refined."
      },
      {
        q: "Could this include pre-wedding notes for guests staying onsite?",
        a: "Absolutely. Stay details, arrival guidance, and lighter pre-wedding plans can all sit neatly in the same flow."
      },
      {
        q: "Can it stay elegant if final timings are still being confirmed?",
        a: "Yes. The page can hold the shape of the weekend without feeling unfinished."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Autumn 2022",
        title: "They met",
        note:
          "A quick connection turned into the kind of relationship built around small rituals and easy time together."
      },
      {
        dateLabel: "Summer 2024",
        title: "Weekends became important",
        note:
          "Beautiful places and slower plans started to shape how they imagined their future celebrations too."
      },
      {
        dateLabel: "Spring 2025",
        title: "They got engaged",
        note:
          "The yes was easy. The venue search quickly followed."
      },
      {
        dateLabel: "Winter 2026",
        title: "Estate venues stood out",
        note:
          "They wanted guests to feel welcome and impressed in equal measure."
      },
      {
        dateLabel: "Summer 2028",
        title: "Now the wedding weekend begins",
        note:
          "A celebration shaped around warmth, elegance, and time with the people who matter most."
      }
    ],
    fontBody: "var(--font-montserrat), Arial, sans-serif",
    fontDisplay: "var(--font-cormorant), Garamond, serif",
    fontScript: "var(--font-alex-brush), 'Snell Roundhand', cursive",
    footerLine: "Crafted Wedding Sites • Cork, Ireland",
    legalNote:
      "This website is an independent concept created by Crafted Wedding Sites to demonstrate how a bespoke wedding website could complement weddings at Castlemartyr Resort. It is not affiliated with or endorsed by Castlemartyr Resort."
  },
  {
    slug: "hayfield-manor",
    venueName: "Hayfield Manor",
    shortLabel: "Hayfield Manor",
    metadataTitle: "Hayfield Manor wedding website concept",
    couple: "Niamh & James",
    date: "April 27, 2028",
    themeId: "classical-soiree",
    location: "Cork",
    mapQuery: "Hayfield Manor Cork",
    officialUrl: "https://www.hayfieldmanor.ie/",
    airportLabel: "Cork Airport",
    airportQuery: "Cork Airport",
    airportDetail: "An easy arrival for guests heading into the city and then onwards to the manor.",
    nearbyAreaLabel: "Cork City",
    nearbyAreaDetail: "A polished city base for guests who want restaurants, walkable plans, and a fuller weekend away.",
    extraAreaLabel: "The manor setting",
    extraAreaDetail: "A more intimate, luxury hotel feel that keeps the celebration contained and elegant.",
    tagline:
      "A city-luxury wedding website tailored to couples who want a graceful guest experience, rich hospitality, and celebrating at Hayfield Manor with polish from the very first guest click.",
    announcement:
      "Hayfield Manor brings together the warmth of a privately run luxury hotel with the confidence couples want from a wedding venue: beautiful rooms, attentive service, and a setting that feels quietly elevated throughout.",
    announcementHtml:
      "<p>Set within the refined surroundings of <strong>Hayfield Manor</strong>, this kind of wedding website gives guests a polished introduction to the day before they even arrive.</p><p><strong>Perfect for keeping guests informed before the big day:</strong></p><ul><li>Directions</li><li>Accommodation</li><li>RSVP</li><li>Gift list</li><li>FAQs</li><li>Timeline</li></ul><p>For coordinators, it helps answer the questions couples and guests usually ask long before the weekend itself begins.</p>",
    locationOverviewHtml:
      "<p>Because <strong>Hayfield Manor</strong> sits so well between city access and luxury-hotel atmosphere, the website can help guests understand both the practical ease and the sense of occasion very quickly.</p><p>The hotel's warmth, service, and beautifully finished spaces give guests something to feel excited about early, which makes it ideal for couples who want a refined wedding page without pages of explanation.</p>",
    stayDescription:
      "A luxury-hotel stay with city access, excellent food, and the sort of atmosphere that makes guests feel instantly looked after at Hayfield Manor.",
    scheduleHeading: "A Manor Weekend In The City",
    scheduleDescription:
      "A polished guest outline that shows how a Cork city-luxury wedding can feel calm, elegant, and easy to follow.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive into Cork",
        details:
          "City arrivals, check-ins, and the first sense of the weekend taking shape."
      },
      {
        time: "Saturday, 1:30 PM",
        title: "Guests arrive at Hayfield Manor",
        details:
          "Time to settle before the formal celebrations begin."
      },
      {
        time: "Saturday, 3:00 PM",
        title: "Ceremony",
        details:
          "The wedding begins in a setting that already feels intimate and carefully hosted."
      },
      {
        time: "Saturday, 5:00 PM",
        title: "Dinner & celebration",
        details:
          "The evening moves naturally into food, drinks, and a fuller celebration."
      },
      {
        time: "Sunday, 10:30 AM",
        title: "One final brunch",
        details:
          "For guests staying over, a final catch-up keeps the weekend feeling complete."
      }
    ],
    dayTwoTitle: "A final city morning",
    dayTwoDescription:
      "The nice thing about a venue like this is that guests can either depart easily or stretch the weekend a little without complication.",
    faq: [
      {
        q: "Would this suit couples with lots of out-of-town guests?",
        a: "Yes. Cork is easy to explain, and a luxury hotel setting makes the stay itself part of the draw."
      },
      {
        q: "Can the website balance city information with a refined tone?",
        a: "Absolutely. The page can guide guests clearly without losing the atmosphere of the venue."
      },
      {
        q: "Could this include RSVP and menu choices later?",
        a: "Yes. The same structure can expand into replies, guest notes, and practical questions."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Winter 2022",
        title: "They met",
        note:
          "A quick sense of ease became the start of something far more lasting."
      },
      {
        dateLabel: "Spring 2024",
        title: "The best weekends felt unhurried",
        note:
          "Shared dinners, city stays, and plenty of talk about the future shaped the tone they wanted from life together."
      },
      {
        dateLabel: "Autumn 2025",
        title: "The proposal",
        note:
          "A simple yes, followed by all the fun of imagining the day itself."
      },
      {
        dateLabel: "Summer 2026",
        title: "Venue ideas became clearer",
        note:
          "They wanted somewhere elegant and beautifully hosted rather than merely impressive."
      },
      {
        dateLabel: "Spring 2028",
        title: "Now everyone gathers",
        note:
          "A wedding weekend shaped around good hospitality, good company, and a setting that feels quietly luxurious."
      }
    ],
    fontBody: "var(--font-lato), Arial, sans-serif",
    fontDisplay: "var(--font-playfair), Didot, serif",
    fontScript: "var(--font-great-vibes), 'Snell Roundhand', cursive",
    footerLine: "Crafted Wedding Sites • Cork, Ireland",
    legalNote:
      "This website is an independent concept created by Crafted Wedding Sites to demonstrate how a bespoke wedding website could complement weddings at Hayfield Manor. It is not affiliated with or endorsed by Hayfield Manor."
  },
  {
    slug: "ballyseede-castle",
    venueName: "Ballyseede Castle",
    shortLabel: "Ballyseede Castle",
    metadataTitle: "Ballyseede Castle wedding website concept",
    couple: "Clodagh & Padraig",
    date: "September 9, 2028",
    themeId: "botanical-rings",
    location: "Kerry",
    mapQuery: "Ballyseede Castle Kerry",
    officialUrl: "https://www.ballyseedecastle.com/",
    airportLabel: "Kerry Airport",
    airportQuery: "Kerry Airport",
    airportDetail: "A convenient arrival point for many guests travelling into Kerry.",
    nearbyAreaLabel: "Tralee",
    nearbyAreaDetail: "A useful nearby town base for guests who want extra accommodation options.",
    extraAreaLabel: "Castle grounds",
    extraAreaDetail: "A more immersive overnight stay for guests who want the full estate feeling.",
    tagline:
      "A castle wedding website with warmth, romance, and enough structure to make a destination-style Irish weekend feel effortless for guests.",
    announcement:
      "Ballyseede has that rare combination of character and warmth: a castle setting that feels distinctive from the first look, but still welcoming enough for guests to relax into the weekend very quickly.",
    locationOverviewHtml:
      "<p>For couples drawn to classic Irish castle atmosphere without losing guest comfort, Ballyseede offers a lot. The website can set expectations gently while also showcasing why the venue itself is part of the celebration.</p><p>That makes it easier for guests to understand not only when and where they need to be, but why staying close is worth it.</p>",
    stayDescription:
      "A genuinely atmospheric castle stay that lets guests feel part of the celebration from the moment they arrive through to the final morning.",
    scheduleHeading: "A Castle Weekend In Kerry",
    scheduleDescription:
      "A romantic outline that keeps the guest journey clear while still letting the castle atmosphere lead the mood.",
    schedule: [
      {
        time: "Friday evening",
        title: "Arrivals in Kerry",
        details:
          "Guests settle in, get their bearings, and begin the weekend in a more relaxed frame of mind."
      },
      {
        time: "Saturday, 1:30 PM",
        title: "Guests arrive at the castle",
        details:
          "A little time to take in the grounds before the ceremony begins."
      },
      {
        time: "Saturday, 3:00 PM",
        title: "Ceremony",
        details:
          "The day begins in a setting already rich with atmosphere and a sense of occasion."
      },
      {
        time: "Saturday, 5:00 PM",
        title: "Reception & celebration",
        details:
          "Dinner, speeches, and the evening celebration unfold across the castle setting."
      },
      {
        time: "Sunday, 11:00 AM",
        title: "A final Kerry morning",
        details:
          "A slower departure helps the weekend feel complete rather than rushed."
      }
    ],
    dayTwoTitle: "A final castle morning",
    dayTwoDescription:
      "Castle venues naturally lend themselves to that last morning of coffee, catch-ups, and guests leaving a little later than planned.",
    faq: [
      {
        q: "Would the website help guests travelling into Kerry for the first time?",
        a: "Yes. Arrival guidance, stay notes, and a simplified weekend structure are exactly where the website becomes most useful."
      },
      {
        q: "Can a castle venue still feel modern online?",
        a: "Absolutely. The page can respect the venue atmosphere while still feeling polished and current."
      },
      {
        q: "Could the same site later handle RSVPs and guest questions?",
        a: "Yes. The structure here is designed to grow naturally into that next stage."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Spring 2023",
        title: "They met",
        note:
          "The start was easy. The staying close part came even more naturally."
      },
      {
        dateLabel: "Autumn 2024",
        title: "Weekends away became a habit",
        note:
          "The best plans were usually the slower ones, with time to properly enjoy where they were."
      },
      {
        dateLabel: "Summer 2025",
        title: "They got engaged",
        note:
          "A quiet proposal, a very happy yes, and lots of conversations afterwards."
      },
      {
        dateLabel: "Winter 2026",
        title: "A castle weekend felt right",
        note:
          "They wanted atmosphere, warmth, and a venue guests would remember clearly."
      },
      {
        dateLabel: "Autumn 2028",
        title: "Now the celebration gathers pace",
        note:
          "A wedding weekend shaped around romance, comfort, and a strong sense of place."
      }
    ],
    fontBody: "var(--font-montserrat), Arial, sans-serif",
    fontDisplay: "var(--font-cormorant), Garamond, serif",
    fontScript: "var(--font-alex-brush), 'Snell Roundhand', cursive"
  },
  {
    slug: "dromoland-castle",
    venueName: "Dromoland Castle",
    shortLabel: "Dromoland Castle",
    metadataTitle: "Dromoland Castle wedding website concept",
    couple: "Orla & Daniel",
    date: "July 13, 2028",
    themeId: "black-tie-details",
    location: "Clare",
    mapQuery: "Dromoland Castle Clare",
    officialUrl: "https://www.dromoland.ie/",
    airportLabel: "Shannon Airport",
    airportQuery: "Shannon Airport",
    airportDetail: "A very straightforward arrival point for guests flying into the west of Ireland.",
    nearbyAreaLabel: "Newmarket-on-Fergus",
    nearbyAreaDetail: "A practical guest base nearby for anyone not staying onsite.",
    extraAreaLabel: "Castle estate",
    extraAreaDetail: "The venue itself feels like a full destination experience, not only a ceremony setting.",
    tagline:
      "A grand Irish-castle wedding website that keeps the guest experience polished, luxurious, and easy to follow from the first invitation link.",
    announcement:
      "Dromoland is the sort of venue that benefits from a website matching its standard: confident, beautifully structured, and clear enough that guests can enjoy the grandeur rather than puzzle through the logistics.",
    locationOverviewHtml:
      "<p>Because Dromoland already feels like a destination in its own right, the website can do two jobs at once: reassure guests practically and build anticipation for the venue itself.</p><p>That is especially valuable for higher-end celebrations where polish matters before anyone even arrives.</p>",
    stayDescription:
      "A memorable luxury stay where the estate itself becomes part of the wedding experience, with all the ease that comes from keeping guests close to the celebration.",
    scheduleHeading: "A Castle Estate Weekend",
    scheduleDescription:
      "The first-draft structure can stay beautifully clear while reflecting the more elevated tone of a venue like Dromoland.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive into Clare",
        details:
          "Arrivals, check-ins, and the start of a more immersive wedding weekend."
      },
      {
        time: "Saturday, 2:00 PM",
        title: "Guests gather at the castle",
        details:
          "The estate setting gives the day a sense of occasion before the ceremony even begins."
      },
      {
        time: "Saturday, 3:30 PM",
        title: "Ceremony",
        details:
          "A formal beginning in a venue already rich in atmosphere."
      },
      {
        time: "Saturday, 5:30 PM",
        title: "Reception & dinner",
        details:
          "The evening celebration flows through a venue already designed for hosting at a high level."
      },
      {
        time: "Sunday, 11:30 AM",
        title: "One final gathering",
        details:
          "A slower morning keeps the experience feeling complete."
      }
    ],
    dayTwoTitle: "A final estate morning",
    dayTwoDescription:
      "The website can easily carry the mood of a luxurious final morning without overcomplicating the detail.",
    faq: [
      {
        q: "Would this work especially well for international guests?",
        a: "Yes. Shannon access plus a venue that feels self-contained makes the weekend much easier to explain."
      },
      {
        q: "Can the page reflect a black-tie or higher-formality tone?",
        a: "Absolutely. The wording, structure, and design can all be tuned to feel more elevated."
      },
      {
        q: "Could this include pre-arrival notes for guests staying on the estate?",
        a: "Yes. Arrival, accommodation, day-two plans, and replies can all sit in one polished flow."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Autumn 2022",
        title: "They met",
        note:
          "A chance connection quickly became something much more certain."
      },
      {
        dateLabel: "Summer 2024",
        title: "They started imagining a bigger day",
        note:
          "Not just a single evening, but a celebration guests could truly experience."
      },
      {
        dateLabel: "Spring 2025",
        title: "They got engaged",
        note:
          "A very easy yes, and then all the venue dreaming began in earnest."
      },
      {
        dateLabel: "Winter 2026",
        title: "A castle estate stood out",
        note:
          "They wanted the setting to feel luxurious without becoming inaccessible."
      },
      {
        dateLabel: "Summer 2028",
        title: "Now everyone gathers",
        note:
          "A wedding weekend shaped around grandeur, warmth, and proper hospitality."
      }
    ],
    fontBody: "var(--font-lato), Arial, sans-serif",
    fontDisplay: "var(--font-playfair), Didot, serif",
    fontScript: "var(--font-alex-brush), 'Snell Roundhand', cursive"
  },
  {
    slug: "adare-manor",
    venueName: "Adare Manor",
    shortLabel: "Adare Manor",
    metadataTitle: "Adare Manor wedding website concept",
    couple: "Isobel & Conor",
    date: "August 10, 2028",
    themeId: "invitation-suite",
    location: "Limerick",
    mapQuery: "Adare Manor Limerick",
    officialUrl: "https://www.adaremanor.com/",
    airportLabel: "Shannon Airport",
    airportQuery: "Shannon Airport",
    airportDetail: "A convenient arrival point for guests heading into Limerick and Adare.",
    nearbyAreaLabel: "Adare Village",
    nearbyAreaDetail: "A charming nearby base that keeps guests close to the manor atmosphere.",
    extraAreaLabel: "The manor estate",
    extraAreaDetail: "An immersive luxury stay for guests who want the full destination feel.",
    tagline:
      "A luxury-manor wedding website for couples who want a guest experience that feels seamless, high-end, and unmistakably considered.",
    announcement:
      "Adare Manor is a venue where the digital experience matters almost as much as the physical one. Guests expect clarity, polish, and a sense of anticipation before they arrive, and the website can do all three beautifully.",
    locationOverviewHtml:
      "<p>For a venue at this level, the website should never feel like an afterthought. It needs to guide guests clearly while reflecting the standard, confidence, and elegance couples have chosen for the celebration itself.</p><p>That is exactly where a tailored format makes more sense than a generic builder page.</p>",
    stayDescription:
      "A highly luxurious stay that keeps guests inside the full Adare Manor experience from the first arrival through to the final farewell.",
    scheduleHeading: "A Manor Weekend Of Real Occasion",
    scheduleDescription:
      "The structure stays calm and guest-friendly, while the tone reflects the high standard of a venue like Adare Manor.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive and settle in",
        details:
          "The weekend begins with enough breathing room for guests to enjoy the setting rather than rush through it."
      },
      {
        time: "Saturday, 2:00 PM",
        title: "Guests gather at the manor",
        details:
          "Time to enjoy the arrival experience before the formal celebrations begin."
      },
      {
        time: "Saturday, 3:30 PM",
        title: "Ceremony",
        details:
          "The wedding begins in a setting already carrying drama and refinement."
      },
      {
        time: "Saturday, 5:30 PM",
        title: "Reception & dinner",
        details:
          "The evening unfolds with the sense of scale and polish guests would expect from the venue."
      },
      {
        time: "Sunday, 11:30 AM",
        title: "A final morning together",
        details:
          "A slower close keeps the overall guest experience feeling complete."
      }
    ],
    dayTwoTitle: "A graceful final morning",
    dayTwoDescription:
      "Luxury venues benefit from a softer closing note, and the website can reflect that without making things feel over-managed.",
    faq: [
      {
        q: "Would this suit a high-formality guest experience?",
        a: "Yes. The design and wording can easily hold a more luxury-led tone while still staying warm."
      },
      {
        q: "Can the site help build anticipation before invitations go out?",
        a: "Absolutely. For destination-style or luxury-manor weddings, early guest confidence matters a great deal."
      },
      {
        q: "Could couples still keep the wording personal rather than corporate?",
        a: "Yes. The structure is polished, but the voice can stay completely tailored to the couple."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Spring 2023",
        title: "They met",
        note:
          "The early feeling was easy, but the certainty deepened very quickly."
      },
      {
        dateLabel: "Winter 2024",
        title: "Their idea of a celebration became clearer",
        note:
          "Not overly busy, not overly formal, just beautifully considered from start to finish."
      },
      {
        dateLabel: "Summer 2025",
        title: "The proposal",
        note:
          "A very happy yes and then plenty of dreaming about the wedding itself."
      },
      {
        dateLabel: "Autumn 2026",
        title: "The right venue mattered",
        note:
          "They wanted guests to feel properly welcomed before the day even began."
      },
      {
        dateLabel: "Summer 2028",
        title: "Now the manor weekend begins",
        note:
          "A celebration shaped around elegance, hospitality, and a guest experience that feels seamless."
      }
    ],
    fontBody: "var(--font-lato), Arial, sans-serif",
    fontDisplay: "var(--font-playfair), Didot, serif",
    fontScript: "var(--font-great-vibes), 'Snell Roundhand', cursive"
  },
  {
    slug: "the-europe-hotel-resort",
    venueName: "The Europe Hotel & Resort",
    shortLabel: "The Europe Hotel & Resort",
    metadataTitle: "The Europe Hotel & Resort wedding website concept",
    couple: "Cara & Hugh",
    date: "June 29, 2028",
    themeId: "summer-coast",
    location: "Killarney, Kerry",
    mapQuery: "The Europe Hotel and Resort Killarney",
    officialUrl: "https://www.theeurope.com/",
    airportLabel: "Kerry Airport",
    airportQuery: "Kerry Airport",
    airportDetail: "A practical arrival point for many guests heading into Killarney.",
    nearbyAreaLabel: "Killarney",
    nearbyAreaDetail: "A fuller guest base with restaurants, walks, and easy overnight options.",
    extraAreaLabel: "The lakeside setting",
    extraAreaDetail: "A more immersive stay for guests who want the full resort experience.",
    tagline:
      "A lakeside wedding website that blends striking scenery, resort comfort, and the kind of calm guest guidance a destination-style weekend deserves.",
    announcement:
      "The Europe lends itself beautifully to a wedding website because the setting is such a core part of the appeal: lake views, resort comfort, and the feeling that the celebration begins long before the ceremony itself.",
    locationOverviewHtml:
      "<p>For couples choosing a venue with scenery this strong, the website should help guests understand the shape of the weekend while also giving the venue space to shine.</p><p>That is where a more tailored page feels especially useful: practical, yes, but also part of the anticipation.</p>",
    stayDescription:
      "A standout lakeside stay with resort comfort, memorable dining, and the ease of having the main celebration centred in one destination.",
    scheduleHeading: "A Lakeside Wedding Weekend",
    scheduleDescription:
      "A clean first-draft structure that helps guests picture the celebration without draining any romance from it.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive in Killarney",
        details:
          "The weekend begins with lake air, check-ins, and time to settle before the main celebration."
      },
      {
        time: "Saturday, 1:30 PM",
        title: "Guests gather at the resort",
        details:
          "A little time to enjoy the view before the day begins in earnest."
      },
      {
        time: "Saturday, 3:00 PM",
        title: "Ceremony",
        details:
          "The celebration begins with the scenery already doing part of the work."
      },
      {
        time: "Saturday, 5:00 PM",
        title: "Reception & dinner",
        details:
          "Drinks, dinner, and the evening celebration continue against the lakeside backdrop."
      },
      {
        time: "Sunday, 11:00 AM",
        title: "A final slow morning",
        details:
          "For guests staying on, the last morning can feel like part of the weekend rather than merely an exit."
      }
    ],
    dayTwoTitle: "A final morning by the lake",
    dayTwoDescription:
      "The website can support that more resort-like feeling, where guests leave well rested rather than hurried.",
    faq: [
      {
        q: "Would this work well for guests turning it into a short break?",
        a: "Yes. The Killarney setting naturally invites guests to stay a little longer, and the website can support that gently."
      },
      {
        q: "Can the venue scenery be reflected more strongly in the website copy?",
        a: "Absolutely. That is one of the advantages of a tailored page over a rigid builder template."
      },
      {
        q: "Could the site later include RSVP and room-booking notes?",
        a: "Yes. The same structure can expand easily once those details are ready."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Autumn 2022",
        title: "They met",
        note:
          "The start felt easy, and the rest followed quickly."
      },
      {
        dateLabel: "Summer 2024",
        title: "Trips away became part of their rhythm",
        note:
          "Beautiful settings and relaxed time together kept shaping the life they wanted."
      },
      {
        dateLabel: "Winter 2025",
        title: "They got engaged",
        note:
          "A yes that felt both exciting and entirely expected."
      },
      {
        dateLabel: "Spring 2026",
        title: "Scenery started to matter",
        note:
          "They wanted guests to remember how the place felt, not only what time everything began."
      },
      {
        dateLabel: "Summer 2028",
        title: "Now everyone gathers by the lake",
        note:
          "A wedding weekend shaped around views, ease, and a venue that carries its own sense of occasion."
      }
    ],
    fontBody: "var(--font-montserrat), Arial, sans-serif",
    fontDisplay: "var(--font-cormorant), Garamond, serif",
    fontScript: "var(--font-alex-brush), 'Snell Roundhand', cursive"
  },
  {
    slug: "the-dunloe-hotel-gardens",
    venueName: "The Dunloe Hotel & Gardens",
    shortLabel: "The Dunloe Hotel & Gardens",
    metadataTitle: "The Dunloe Hotel & Gardens wedding website concept",
    couple: "Aisling & Tom",
    date: "May 30, 2028",
    themeId: "summer-garden",
    location: "Killarney, Kerry",
    mapQuery: "The Dunloe Hotel and Gardens Killarney",
    officialUrl: "https://www.thedunloe.com/",
    airportLabel: "Kerry Airport",
    airportQuery: "Kerry Airport",
    airportDetail: "A useful arrival point for many guests travelling into Kerry.",
    nearbyAreaLabel: "Killarney",
    nearbyAreaDetail: "A lively guest base with dining, extra stays, and easy access to the area.",
    extraAreaLabel: "The Gap of Dunloe setting",
    extraAreaDetail: "A stay that feels scenic, spacious, and strongly connected to the landscape.",
    tagline:
      "A garden-and-mountain wedding website designed for couples who want scenery, guest comfort, and a weekend that feels gently curated rather than crowded.",
    announcement:
      "The Dunloe stands out because it offers guests more than a single venue moment. The setting, gardens, and wider Killarney landscape all help the wedding feel like a proper escape.",
    locationOverviewHtml:
      "<p>For a venue with scenery and breathing room like this, the website can do a lovely job of helping guests understand the full mood of the weekend.</p><p>It becomes less about over-explaining and more about guiding people clearly into the setting and the plans around it.</p>",
    stayDescription:
      "A scenic hotel stay with gardens, mountain atmosphere, and the kind of peaceful setting that naturally extends a wedding into a fuller weekend.",
    scheduleHeading: "A Garden Weekend In Kerry",
    scheduleDescription:
      "A calm outline that gives guests the practical shape of the celebration while still letting the setting feel spacious and romantic.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive in Kerry",
        details:
          "A slower beginning with enough time to settle and enjoy the landscape."
      },
      {
        time: "Saturday, 1:30 PM",
        title: "Guests gather at The Dunloe",
        details:
          "The wedding day begins with breathing room and a proper sense of place."
      },
      {
        time: "Saturday, 3:00 PM",
        title: "Ceremony",
        details:
          "The celebration begins in a venue where the scenery is part of the guest experience."
      },
      {
        time: "Saturday, 5:00 PM",
        title: "Reception & dinner",
        details:
          "Dinner and the evening celebration unfold in a setting that already feels memorable."
      },
      {
        time: "Sunday, 11:00 AM",
        title: "A final garden morning",
        details:
          "One last chance for guests to enjoy the setting before heading home."
      }
    ],
    dayTwoTitle: "A final morning in the gardens",
    dayTwoDescription:
      "The setting naturally supports that last, quieter gathering that makes a weekend wedding feel complete.",
    faq: [
      {
        q: "Would this suit guests making a holiday of the weekend?",
        a: "Yes. The venue and wider Killarney area make that very easy to position and explain."
      },
      {
        q: "Can the website lean into the scenery without becoming cliché?",
        a: "Absolutely. Tailored copy makes it much easier to keep the tone refined."
      },
      {
        q: "Could local activity ideas sit alongside the guest info?",
        a: "Yes. That kind of extra guidance works especially well for a scenic destination-style stay."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Spring 2023",
        title: "They met",
        note:
          "A quick connection became something steady and full of ease."
      },
      {
        dateLabel: "Autumn 2024",
        title: "Shared escapes mattered more and more",
        note:
          "The best moments were often the slower ones in beautiful places."
      },
      {
        dateLabel: "Summer 2025",
        title: "They got engaged",
        note:
          "A very happy yes, followed by plenty of dreaming about what came next."
      },
      {
        dateLabel: "Winter 2026",
        title: "The landscape became part of the vision",
        note:
          "They wanted somewhere guests would feel immersed rather than merely hosted."
      },
      {
        dateLabel: "Spring 2028",
        title: "Now the celebration gathers",
        note:
          "A wedding weekend shaped around scenery, calm hosting, and time together."
      }
    ],
    fontBody: "var(--font-lato), Arial, sans-serif",
    fontDisplay: "var(--font-cormorant), Garamond, serif",
    fontScript: "var(--font-great-vibes), 'Snell Roundhand', cursive"
  },
  {
    slug: "sheen-falls-lodge",
    venueName: "Sheen Falls Lodge",
    shortLabel: "Sheen Falls Lodge",
    metadataTitle: "Sheen Falls Lodge wedding website concept",
    couple: "Roisin & Mark",
    date: "September 21, 2028",
    themeId: "maison-mosaic",
    location: "Kenmare, Kerry",
    mapQuery: "Sheen Falls Lodge Kenmare",
    officialUrl: "https://www.sheenfallslodge.ie/",
    airportLabel: "Kerry Airport",
    airportQuery: "Kerry Airport",
    airportDetail: "A practical arrival point for many guests travelling into south Kerry.",
    nearbyAreaLabel: "Kenmare",
    nearbyAreaDetail: "A lovely guest base with shops, dining, and a more complete village stay.",
    extraAreaLabel: "The lodge setting",
    extraAreaDetail: "A more immersive luxury stay for guests who want the full riverside feel.",
    tagline:
      "A refined countryside-lodge wedding website shaped around scenery, hospitality, and a guest experience that feels thoughtful from the very first click.",
    announcement:
      "Sheen Falls Lodge is exactly the kind of venue where a website can do more than deliver information. It can begin the atmosphere early, giving guests a real sense of the place, the pace, and the level of care behind the weekend.",
    locationOverviewHtml:
      "<p>Kenmare and the lodge setting together create a particularly strong destination feeling. Guests understand quickly that this is not just a ceremony location, but a weekend worth sinking into properly.</p><p>That is why a more tailored digital experience fits so naturally here.</p>",
    stayDescription:
      "A riverside luxury stay with beautiful food, a calm sense of privacy, and the kind of setting guests often remember as much as the celebration itself.",
    scheduleHeading: "A Lodge Weekend In Kenmare",
    scheduleDescription:
      "A first-draft outline that keeps guests reassured while still letting the lodge atmosphere carry the mood of the page.",
    schedule: [
      {
        time: "Friday evening",
        title: "Guests arrive into Kenmare",
        details:
          "Check-ins, village wanderings, and the beginning of a slower, more scenic weekend."
      },
      {
        time: "Saturday, 1:30 PM",
        title: "Guests gather at the lodge",
        details:
          "A little time to settle before the main celebrations begin."
      },
      {
        time: "Saturday, 3:00 PM",
        title: "Ceremony",
        details:
          "The wedding begins in a setting that already feels elegant and deeply rooted in place."
      },
      {
        time: "Saturday, 5:00 PM",
        title: "Reception & dinner",
        details:
          "Food, toasts, and the evening celebration continue in a venue made for beautiful hosting."
      },
      {
        time: "Sunday, 11:00 AM",
        title: "A final riverside morning",
        details:
          "A slower farewell gives the weekend one last polished note."
      }
    ],
    dayTwoTitle: "A final riverside morning",
    dayTwoDescription:
      "Luxury lodge venues do this especially well: a final catch-up that still feels part of the celebration rather than the aftermath of it.",
    faq: [
      {
        q: "Would this work well for a more destination-style Irish wedding?",
        a: "Yes. Kenmare gives guests a lovely sense of place, and the lodge setting helps the weekend feel intentional from the start."
      },
      {
        q: "Can the venue itself be highlighted more strongly in the site copy?",
        a: "Absolutely. That is one of the main advantages of a tailored page."
      },
      {
        q: "Could this include RSVP and guest queries later on?",
        a: "Yes. The structure is designed to expand into those practical guest tools very cleanly."
      }
    ],
    storyTimeline: [
      {
        dateLabel: "Winter 2022",
        title: "They met",
        note:
          "A first conversation that lingered far longer than either of them expected."
      },
      {
        dateLabel: "Summer 2024",
        title: "Beautiful places became part of their story",
        note:
          "Scenery and slower weekends kept returning as the moments they loved most."
      },
      {
        dateLabel: "Spring 2025",
        title: "They got engaged",
        note:
          "A very easy yes and a lot of joyful planning afterwards."
      },
      {
        dateLabel: "Autumn 2026",
        title: "A destination-feel venue stood out",
        note:
          "They wanted a weekend that felt intimate, polished, and memorable for guests."
      },
      {
        dateLabel: "Autumn 2028",
        title: "Now the celebration begins",
        note:
          "A wedding weekend shaped around calm luxury, scenery, and proper hospitality."
      }
    ],
    fontBody: "var(--font-lato), Arial, sans-serif",
    fontDisplay: "var(--font-playfair), Didot, serif",
    fontScript: "var(--font-alex-brush), 'Snell Roundhand', cursive"
  }
];

export const privateVenuePreviewSlugs = venueConfigs.map((config) => config.slug);

function buildWeddingData(config: VenuePreviewConfig, baseTheme: ThemeDefinition): WeddingData {
  return {
    couple: config.couple,
    date: config.date,
    theme: config.themeId,
    hero: {
      eyebrow: "Wedding Weekend",
      previewNote:
        "This is a private venue concept page prepared for selective sharing only.",
      primaryActionLabel: "View the weekend",
      primaryActionHref: "#schedule",
      secondaryActionLabel: "Explore stay options",
      secondaryActionHref: "#stay"
    },
    locationSummary: config.location,
    tagline: config.tagline,
    announcement: config.announcement,
    announcementHtml: config.announcementHtml,
    heroImage: config.heroImage ?? baseTheme.heroImage,
    story: {
      heading: "Our Story So Far",
      paragraphs: [],
      timelineOnly: true,
      timeline: config.storyTimeline
    },
    ceremony: {
      title: "Ceremony",
      time: "3:00 PM",
      location: config.venueName,
      address: config.location,
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(config.mapQuery)}`,
      description:
        config.slug === "fota-island-resort"
          ? "Guests are welcomed into Fota Island Resort with enough time to settle into the grounds and enjoy the setting before the ceremony begins."
          : "Guests are welcomed into a setting where the atmosphere is already doing some of the work before the ceremony begins."
    },
    reception: {
      title: "Reception",
      time: "5:00 PM",
      location: config.venueName,
      address: config.location,
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(config.mapQuery)}`,
      description:
        config.slug === "fota-island-resort"
          ? "Dinner, drinks, and the evening celebration continue at Fota Island Resort, keeping the guest experience smooth, elegant, and beautifully contained in one destination."
          : "Dinner, drinks, and the evening celebration continue in the same venue, keeping the guest experience smooth and beautifully contained."
    },
    scheduleEyebrow: "Wedding Weekend",
    scheduleHeading: config.scheduleHeading,
    scheduleDescription: config.scheduleDescription,
    scheduleNote:
      "A guest website works best when it makes the structure feel easy rather than over-explained.",
    scheduleStepLabel: "Moment",
    schedule: config.schedule,
    dayTwo: {
      eyebrow: "Day Two",
      title: config.dayTwoTitle,
      description: config.dayTwoDescription,
      panelEyebrow: "Sunday",
      panelTitle: "A slower finish",
      details:
        "Even when the final morning is still being shaped, the website can hold the tone of the weekend and the practical guest guidance in one place.",
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(config.mapQuery)}`
    },
    travel: {
      heading: "Travel & Key Locations",
      description:
        "Everything guests usually want first, from where to arrive and stay to why this venue works so well for a full wedding weekend.",
      mapUtilityEyebrow: "Map & Area",
      mapUtilityTitle: "The shape of the weekend",
      mapUtilityDescription:
        "A simple overview of the key arrival point, the venue itself, and the nearby guest bases most likely to matter.",
      locationOverviewTitle: `Why ${config.shortLabel} works so well`,
      locationOverviewHtml: config.locationOverviewHtml,
      mapSpots: [
        {
          label: config.airportLabel,
          detail: config.airportDetail,
          href: `https://maps.google.com/?q=${encodeURIComponent(config.airportQuery)}`
        },
        {
          label: config.venueName,
          detail: config.stayDescription,
          href: config.officialUrl
        },
        {
          label: config.nearbyAreaLabel,
          detail: config.nearbyAreaDetail
        },
        {
          label: config.extraAreaLabel,
          detail: config.extraAreaDetail
        }
      ],
      transport:
        "Guests staying at or very close to the venue tend to find the wedding day especially easy, while those travelling in can still understand the broader weekend shape at a glance.",
      parking:
        "Parking and on-site logistics can be kept clear without adding too much text when the key venue details are structured well.",
      directions:
        `${config.shortLabel} is the natural anchor point for the weekend, with a nearby arrival route and enough surrounding context for guests to plan confidently.`,
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(config.mapQuery)}`,
      relaxedNote:
        "The best guest websites make the weekend feel more inviting and less like another admin task."
    },
    accommodationEyebrow: "Accommodation",
    accommodationTitle: "Places To Stay",
    accommodationDescription:
      "A venue-led accommodation section that can gently encourage guests towards the best base while still keeping the tone polished.",
    accommodation: [
      {
        name: `Stay at ${config.venueName}`,
        note: config.stayDescription,
        link: config.officialUrl,
        linkLabel: `Visit ${config.shortLabel}`
      },
      {
        name: config.nearbyAreaLabel,
        note: config.nearbyAreaDetail
      },
      {
        name: config.extraAreaLabel,
        note: config.extraAreaDetail
      }
    ],
    suppliersEyebrow: "Suppliers",
    suppliersTitle: "Local Recommendations",
    suppliersDescription: "",
    suppliers: [],
    faq: config.faq,
    rsvp: {
      eyebrow: "Guest Replies",
      title: "RSVP & Guest Details",
      label: "RSVP example",
      description:
        "This section can gather replies, meal choices, and practical guest notes cleanly in one place.",
      url: `mailto:hello@craftedweddingsites.ie?subject=${encodeURIComponent(`${config.shortLabel} concept`)}`,
      interactiveFormEnabled: false,
      deadlineEyebrow: "Typical timeline",
      deadline: "Replies by six to eight weeks before the wedding",
      panelDescription:
        "In a live couple version, guests would reply here while keeping everything calm, clear, and easy to manage."
    },
    gallery: {
      heading: "Venue Feel",
      description: "A page like this can start building atmosphere before the first invitation is even opened.",
      images: []
    },
    registry: {
      message: "",
      links: []
    },
    contact: {
      email: "hello@craftedweddingsites.ie",
      note:
        "For couples, this kind of page keeps the guest experience polished from the first look through to replies, timings, and travel details."
      ,
      footerLine: config.footerLine,
      legalNote: config.legalNote
    },
    aiConciergeEnabled: false,
    styleOptions: {
      disableSectionOrnaments: true,
      compactSplitHero: true,
      heroImageBrightness: config.heroImageBrightness ?? 1,
      heroImageObjectPosition: config.heroImageObjectPosition ?? "center center"
    },
    sectionVisibility: {
      heroEyebrow: true,
      date: true,
      locationSummary: true,
      tagline: true,
      announcement: true,
      heroActions: true,
      previewNote: false,
      schedule: true,
      travel: true,
      ceremonyCard: true,
      receptionCard: true,
      transportCard: true,
      directionsCard: true,
      relaxedNote: true,
      accommodation: true,
      suppliers: false,
      dayTwo: true,
      story: true,
      gallery: false,
      registry: false,
      rsvp: true,
      faq: true,
      aiConcierge: false
    }
  };
}

export function getPrivateVenuePreviewPageData(slug: string): VenuePreviewPageData | null {
  const config = venueConfigs.find((entry) => entry.slug === slug);

  if (!config) {
    return null;
  }

  const routePath = `/private-preview/${config.slug}`;
  const baseTheme = getThemeById(config.themeId);
  const themedStyle = {
    ...baseTheme.style,
    "--font-body": config.fontBody,
    "--font-display": config.fontDisplay,
    "--font-script": config.fontScript
  } as CSSProperties;

  return {
    routePath,
    metadataTitle: config.metadataTitle,
    theme: {
      ...baseTheme,
      style: themedStyle
    },
    weddingData: buildWeddingData(config, baseTheme)
  };
}
