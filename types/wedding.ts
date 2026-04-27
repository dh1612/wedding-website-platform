export type WeddingEvent = {
  title: string;
  time: string;
  location: string;
  address?: string;
  description?: string;
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
  transport: string;
  parking: string;
  directions: string;
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

export type WeddingData = {
  couple: string;
  date: string;
  theme: string;
  locationSummary: string;
  tagline: string;
  announcement: string;
  heroImage: string;
  story: {
    heading: string;
    paragraphs: string[];
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
    schedule: boolean;
    travel: boolean;
    accommodation: boolean;
    story: boolean;
    gallery: boolean;
    registry: boolean;
    rsvp: boolean;
    faq: boolean;
    aiConcierge: boolean;
  };
};
