export type RSVPStatus = "attending" | "declined" | "pending";

export type MockGuest = {
  id: string;
  name: string;
  household: string;
  status: RSVPStatus;
  side: "Bride" | "Groom" | "Friends" | "Family" | "Work";
  meal: "Beef" | "Fish" | "Vegetarian" | "Kids";
  dietary: string;
  partySize: number;
  tableId?: string;
  note?: string;
};

export type MockTable = {
  id: string;
  name: string;
  x: number;
  y: number;
  seats: number;
  shape: "round" | "long";
  rotation: number;
  guests: string[];
};

const firstNames = [
  "Emma", "Jack", "Aoife", "Conor", "Saoirse", "Liam", "Niamh", "Cian",
  "Holly", "Ben", "Kate", "Darragh", "Rachel", "Eoin", "Clodagh", "Mark",
  "Grace", "James", "Aisling", "Daniel", "Ella", "Tom", "Lucy", "Shane",
  "Megan", "Ryan", "Olivia", "Sean", "Anna", "Fionn", "Chloe", "Ronan",
  "Molly", "Adam", "Ciara", "Patrick", "Amy", "Oisin", "Sophie", "Luke"
];

const lastNames = [
  "Murphy", "O'Brien", "Walsh", "Byrne", "Ryan", "O'Sullivan", "McCarthy",
  "Doyle", "Kennedy", "Lynch", "Murray", "Quinn", "Dunne", "Foley",
  "McMahon", "Kelleher", "Nolan", "Power", "Coffey", "Keane"
];

const dietaryNotes = [
  "", "", "", "", "Gluten free", "Nut allergy", "Vegetarian",
  "No dairy", "Pregnant", "Kids meal", "Shellfish allergy"
];

const sideCycle: MockGuest["side"][] = ["Bride", "Groom", "Friends", "Family", "Work"];
const mealCycle: MockGuest["meal"][] = ["Beef", "Fish", "Vegetarian", "Beef", "Fish", "Kids"];

function buildGuests(count: number) {
  const guests: MockGuest[] = [];

  for (let index = 0; index < count; index += 1) {
    const first = firstNames[index % firstNames.length];
    const last = lastNames[Math.floor(index / 2) % lastNames.length];
    const plusOne = index % 14 === 0;
    const status: RSVPStatus =
      index < 112 ? "attending" : index < 133 ? "declined" : "pending";

    guests.push({
      id: `guest-${index + 1}`,
      name: `${first} ${last}`,
      household: `${last} Party`,
      status,
      side: sideCycle[index % sideCycle.length],
      meal: mealCycle[index % mealCycle.length],
      dietary: dietaryNotes[index % dietaryNotes.length],
      partySize: plusOne && status === "attending" ? 2 : 1,
      note:
        index % 19 === 0
          ? "Travelling from London on Friday night."
          : index % 27 === 0
            ? "Needs high chair for toddler at day two."
            : undefined
    });
  }

  return guests;
}

const baseGuests = buildGuests(150);

const tableBlueprints: Array<Pick<MockTable, "id" | "name" | "x" | "y" | "seats" | "shape" | "rotation">> = [
  { id: "t1", name: "Top Table", x: 44, y: 8, seats: 8, shape: "long", rotation: 0 },
  { id: "t2", name: "Table 1", x: 14, y: 24, seats: 10, shape: "round", rotation: 0 },
  { id: "t3", name: "Table 2", x: 38, y: 24, seats: 10, shape: "round", rotation: 0 },
  { id: "t4", name: "Table 3", x: 62, y: 24, seats: 10, shape: "round", rotation: 0 },
  { id: "t5", name: "Table 4", x: 82, y: 24, seats: 10, shape: "round", rotation: 0 },
  { id: "t6", name: "Table 5", x: 16, y: 48, seats: 10, shape: "round", rotation: 0 },
  { id: "t7", name: "Table 6", x: 40, y: 48, seats: 10, shape: "round", rotation: 0 },
  { id: "t8", name: "Table 7", x: 64, y: 48, seats: 10, shape: "round", rotation: 0 },
  { id: "t9", name: "Table 8", x: 84, y: 48, seats: 10, shape: "round", rotation: 0 },
  { id: "t10", name: "Table 9", x: 14, y: 72, seats: 10, shape: "round", rotation: 0 },
  { id: "t11", name: "Table 10", x: 38, y: 72, seats: 10, shape: "round", rotation: 0 },
  { id: "t12", name: "Table 11", x: 62, y: 72, seats: 10, shape: "round", rotation: 0 },
  { id: "t13", name: "Table 12", x: 82, y: 72, seats: 10, shape: "round", rotation: 0 },
  { id: "t14", name: "Band", x: 10, y: 8, seats: 4, shape: "long", rotation: 0 },
  { id: "t15", name: "Dessert Station", x: 84, y: 8, seats: 4, shape: "long", rotation: 0 }
];

const attendingGuests = baseGuests.filter((guest) => guest.status === "attending");
const assignableGuests = attendingGuests.slice(0, 104);

export const sampleTables: MockTable[] = tableBlueprints.map((table, index) => {
  const isDecor = table.id === "t14" || table.id === "t15";
  const takeCount = isDecor ? 0 : index === 0 ? 8 : 8;
  const guests = isDecor ? [] : assignableGuests.splice(0, takeCount).map((guest) => guest.id);

  return {
    ...table,
    guests
  };
});

const tableAssignment = new Map<string, string>();
for (const table of sampleTables) {
  for (const guestId of table.guests) {
    tableAssignment.set(guestId, table.id);
  }
}

export const mockGuests: MockGuest[] = baseGuests.map((guest) => ({
  ...guest,
  tableId: tableAssignment.get(guest.id)
}));

export const mockOpsSummary = {
  totalGuests: 150,
  households: 83,
  attending: mockGuests.filter((guest) => guest.status === "attending").length,
  declined: mockGuests.filter((guest) => guest.status === "declined").length,
  pending: mockGuests.filter((guest) => guest.status === "pending").length,
  dietaryAlerts: mockGuests.filter((guest) => guest.dietary && guest.dietary !== "Kids meal").length,
  assignedSeats: mockGuests.filter((guest) => guest.tableId).length,
  unassignedGuests: mockGuests.filter(
    (guest) => guest.status === "attending" && !guest.tableId
  ).length
};

export const highlightedGuests = mockGuests.filter(
  (guest) => guest.dietary || guest.note
).slice(0, 8);

export const unassignedGuests = mockGuests.filter(
  (guest) => guest.status === "attending" && !guest.tableId
);
