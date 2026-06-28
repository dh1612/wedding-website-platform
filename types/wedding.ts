export type WeddingEvent = {
  title: string;
  time: string;
  location: string;
  address?: string;
  mapLink?: string;
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

export type StoryTimelineItem = {
  dateLabel: string;
  title: string;
  note?: string;
  image?: string;
};

export type MapSpot = {
  label: string;
  detail: string;
  href?: string;
};

export type TravelVisualMapNode = {
  id: string;
  label: string;
  detail?: string;
  x: number;
  y: number;
  tone?: "neutral" | "highlight" | "secondary";
};

export type TravelVisualMapConnection = {
  from: string;
  to: string;
  label?: string;
};

export type TravelInfo = {
  heading: string;
  headingHtml?: string;
  description: string;
  descriptionHtml?: string;
  mapUtilityEyebrow?: string;
  mapUtilityTitle?: string;
  mapUtilityTitleHtml?: string;
  mapUtilityDescription?: string;
  mapUtilityDescriptionHtml?: string;
  locationOverviewTitle?: string;
  locationOverviewTitleHtml?: string;
  locationOverviewHtml?: string;
  locationOverviewPlacement?: "top" | "before-sneak-peek";
  mapImage?: string;
  sneakPeekImage?: string;
  relaxedNote?: string;
  mapSpots?: MapSpot[];
  visualMap?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    nodes: TravelVisualMapNode[];
    connections?: TravelVisualMapConnection[];
  };
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
  linkLabel?: string;
};

export type SupplierItem = {
  name: string;
  category?: string;
  note: string;
  link?: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  details: string;
};

export type DayTwoSectionContent = {
  eyebrow?: string;
  title?: string;
  titleHtml?: string;
  description?: string;
  descriptionHtml?: string;
  panelEyebrow?: string;
  panelTitle?: string;
  panelTitleHtml?: string;
  details?: string;
  detailsHtml?: string;
  mapLink?: string;
};

export type RSVPFormQuestion = {
  id: string;
  label: string;
  type: "short" | "long" | "yesno" | "select" | "multiselect";
  required: boolean;
  placeholder?: string;
  options?: string[];
};

export type MealOptionValue =
  | "beef"
  | "fish"
  | "vegetarian"
  | "vegan"
  | "kids"
  | "custom";

export type RSVPMealOption = {
  value: MealOptionValue;
  label: string;
  enabled: boolean;
};

export type InvitationContent = {
  eyebrow?: string;
  hostLine: string;
  invitationLine: string;
  celebrationLine: string;
  receptionLine: string;
  websiteLine: string;
  detailsCardTitle: string;
  stayTitle: string;
  dayTwoTitle: string;
};

export type WeddingData = {
  couple: string;
  date: string;
  theme: string;
  fontPreset?: string;
  hero?: {
    eyebrow: string;
    previewNote: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    secondaryActionLabel: string;
    secondaryActionHref: string;
  };
  locationSummary: string;
  locationSummaryHtml?: string;
  tagline: string;
  taglineHtml?: string;
  announcement: string;
  announcementHtml?: string;
  heroImage: string;
  story: {
    heading: string;
    headingHtml?: string;
    paragraphs: string[];
    html?: string;
    featureImage?: string;
    featureImages?: string[];
    timelineOnly?: boolean;
    timeline?: StoryTimelineItem[];
  };
  ceremony: WeddingEvent;
  reception: WeddingEvent;
  scheduleEyebrow?: string;
  scheduleHeading?: string;
  scheduleHeadingHtml?: string;
  scheduleDescription?: string;
  scheduleDescriptionHtml?: string;
  scheduleNote?: string;
  scheduleNoteHtml?: string;
  scheduleStepLabel?: string;
  schedule: ScheduleItem[];
  dayTwo?: DayTwoSectionContent;
  travel: TravelInfo;
  accommodationEyebrow?: string;
  accommodationTitle?: string;
  accommodationTitleHtml?: string;
  accommodationDescription?: string;
  accommodationDescriptionHtml?: string;
  accommodation: AccommodationItem[];
  suppliersEyebrow?: string;
  suppliersTitle?: string;
  suppliersTitleHtml?: string;
  suppliersDescription?: string;
  suppliersDescriptionHtml?: string;
  suppliers: SupplierItem[];
  faq: FAQItem[];
  rsvp: {
    eyebrow?: string;
    title?: string;
    titleHtml?: string;
    label: string;
    description: string;
    descriptionHtml?: string;
    url: string;
    interactiveFormEnabled?: boolean;
    deadlineEyebrow?: string;
    deadline: string;
    panelDescription?: string;
    panelDescriptionHtml?: string;
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
      dietaryInputType?: "text" | "select" | "multiselect";
      dietaryOptions?: string[];
      mealOptions?: RSVPMealOption[];
      enableSongRequest: boolean;
      enableMessageToCouple: boolean;
      customQuestions?: RSVPFormQuestion[];
    };
  };
  gallery: {
    heading: string;
    headingHtml?: string;
    description: string;
    descriptionHtml?: string;
    images: string[];
  };
  registry: {
    message: string;
    links: LinkItem[];
  };
  invitation?: InvitationContent;
  contact: {
    email: string;
    note: string;
    rsvpNotificationEmail?: string;
  };
  aiConciergeEnabled: boolean;
  styleOptions?: {
    disableSectionOrnaments?: boolean;
    compactSplitHero?: boolean;
    heroImageBrightness?: number;
    heroImageObjectPosition?: string;
    hideHeaderCorners?: boolean;
  };
  sectionVisibility?: {
    heroEyebrow: boolean;
    date: boolean;
    locationSummary: boolean;
    tagline: boolean;
    announcement: boolean;
    heroActions: boolean;
    previewNote: boolean;
    schedule: boolean;
    travel: boolean;
    ceremonyCard: boolean;
    receptionCard: boolean;
    transportCard: boolean;
    directionsCard: boolean;
    relaxedNote: boolean;
    accommodation: boolean;
    suppliers: boolean;
    dayTwo: boolean;
    story: boolean;
    gallery: boolean;
    registry: boolean;
    rsvp: boolean;
    faq: boolean;
    aiConcierge: boolean;
  };
};
