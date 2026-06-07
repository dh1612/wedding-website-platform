import { getWeddingData } from "@/lib/wedding-data";
import type { RSVPFormQuestion, WeddingData } from "@/types/wedding";

export function getDemoPortalWeddingData(): WeddingData {
  const base = getWeddingData("manor-house");

  return {
    ...base,
    couple: "Eleanor & Patrick",
    date: "2027-06-27",
    locationSummary: "Ballymagarvey Village, Co. Meath",
    fontPreset: "playfair-display"
  };
}

export const demoPortalChecklistItems = [
  {
    id: "demo-checklist-1",
    title: "Confirm final menu choices with venue",
    category: "Venue",
    completed: true,
    notes: "Chef confirmed vegetarian and vegan counts are covered."
  },
  {
    id: "demo-checklist-2",
    title: "Send final guest count to photographer",
    category: "Suppliers",
    completed: false,
    notes: "Need to update once last RSVPs come in."
  },
  {
    id: "demo-checklist-3",
    title: "Lock table plan for family groups",
    category: "Seating",
    completed: false,
    notes: "Keep cousins together and leave room near top table for grandparents."
  },
  {
    id: "demo-checklist-4",
    title: "Approve digital invite wording",
    category: "Stationery",
    completed: true,
    notes: "Final wording approved after second review."
  },
  {
    id: "demo-checklist-5",
    title: "Chase two outstanding accommodation replies",
    category: "Guests",
    completed: false,
    notes: "Follow up with Patrick's college friends on Monday."
  }
] as const;

export const demoPortalCalendarItems = [
  {
    id: "demo-calendar-1",
    title: "Final RSVP date",
    category: "Guests",
    startDate: "2027-05-15",
    endDate: "2027-05-15",
    notes: "Numbers locked after this point for catering."
  },
  {
    id: "demo-calendar-2",
    title: "Dress fitting",
    category: "Planning",
    startDate: "2027-05-28",
    endDate: "2027-05-28",
    notes: "Bring shoes and veil."
  },
  {
    id: "demo-calendar-3",
    title: "Seating plan sign-off",
    category: "Seating",
    startDate: "2027-06-10",
    endDate: "2027-06-12",
    notes: "Finalise after the last family changes."
  },
  {
    id: "demo-calendar-4",
    title: "Supplier final payment window",
    category: "Admin",
    startDate: "2027-06-14",
    endDate: "2027-06-18",
    notes: "Venue, band, and transport."
  },
  {
    id: "demo-calendar-5",
    title: "Wedding week handover",
    category: "Wedding Week",
    startDate: "2027-06-23",
    endDate: "2027-06-26",
    notes: "Share timelines, contact sheet, and room setup notes."
  }
] as const;

export const demoPortalCustomQuestions: RSVPFormQuestion[] = [
  {
    id: "day-two-attending",
    label: "Will you be attending day two?",
    type: "select",
    options: ["Yes", "No", "Maybe"],
    required: false
  },
  {
    id: "day-two-count",
    label: "How many will be attending day two?",
    type: "select",
    options: ["1", "2", "3", "4+"],
    required: false
  },
  {
    id: "transport-needed",
    label: "Do you need transport from the hotel?",
    type: "select",
    options: ["Yes", "No"],
    required: false
  }
];

export const demoPortalGuests = [
  {
    id: "demo-guest-1",
    name: "Anna Reilly",
    household: "Reilly Family",
    email: "anna@example.com",
    status: "attending" as const,
    side: "bride",
    meal: "fish" as const,
    dietary: "Gluten free",
    partySize: 2,
    note: "Travelling from Galway on Friday evening",
    songRequest: "Dancing Queen",
    messageToCouple: "Cannot wait to celebrate with you both",
    customAnswers: {
      "day-two-attending": "Yes",
      "day-two-count": "2",
      "transport-needed": "No"
    }
  },
  {
    id: "demo-guest-2",
    name: "Mark Doyle",
    household: "Doyle Family",
    email: "mark@example.com",
    status: "attending" as const,
    side: "groom",
    meal: "beef" as const,
    dietary: "",
    partySize: 1,
    note: "",
    songRequest: "",
    messageToCouple: "",
    customAnswers: {
      "day-two-attending": "No",
      "day-two-count": "1",
      "transport-needed": "No"
    }
  },
  {
    id: "demo-guest-3",
    name: "Ciara & Tom O'Brien",
    household: "O'Brien Household",
    email: "ciara@example.com",
    status: "attending" as const,
    side: "bride",
    meal: "vegetarian" as const,
    dietary: "Vegetarian",
    partySize: 2,
    note: "",
    songRequest: "This Will Be (An Everlasting Love)",
    messageToCouple: "",
    customAnswers: {
      "day-two-attending": "Yes",
      "day-two-count": "2",
      "transport-needed": "Yes"
    }
  },
  {
    id: "demo-guest-4",
    name: "James Murphy",
    household: "Murphy Family",
    email: "james@example.com",
    status: "pending" as const,
    side: "groom",
    meal: "beef" as const,
    dietary: "",
    partySize: 2,
    note: "Chasing reply after invitation reminder",
    songRequest: "",
    messageToCouple: "",
    customAnswers: {
      "day-two-attending": "Maybe",
      "day-two-count": "2",
      "transport-needed": "Yes"
    }
  },
  {
    id: "demo-guest-5",
    name: "Louise Keane",
    household: "Keane Friends",
    email: "louise@example.com",
    status: "declined" as const,
    side: "bride",
    meal: "vegan" as const,
    dietary: "",
    partySize: 1,
    note: "Away for work that weekend",
    songRequest: "",
    messageToCouple: "Will celebrate properly after the honeymoon",
    customAnswers: {
      "day-two-attending": "No",
      "day-two-count": "1",
      "transport-needed": "No"
    }
  },
  {
    id: "demo-guest-6",
    name: "Niall & Eve Byrne",
    household: "Byrne Family",
    email: "niall@example.com",
    status: "attending" as const,
    side: "groom",
    meal: "fish" as const,
    dietary: "No dairy",
    partySize: 3,
    note: "Bringing their daughter",
    songRequest: "",
    messageToCouple: "",
    customAnswers: {
      "day-two-attending": "Yes",
      "day-two-count": "3",
      "transport-needed": "Yes"
    }
  }
];

export const demoPortalCustomQuestionLabels = Object.fromEntries(
  demoPortalCustomQuestions.map((question) => [question.id, question.label])
);
