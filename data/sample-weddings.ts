import type { WeddingData } from "@/types/wedding";

const sharedRsvpForm = {
  title: "Let Us Know If You Can Make It",
  intro:
    "Share your reply here, including any dietary requirements or anything helpful we should know ahead of the day.",
  attendingLabel: "Yes, I'll be there",
  declinedLabel: "Sorry, I can't make it",
  submitLabel: "Send RSVP",
  enableGuestCount: true,
  enableMealChoice: true,
  enableDietaryNotes: true,
  dietaryInputType: "text" as const,
  enableSongRequest: false,
  enableMessageToCouple: true,
  customQuestions: [
    {
      id: "day-two",
      label: "Will you be joining us for day two?",
      type: "yesno" as const,
      required: false
    }
  ]
};

export const sampleWeddingVariants: Record<string, WeddingData> = {
  "manor-house": {
    couple: "Eleanor & Patrick",
    date: "June 27, 2027",
    theme: "soft-blush",
    hero: {
      eyebrow: "Wedding Day",
      previewNote:
        "This is a sample guest website showing how a fuller draft can look once details, styling, and wording are pulled together.",
      primaryActionLabel: "RSVP Details",
      primaryActionHref: "#rsvp",
      secondaryActionLabel: "Wedding Details",
      secondaryActionHref: "#faq"
    },
    locationSummary: "Ballymagarvey Village, Co. Meath",
    tagline:
      "A warm summer celebration in the countryside, with a long lunch, music into the evening, and everyone we love in one place.",
    announcement:
      "We wanted the website to feel calm, clear, and genuinely useful for guests travelling in for the full weekend.",
    heroImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    story: {
      heading: "Our Story",
      paragraphs: [
        "We met through mutual friends at a winter dinner party, and what was meant to be one easy conversation somehow turned into the start of everything.",
        "Over the years, the big milestones have been wonderful, but it is the quiet rhythm of ordinary life together that made us certain we wanted to do all of this side by side.",
        "Now we cannot wait to bring everyone together in one place, slow the pace for a weekend, and celebrate properly."
      ],
      featureImages: [
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    ceremony: {
      title: "Ceremony",
      time: "2:00 PM",
      location: "The Orangery, Ballymagarvey Village",
      address: "Ballymagarvey Village, Balrath, Navan, Co. Meath",
      mapLink:
        "https://maps.google.com/?q=Ballymagarvey+Village+Balrath+Navan+Co+Meath",
      description:
        "Guests are invited to arrive from 1:30 PM so there is time to settle in before the ceremony begins."
    },
    reception: {
      title: "Reception",
      time: "4:00 PM",
      location: "Main House & Courtyard, Ballymagarvey Village",
      address: "Ballymagarvey Village, Balrath, Navan, Co. Meath",
      mapLink:
        "https://maps.google.com/?q=Ballymagarvey+Village+Balrath+Navan+Co+Meath",
      description:
        "Drinks in the courtyard, dinner in the house, speeches, and music into the evening."
    },
    scheduleEyebrow: "Wedding Timeline",
    scheduleHeading: "What Happens And When",
    scheduleDescription:
      "A clear outline of the celebration so guests can settle in, enjoy the day, and know where they need to be.",
    scheduleNote:
      "If you are staying nearby, there is no need to over-plan the day. Everything happens on site, so once you arrive you can simply enjoy it.",
    scheduleStepLabel: "Moment",
    schedule: [
      {
        time: "1:30 PM",
        title: "Guests Arrive",
        details: "Welcome drinks and time to find your seat before the ceremony."
      },
      {
        time: "2:00 PM",
        title: "Ceremony Begins",
        details: "Our ceremony begins in the Orangery."
      },
      {
        time: "3:00 PM",
        title: "Drinks & Photos",
        details: "A relaxed drinks hour while we take a few family photographs."
      },
      {
        time: "4:15 PM",
        title: "Dinner Is Served",
        details: "Guests move inside for dinner and the start of the reception."
      },
      {
        time: "6:30 PM",
        title: "Speeches",
        details: "A few words before the evening party gets going."
      },
      {
        time: "9:00 PM",
        title: "Band & Dancing",
        details: "Live music, dancing, and a proper summer wedding party."
      }
    ],
    dayTwo: {
      eyebrow: "Day Two",
      title: "A relaxed second day",
      description:
        "For anyone staying on, we are keeping Sunday easy: good food, no formality, and plenty of time to catch up properly.",
      panelEyebrow: "Sunday",
      panelTitle: "Garden brunch from 1 PM",
      details:
        "Join us back at the estate for a laid-back brunch, coffee, and a final catch-up before everyone heads home.",
      mapLink:
        "https://maps.google.com/?q=Ballymagarvey+Village+Balrath+Navan+Co+Meath"
    },
    travel: {
      heading: "Venue & Travel",
      description:
        "The key details guests need for finding the venue, arriving easily, and staying nearby.",
      mapUtilityEyebrow: "Map & Area",
      mapUtilityTitle: "Useful locations at a glance",
      mapUtilityDescription:
        "A quick guide to the places guests are most likely to need over the weekend.",
      locationOverviewTitle: "Around Ballymagarvey",
      locationOverviewHtml:
        "<p>Ballymagarvey is close to Navan and within easy reach of Dublin Airport, which makes the weekend very straightforward for guests travelling in.</p>",
      relaxedNote:
        "Once you arrive, the rest of the day is easy to enjoy without much moving around.",
      mapSpots: [
        {
          label: "Airport",
          detail: "Dublin Airport is the most convenient arrival point for guests travelling in.",
          href: "https://maps.google.com/?q=Dublin+Airport"
        },
        {
          label: "Venue",
          detail: "Ballymagarvey Village for the ceremony, drinks, dinner, and dancing.",
          href:
            "https://maps.google.com/?q=Ballymagarvey+Village+Balrath+Navan+Co+Meath"
        },
        {
          label: "Navan",
          detail: "The nearest town for taxis, groceries, and last-minute essentials."
        }
      ],
      transport:
        "Most guests will travel by car or taxi, so arranging your return in advance is a good idea if you are staying nearby.",
      parking:
        "Parking is available on site, with plenty of space for guests driving to the venue.",
      directions:
        "The estate is around 45 minutes from Dublin Airport and just outside Navan, which keeps arrivals very straightforward.",
      mapLink:
        "https://maps.google.com/?q=Ballymagarvey+Village+Balrath+Navan+Co+Meath",
      sneakPeekImage:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80"
    },
    accommodationEyebrow: "Accommodation",
    accommodationTitle: "Places To Stay",
    accommodationDescription:
      "A few nearby options for guests travelling in for the celebration.",
    accommodation: [
      {
        name: "Bellinter House",
        note: "A polished hotel option around 20 minutes away, ideal if guests want a full hotel stay.",
        link: "https://www.bellinterhouse.com/",
        linkLabel: "View accommodation"
      },
      {
        name: "The Darnley Lodge",
        note: "A comfortable Navan base for guests who want something central and easy.",
        link: "https://www.darnleylodgehotel.ie/",
        linkLabel: "View hotel"
      },
      {
        name: "Balrath Courtyard Houses",
        note: "Shared house-style accommodation that works especially well for families or close friends staying the full weekend.",
        link: "https://www.airbnb.ie/",
        linkLabel: "View Airbnb"
      }
    ],
    suppliersEyebrow: "Local Suppliers",
    suppliersTitle: "Helpful local recommendations",
    suppliersDescription:
      "A short list of nearby suppliers some guests may find useful before the weekend.",
    suppliers: [
      {
        name: "The Bridal Lounge",
        category: "Hair & Makeup",
        note: "Local bridal hair and makeup team for guests booking in ahead of the day.",
        link: "https://thebridallounge.ie/"
      },
      {
        name: "Navan Executive Travel",
        category: "Transport",
        note: "Useful for airport runs, guest transfers, or a late return after the reception.",
        link: "https://www.executivetravel.ie/"
      },
      {
        name: "Flowers by Moira",
        category: "Florist",
        note: "A trusted local florist if anyone wants a room delivery or small floral extra for the weekend.",
        link: "https://flowersbymoira.ie/"
      }
    ],
    faq: [
      {
        q: "Can I bring a plus one?",
        a: "Only if your invitation or RSVP link includes a plus one."
      },
      {
        q: "Are children invited?",
        a: "Children from the immediate family are included, but otherwise this will be an adults-focused celebration."
      },
      {
        q: "What should I wear?",
        a: "Formal summer wedding attire. The day will move between indoor and outdoor spaces, so light layers are a good idea."
      },
      {
        q: "Will transport be provided?",
        a: "Transport is not being organised centrally, so we recommend booking taxis or planning lifts in advance."
      }
    ],
    rsvp: {
      eyebrow: "RSVP",
      title: "Let Us Know If You Can Make It",
      label: "RSVP with Eleanor & Patrick",
      description:
        "Please get in touch with any questions, updates, or changes before the wedding.",
      url: "mailto:hello@craftedweddingsites.ie",
      deadlineEyebrow: "Deadline",
      deadline: "Friday, 29th April 2027",
      panelDescription:
        "Please RSVP by the date above so final numbers, seating, and guest arrangements can all be wrapped up in good time.",
      form: sharedRsvpForm
    },
    gallery: {
      heading: "A Few Favourite Moments",
      description: "A little glimpse of us before the day itself.",
      images: [
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    registry: {
      message:
        "Your presence is more than enough, and we are simply looking forward to celebrating with everyone in one place.",
      links: []
    },
    contact: {
      email: "hello@craftedweddingsites.ie",
      note:
        "If there is anything you cannot find here, please send us a note and we will point you in the right direction."
    },
    aiConciergeEnabled: true,
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
      suppliers: true,
      dayTwo: true,
      story: true,
      gallery: true,
      registry: false,
      rsvp: true,
      faq: true,
      aiConcierge: true
    }
  },
  "atlantic-weekend": {
    couple: "Saoirse & Conor",
    date: "August 21, 2027",
    theme: "summer-garden",
    hero: {
      eyebrow: "Wedding Weekend",
      previewNote:
        "This is a sample guest website showing a fuller destination-style weekend with travel, stays, suppliers, and day-two plans included.",
      primaryActionLabel: "Weekend Details",
      primaryActionHref: "#schedule",
      secondaryActionLabel: "RSVP",
      secondaryActionHref: "#rsvp"
    },
    locationSummary: "Spanish Point, Co. Clare",
    tagline:
      "A west coast wedding weekend with sea air, a long dinner, and a second day everyone will actually want to stay for.",
    announcement:
      "For weddings where guests travel in and make a proper weekend of it, the website can hold far more than just the ceremony time.",
    heroImage:
      "https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    story: {
      heading: "Our Story",
      paragraphs: [
        "We got to know each other slowly at first, but once life lined us up properly, everything after that felt very easy.",
        "Trips west became our favourite escape, and over time the coast started to feel like the obvious place to gather everyone we love.",
        "We wanted a weekend that felt joyful without being too formal, with time for the big celebration and time to properly catch up the next day too."
      ],
      featureImages: [
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    ceremony: {
      title: "Ceremony",
      time: "1:30 PM",
      location: "Armada House",
      address: "Spanish Point, Miltown Malbay, Co. Clare",
      mapLink: "https://maps.google.com/?q=Armada+House+Spanish+Point+Clare",
      description: "Guests are invited to arrive from 1:00 PM for a relaxed start before the ceremony."
    },
    reception: {
      title: "Reception",
      time: "3:30 PM",
      location: "The Armada Hotel",
      address: "Spanish Point, Miltown Malbay, Co. Clare",
      mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point+Clare",
      description: "Drinks by the coast, dinner, speeches, and dancing into the night."
    },
    scheduleEyebrow: "Wedding Weekend",
    scheduleHeading: "What Happens And When",
    scheduleDescription:
      "A clear outline of the day so guests can arrive settled, enjoy the celebration, and know what comes next.",
    scheduleNote:
      "If you are staying locally, everything is close by, so there is plenty of space to enjoy the day without rushing.",
    scheduleStepLabel: "Moment",
    schedule: [
      { time: "1:00 PM", title: "Guests Arrive", details: "Arrival drinks and welcome." },
      { time: "1:30 PM", title: "Ceremony Begins", details: "Our ceremony begins by the coast." },
      { time: "2:15 PM", title: "Drinks & Photos", details: "Time to enjoy the view while we slip away for a few photos." },
      { time: "4:00 PM", title: "Dinner", details: "Guests move inside for dinner and speeches." },
      { time: "7:00 PM", title: "Sunset Break", details: "A short pause to get outside, breathe, and make the most of the evening light." },
      { time: "9:00 PM", title: "Band & Dancing", details: "Live music and a proper west coast party." }
    ],
    dayTwo: {
      eyebrow: "Day Two",
      title: "Keep the weekend going",
      description:
        "Anyone staying on is invited to join us for a very easy second day by the sea.",
      panelEyebrow: "Sunday",
      panelTitle: "Brunch and pints from 2 PM",
      details:
        "We will be back at the Armada for brunch, a few pints, and a final catch-up before everyone heads off.",
      mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point+Clare"
    },
    travel: {
      heading: "Venue & Travel",
      description:
        "Everything guests need to find the venue, stay comfortably nearby, and make the most of the weekend.",
      mapUtilityEyebrow: "Map & Area",
      mapUtilityTitle: "Useful locations at a glance",
      mapUtilityDescription:
        "A quick guide to the main places guests are most likely to need for the weekend.",
      locationOverviewTitle: "Around Spanish Point",
      locationOverviewHtml:
        "<p>Spanish Point is one of those places where a wedding naturally becomes a weekend. Guests can stay close, walk between key spots, and enjoy the coast without over-planning.</p>",
      relaxedNote:
        "The west coast pace is part of the charm, so leave yourself a little breathing room and enjoy the weekend as it unfolds.",
      mapSpots: [
        { label: "Airport", detail: "Shannon Airport is the most convenient arrival point.", href: "https://maps.google.com/?q=Shannon+Airport" },
        { label: "Venue", detail: "The Armada for the ceremony, dinner, and day two gathering.", href: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point+Clare" },
        { label: "Beach Walk", detail: "Spanish Point beach is the perfect gentle reset before check-in or brunch." },
        { label: "Miltown Malbay", detail: "Nearest town for shops, taxis, and essentials." }
      ],
      transport:
        "Driving is the simplest option for most guests, but taxis should be booked ahead, especially late in the evening.",
      parking:
        "Parking is available on site for guests staying or driving in for the day.",
      directions:
        "Spanish Point is around an hour from Shannon Airport and an easy drive once guests are on the coast road.",
      mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point+Clare",
      sneakPeekImage:
        "https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1400"
    },
    accommodationEyebrow: "Accommodation",
    accommodationTitle: "Places To Stay",
    accommodationDescription:
      "A few nearby options for guests making a full weekend of it.",
    accommodation: [
      {
        name: "The Armada Hotel",
        note: "The easiest option for guests who want to stay right at the heart of the celebration.",
        link: "https://www.armadahotel.com/",
        linkLabel: "View hotel"
      },
      {
        name: "Bellbridge House Hotel",
        note: "A nearby base in Spanish Point that keeps everything very easy.",
        link: "https://www.bellbridgehousehotelclare.com/",
        linkLabel: "View hotel"
      },
      {
        name: "Coastal Airbnb Stays",
        note: "A good option for families or groups who want to stay together nearby.",
        link: "https://www.airbnb.ie/",
        linkLabel: "View accommodation"
      }
    ],
    suppliersEyebrow: "Suppliers",
    suppliersTitle: "Helpful local extras",
    suppliersDescription:
      "Useful recommendations for guests who want to book a few extras ahead of the weekend.",
    suppliers: [
      {
        name: "Catherine O'Brien Makeup",
        category: "Hair & Makeup",
        note: "A local beauty contact for guests booking appointments before the wedding.",
        link: "https://www.instagram.com/"
      },
      {
        name: "Banner Cabs",
        category: "Transport",
        note: "Useful for airport runs and late-night returns if you are not driving.",
        link: "https://www.google.com/search?q=clare+taxi+service"
      },
      {
        name: "The French Room",
        category: "Beauty",
        note: "A local salon option for blow-dries or appointments before the weekend.",
        link: "https://www.instagram.com/"
      }
    ],
    faq: [
      { q: "Can I stay for day two?", a: "Absolutely. If you are around on Sunday, we would love to see you." },
      { q: "Do I need a car?", a: "A car is helpful, but if you are staying locally you can also pre-book taxis." },
      { q: "What should I wear?", a: "Formal wedding attire for Saturday, something comfortable and relaxed for Sunday." },
      { q: "Will the wedding be outdoors?", a: "Parts of the day may move outdoors depending on the weather, so it is worth bringing a layer." }
    ],
    rsvp: {
      eyebrow: "RSVP",
      title: "Let Us Know If You Can Make It",
      label: "RSVP with Saoirse & Conor",
      description:
        "Please let us know if you can join us, and whether you will be around for brunch the next day too.",
      url: "mailto:hello@craftedweddingsites.ie",
      deadlineEyebrow: "Deadline",
      deadline: "Monday, 10th May 2027",
      panelDescription:
        "Reply here with your attendance, dietary notes, and whether you will be joining us for day two.",
      form: sharedRsvpForm
    },
    gallery: {
      heading: "A Few Favourite Moments",
      description: "A little glimpse of the coast and the kind of weekend we wanted to create.",
      images: [
        "https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    registry: { message: "Your presence is plenty, and we are simply delighted you are making the trip.", links: [] },
    contact: {
      email: "hello@craftedweddingsites.ie",
      note: "If there is anything you need before the weekend, please let us know."
    },
    aiConciergeEnabled: true,
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
      suppliers: true,
      dayTwo: true,
      story: true,
      gallery: true,
      registry: false,
      rsvp: true,
      faq: true,
      aiConcierge: true
    }
  },
  "black-tie-city": {
    couple: "Amelia & Luca",
    date: "November 6, 2027",
    theme: "tailored-vows",
    hero: {
      eyebrow: "Wedding Day",
      previewNote:
        "This sample shows a sharper black-tie direction, with a more formal tone and a cleaner invitation-style layout.",
      primaryActionLabel: "RSVP Details",
      primaryActionHref: "#rsvp",
      secondaryActionLabel: "Venue Details",
      secondaryActionHref: "#travel"
    },
    locationSummary: "The Merrion, Dublin",
    tagline:
      "A formal city wedding with a classic ceremony, candlelit dinner, and a long evening in the heart of Dublin.",
    announcement:
      "For couples planning a more formal wedding, the website can still feel elegant, minimal, and beautifully structured.",
    heroImage:
      "https://images.pexels.com/photos/33425288/pexels-photo-33425288.jpeg?auto=compress&cs=tinysrgb&w=1600",
    story: {
      heading: "Our Story",
      paragraphs: [
        "We met while both living in Dublin, and somewhere between late dinners, long walks, and busy weeks, the city became ours.",
        "What began as one very good date slowly became a life that feels both grounding and full of possibility.",
        "We wanted the wedding to feel like that too — elegant, warm, and full of the people who matter most."
      ],
      featureImages: [
        "https://images.pexels.com/photos/29821868/pexels-photo-29821868.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/34433181/pexels-photo-34433181.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/21928758/pexels-photo-21928758.jpeg?auto=compress&cs=tinysrgb&w=1200"
      ]
    },
    ceremony: {
      title: "Ceremony",
      time: "3:00 PM",
      location: "The Merrion Drawing Rooms",
      address: "Merrion Street Upper, Dublin 2",
      mapLink: "https://maps.google.com/?q=The+Merrion+Dublin",
      description: "Guests are invited to arrive from 2:30 PM."
    },
    reception: {
      title: "Reception",
      time: "5:00 PM",
      location: "The Merrion",
      address: "Merrion Street Upper, Dublin 2",
      mapLink: "https://maps.google.com/?q=The+Merrion+Dublin",
      description: "Champagne, dinner, speeches, and dancing all under one roof."
    },
    scheduleEyebrow: "Wedding Day",
    scheduleHeading: "What Happens And When",
    scheduleDescription:
      "A simple guide to the afternoon and evening so guests can settle in and enjoy the celebration.",
    scheduleStepLabel: "Moment",
    schedule: [
      { time: "2:30 PM", title: "Arrival", details: "Guests arrive at the hotel and settle in ahead of the ceremony." },
      { time: "3:00 PM", title: "Ceremony", details: "Our ceremony begins in the Drawing Rooms." },
      { time: "4:00 PM", title: "Champagne Reception", details: "A short drinks reception before dinner." },
      { time: "5:00 PM", title: "Dinner", details: "Guests move through to dinner and the start of the evening." },
      { time: "7:00 PM", title: "Speeches", details: "A few words before the party begins." },
      { time: "9:30 PM", title: "Dancing", details: "The band starts and we celebrate into the night." }
    ],
    dayTwo: {
      eyebrow: "Day Two",
      title: "A final city catch-up",
      description:
        "For anyone still in Dublin on Sunday, we will be meeting for coffee and brunch before people start travelling home.",
      panelEyebrow: "Sunday",
      panelTitle: "Brunch in town from 12 PM",
      details: "We will share the brunch spot with anyone staying on once final numbers are clear.",
      mapLink: "https://maps.google.com/?q=Dublin+2"
    },
    travel: {
      heading: "Venue & Travel",
      description:
        "Everything guests need to find the hotel, stay nearby, and move around the city smoothly.",
      mapUtilityEyebrow: "Map & Area",
      mapUtilityTitle: "Useful locations at a glance",
      mapUtilityDescription:
        "A quick guide to the places guests are most likely to need across the weekend.",
      locationOverviewTitle: "Around Merrion Square",
      locationOverviewHtml:
        "<p>The beauty of a city wedding is that guests can stay centrally and walk almost everywhere they need to be across the weekend.</p>",
      relaxedNote:
        "Dublin is easy to move through once you are central, so the weekend should feel simple and low-stress for guests.",
      mapSpots: [
        { label: "Venue", detail: "The Merrion for ceremony, dinner, and dancing.", href: "https://maps.google.com/?q=The+Merrion+Dublin" },
        { label: "Airport", detail: "Dublin Airport for international arrivals.", href: "https://maps.google.com/?q=Dublin+Airport" },
        { label: "City Centre", detail: "Shops, taxis, restaurants, and late-night options all within easy reach." },
        { label: "Brunch Area", detail: "Merrion Square and surrounding streets for Sunday coffee and brunch." }
      ],
      transport:
        "Taxis and rideshares are easy to find in the city, and most guests staying centrally should be able to walk to key locations.",
      parking:
        "If you are driving into the city, valet or hotel parking should be arranged directly with your accommodation.",
      directions:
        "The Merrion is in Dublin 2 and very straightforward to reach from the airport or any central hotel.",
      mapLink: "https://maps.google.com/?q=The+Merrion+Dublin",
      sneakPeekImage:
        "https://images.pexels.com/photos/29821868/pexels-photo-29821868.jpeg?auto=compress&cs=tinysrgb&w=1400"
    },
    accommodationEyebrow: "Accommodation",
    accommodationTitle: "Places To Stay",
    accommodationDescription:
      "A few polished options within easy reach of the celebration.",
    accommodation: [
      {
        name: "The Merrion",
        note: "Ideal for guests who want to stay right where the wedding is happening.",
        link: "https://www.merrionhotel.com/",
        linkLabel: "View hotel"
      },
      {
        name: "The Davenport",
        note: "A comfortable nearby option for guests who want to stay central without staying on site.",
        link: "https://www.doylecollection.com/hotels/the-davenport-hotel",
        linkLabel: "View accommodation"
      },
      {
        name: "The Alex",
        note: "A modern Dublin 2 base within easy reach of the venue.",
        link: "https://www.thealexhotel.ie/",
        linkLabel: "View hotel"
      }
    ],
    suppliersEyebrow: "Suppliers",
    suppliersTitle: "Helpful local recommendations",
    suppliersDescription:
      "Useful Dublin options for guests booking appointments or extras before the day.",
    suppliers: [
      {
        name: "Belfast Avenue Hair",
        category: "Hair",
        note: "A polished city-centre hair option for guests booking in before the ceremony.",
        link: "https://www.google.com/search?q=dublin+hair+salon"
      },
      {
        name: "Makeup by Sinead",
        category: "Makeup",
        note: "Recommended for guests who want a professional makeup booking ahead of the day.",
        link: "https://www.instagram.com/"
      },
      {
        name: "VIP Chauffeurs Dublin",
        category: "Transport",
        note: "Useful for airport pick-ups or family transport across the weekend.",
        link: "https://www.google.com/search?q=dublin+chauffeur+service"
      }
    ],
    faq: [
      { q: "Is there a dress code?", a: "Yes — black tie." },
      { q: "Can I bring children?", a: "This celebration will be adults only." },
      { q: "Do we need to arrange transport?", a: "Most guests staying centrally will be able to walk or take a short taxi ride." },
      { q: "Will there be a day two event?", a: "Yes, there will be an optional brunch for anyone still in Dublin on Sunday." }
    ],
    rsvp: {
      eyebrow: "RSVP",
      title: "Let Us Know If You Can Make It",
      label: "RSVP with Amelia & Luca",
      description:
        "Please reply here with your attendance, dietary requirements, and any details we should know.",
      url: "mailto:hello@craftedweddingsites.ie",
      deadlineEyebrow: "Deadline",
      deadline: "Friday, 3rd September 2027",
      panelDescription:
        "We would be grateful for replies by the date above so seating and final arrangements can all be confirmed in good time.",
      form: sharedRsvpForm
    },
    gallery: {
      heading: "A Few Favourite Moments",
      description: "A glimpse of the city mood and the sharper, more formal look of the day.",
      images: [
        "https://images.pexels.com/photos/33425288/pexels-photo-33425288.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/29821868/pexels-photo-29821868.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/34433181/pexels-photo-34433181.jpeg?auto=compress&cs=tinysrgb&w=1200"
      ]
    },
    registry: {
      message:
        "Your presence is more than enough, and we are simply excited to celebrate with you.",
      links: []
    },
    contact: {
      email: "hello@craftedweddingsites.ie",
      note: "If you need anything before the day, please let us know."
    },
    aiConciergeEnabled: true,
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
      suppliers: true,
      dayTwo: true,
      story: true,
      gallery: true,
      registry: false,
      rsvp: true,
      faq: true,
      aiConcierge: true
    }
  }
};

export const sampleWeddingIds = Object.keys(sampleWeddingVariants);

export type SampleWeddingId = keyof typeof sampleWeddingVariants;
