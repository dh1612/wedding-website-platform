export type WeddingEvent = {
  title: string;
  time: string;
  location: string;
  address?: string;
  description?: string;
  descriptionHtml?: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type TravelInfo = {
  heading: string;
  description: string;
  descriptionHtml?: string;
  transport: string;
  transportHtml?: string;
  parking: string;
  parkingHtml?: string;
  directions: string;
  directionsHtml?: string;
  mapLink: string;
};

export type AccommodationItem = {
  name: string;
  note: string;
  link?: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  details: string;
};

export type RSVPFormQuestion = {
  id: string;
  label: string;
  type: "short" | "long" | "yesno";
  required: boolean;
  placeholder?: string;
};

export type WeddingData = {
  couple: string;
  date: string;
  theme: string;
  locationSummary: string;
  tagline: string;
  announcement: string;
  announcementHtml?: string;
  heroImage: string;
  story: {
    heading: string;
    paragraphs: string[];
    html?: string;
  };
  ceremony: WeddingEvent;
  reception: WeddingEvent;
  schedule: ScheduleItem[];
  travel: TravelInfo;
  accommodation: AccommodationItem[];
  faq: FAQItem[];
  rsvp: {
    label: string;
    description: string;
    url: string;
    deadline: string;
    form?: {
      title: string;
      intro: string;
      introHtml?: string;
      attendingLabel: string;
      declinedLabel: string;
      submitLabel: string;
      enableGuestCount: boolean;
      enableMealChoice: boolean;
      enableDietaryNotes: boolean;
      enableSongRequest: boolean;
      enableMessageToCouple: boolean;
      customQuestions?: RSVPFormQuestion[];
    };
  };
  gallery: {
    heading: string;
    description: string;
    images: string[];
  };
  registry: {
    message: string;
    links: LinkItem[];
  };
  contact: {
    email: string;
    note: string;
  };
  aiConciergeEnabled: boolean;
  sectionVisibility?: {
    locationSummary: boolean;
    tagline: boolean;
    announcement: boolean;
    schedule: boolean;
    travel: boolean;
    ceremonyCard: boolean;
    receptionCard: boolean;
    transportCard: boolean;
    directionsCard: boolean;
    accommodation: boolean;
    story: boolean;
    gallery: boolean;
    registry: boolean;
    rsvp: boolean;
    faq: boolean;
    aiConcierge: boolean;
  };
};
