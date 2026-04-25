import { mockGuests } from "@/lib/mock-wedding-ops";

export const starterChecklistItems = [
  {
    title: "Confirm final guest list",
    category: "Planning",
    completed: true,
    notes: "Need to double-check two evening invites."
  },
  {
    title: "Send RSVP reminder to pending guests",
    category: "Guests",
    completed: false,
    notes: "Target this for next Wednesday."
  },
  {
    title: "Approve final menu choices",
    category: "Venue",
    completed: false,
    notes: "Ask venue to add two vegan mains."
  },
  {
    title: "Build first draft seating plan",
    category: "Seating",
    completed: false,
    notes: "Start with close family around top table."
  },
  {
    title: "Pay photographer balance",
    category: "Suppliers",
    completed: false,
    notes: "Invoice due at end of month."
  },
  {
    title: "Order place cards",
    category: "Stationery",
    completed: true,
    notes: "Need final print quantities once RSVPs close."
  }
] as const;

export const starterPortalGuests = mockGuests;
