export type RosebankRoom = {
  id: string;
  name: string;
  floor: "Ground Floor" | "Upstairs" | "Outdoor";
  dimensionsMm: { length: number; width: number };
  dimensionsM: { length: number; width: number };
  areaM2: number;
  notes: string[];
  plans: string[];
  budgetEstimate?: number;
  actualSpend?: number;
  status: "planning" | "quoting" | "ordering" | "in progress" | "finished";
  checklist: string[];
  decisions: string[];
  openQuestions: string[];
};

export type RosebankBudgetItem = {
  id: string;
  category: string;
  estimateLow: number;
  estimateHigh: number;
  actual: number | null;
  paid: boolean;
  supplier?: string;
  notes: string;
  status: "idea" | "quoted" | "ordered" | "installed" | "completed";
};

export type RosebankQuote = {
  id: string;
  supplier: string;
  quoteDate: string;
  category: string;
  amount: number;
  includesLabour: boolean;
  includesVat: "yes" | "no" | "unknown";
  contact: string;
  notes: string;
  status: "pending" | "accepted" | "rejected" | "paid";
};

export type RosebankShoppingItem = {
  id: string;
  product: string;
  room: string;
  store: string;
  price: number;
  link?: string;
  status: "considering" | "favourite" | "bought" | "installed";
  notes: string;
  priority: "high" | "medium" | "low";
};

export type RosebankDecision = {
  id: string;
  title: string;
  note: string;
};

export type RosebankData = {
  projectName: string;
  subtitle: string;
  development: string;
  houseType: string;
  goal: string;
  moveInDate: string;
  workingCashTarget: number;
  privateNotes: string;
  availableCashLow: number;
  availableCashHigh: number;
  totalFitOutLow: number;
  totalFitOutHigh: number;
  priorities: string[];
  rooms: RosebankRoom[];
  budgetItems: RosebankBudgetItem[];
  quotes: RosebankQuote[];
  shoppingItems: RosebankShoppingItem[];
  decisions: RosebankDecision[];
};

export const rosebankData: RosebankData = {
  projectName: "Rosebank Home Hub",
  subtitle: "B3 House Planner",
  development: "Rosebank / Rosehill, Mallow",
  houseType: "B3 side-profile semi-detached",
  goal: "Warm, modern, timeless home",
  moveInDate: "2026-08-17",
  workingCashTarget: 35000,
  privateNotes:
    "Phase one stays focused on the kitchen, flooring, carpet, and the core bathroom decisions. Anything lovely-but-not-urgent gets parked rather than forcing it into the first spend.",
  availableCashLow: 30000,
  availableCashHigh: 35000,
  totalFitOutLow: 45000,
  totalFitOutHigh: 60000,
  priorities: [
    "Kitchen",
    "Flooring downstairs",
    "Carpet upstairs",
    "Tiles / bathrooms / shower doors",
    "Essential lighting and electrics",
    "Sofa",
    "Walk-in wardrobe",
    "Media wall",
    "Nice-to-have furniture and extras"
  ],
  rooms: [
    {
      id: "living-room",
      name: "Living Room",
      floor: "Ground Floor",
      dimensionsMm: { length: 6092, width: 3875 },
      dimensionsM: { length: 6.09, width: 3.88 },
      areaM2: 23.61,
      notes: [
        "TV/media wall approx 3.7m wide.",
        "Plans include an 85 inch TV, soundbar, media wall, L-shaped sofa, and wooden/laminate floor."
      ],
      plans: ["Media wall", "L-shaped sofa", "Wood/laminate flooring", "Gaming setup corner"],
      budgetEstimate: 11210,
      actualSpend: 310,
      status: "planning",
      checklist: ["Confirm sofa style", "Finalise media wall layout", "Price flooring", "Lock TV model"],
      decisions: ["TV wall needs to carry an 85 inch screen cleanly.", "Keep the room warm rather than overly trendy."],
      openQuestions: ["Do we want built-in storage under the TV wall?", "Is the racing cockpit staying here long term?"]
    },
    {
      id: "kitchen-dining",
      name: "Kitchen / Dining",
      floor: "Ground Floor",
      dimensionsMm: { length: 6092, width: 3825 },
      dimensionsM: { length: 6.09, width: 3.83 },
      areaM2: 23.3,
      notes: [
        "PC Kitchens redesign with island.",
        "Laminate worktop, Belling electric range cooker, wine fridge, 2k fridge, integrated microwave, integrated oven."
      ],
      plans: ["Island redesign", "Range cooker", "Wine fridge", "Integrated appliances"],
      budgetEstimate: 23000,
      actualSpend: 0,
      status: "quoting",
      checklist: ["Review redesign", "Compare worktop finishes", "Lock appliance sizes", "Check island circulation"],
      decisions: ["Kitchen is priority one.", "Laminate counters are the current direction to keep value sensible."],
      openQuestions: ["How far can we stretch if the redesign feels worth it?", "What gets cut first if the quote lands high?"]
    },
    {
      id: "utility",
      name: "Utility",
      floor: "Ground Floor",
      dimensionsMm: { length: 2195, width: 1500 },
      dimensionsM: { length: 2.2, width: 1.5 },
      areaM2: 3.29,
      notes: ["Compact service space, needs practical storage."],
      plans: ["Laundry", "Hidden cleaning storage"],
      budgetEstimate: 1200,
      actualSpend: 0,
      status: "planning",
      checklist: ["Utility shelving", "Machine layout", "Drying rail plan"],
      decisions: ["Purely functional room."],
      openQuestions: ["Can we squeeze in extra tall storage without it feeling mean?"]
    },
    {
      id: "downstairs-wc",
      name: "Downstairs WC",
      floor: "Ground Floor",
      dimensionsMm: { length: 1500, width: 1500 },
      dimensionsM: { length: 1.5, width: 1.5 },
      areaM2: 2.25,
      notes: ["Small room, good place to be a little bolder if we want."],
      plans: ["Compact vanity", "Mirror and wall light"],
      budgetEstimate: 900,
      actualSpend: 0,
      status: "planning",
      checklist: ["Choose tile direction", "Pick mirror", "Check storage"],
      decisions: ["Could carry a little personality without costing loads."],
      openQuestions: ["Feature tile or keep it simple?"]
    },
    {
      id: "master-bedroom",
      name: "Master Bedroom",
      floor: "Upstairs",
      dimensionsMm: { length: 3814, width: 3475 },
      dimensionsM: { length: 3.81, width: 3.48 },
      areaM2: 13.26,
      notes: ["New door planned from master into Bedroom 4/walk-in wardrobe."],
      plans: ["Calm main bedroom", "Connected wardrobe access"],
      budgetEstimate: 2500,
      actualSpend: 0,
      status: "planning",
      checklist: ["Doorway plan", "Bed wall layout", "Curtains / blinds"],
      decisions: ["Master and wardrobe should feel joined up."],
      openQuestions: ["Best placement for the new doorway?"]
    },
    {
      id: "walk-in-wardrobe",
      name: "Bedroom 4 / Walk-In Wardrobe",
      floor: "Upstairs",
      dimensionsMm: { length: 2100, width: 3874 },
      dimensionsM: { length: 2.1, width: 3.87 },
      areaM2: 8.13,
      notes: [
        "Block off current landing door.",
        "Create doorway from master bedroom.",
        "Convert fully to walk-in wardrobe."
      ],
      plans: ["Wardrobe conversion", "Internal storage", "Mirror / dressing zone"],
      budgetEstimate: 5000,
      actualSpend: 0,
      status: "planning",
      checklist: ["Layout internals", "Door block-up", "Joinery quotes", "Lighting"],
      decisions: ["Bedroom 4 is definitely becoming the wardrobe."],
      openQuestions: ["Open shelves vs more enclosed joinery?"]
    },
    {
      id: "bedroom-2",
      name: "Bedroom 2",
      floor: "Upstairs",
      dimensionsMm: { length: 2940, width: 3413 },
      dimensionsM: { length: 2.94, width: 3.41 },
      areaM2: 10.03,
      notes: ["Flexible spare bedroom."],
      plans: ["Guest room or future use"],
      budgetEstimate: 1500,
      actualSpend: 0,
      status: "planning",
      checklist: ["Decide function", "Storage", "Bed size"],
      decisions: ["Does not need everything at move-in."],
      openQuestions: ["Guest room first or soft landing room?"]
    },
    {
      id: "bedroom-3",
      name: "Bedroom 3",
      floor: "Upstairs",
      dimensionsMm: { length: 2975, width: 3765 },
      dimensionsM: { length: 2.98, width: 3.77 },
      areaM2: 11.2,
      notes: ["Likely future flexible room."],
      plans: ["Bedroom / office potential"],
      budgetEstimate: 1500,
      actualSpend: 0,
      status: "planning",
      checklist: ["Decide use", "Furniture priority"],
      decisions: ["Can stay simpler in phase one."],
      openQuestions: ["Office crossover or proper bedroom first?"]
    },
    {
      id: "main-bathroom",
      name: "Main Bathroom",
      floor: "Upstairs",
      dimensionsMm: { length: 2100, width: 1800 },
      dimensionsM: { length: 2.1, width: 1.8 },
      areaM2: 3.78,
      notes: ["Main family bathroom."],
      plans: ["Tiles", "Sanitaryware", "Lighting"],
      budgetEstimate: 3200,
      actualSpend: 0,
      status: "planning",
      checklist: ["Tile decision", "Shower screen / bath detail", "Mirror"],
      decisions: ["Needs to feel clean and timeless."],
      openQuestions: ["How far do we tile?"]
    },
    {
      id: "ensuite",
      name: "Ensuite",
      floor: "Upstairs",
      dimensionsMm: { length: 2360, width: 1400 },
      dimensionsM: { length: 2.36, width: 1.4 },
      areaM2: 3.3,
      notes: [
        "Stucci Pink tile and Next Turquoise tile are on the radar.",
        "Installed wall tiling estimate approx 1,275–1,375."
      ],
      plans: ["Feature tile option", "Shower door", "Compact but lovely finish"],
      budgetEstimate: 3000,
      actualSpend: 0,
      status: "quoting",
      checklist: ["Tile layout", "Labour confirmation", "Shower door spec"],
      decisions: ["This room could carry more personality than the main bathroom."],
      openQuestions: ["Do the pink/turquoise ideas still feel right after seeing them in person?"]
    },
    {
      id: "hall-landing",
      name: "Hall / Landing",
      floor: "Upstairs",
      dimensionsMm: { length: 3200, width: 1100 },
      dimensionsM: { length: 3.2, width: 1.1 },
      areaM2: 3.52,
      notes: ["Approximate planning zone for circulation and carpet continuity."],
      plans: ["Lighting", "Runner / carpet continuity"],
      budgetEstimate: 1000,
      actualSpend: 0,
      status: "planning",
      checklist: ["Landing light", "Wall finish", "Storage hook / console if needed"],
      decisions: ["Keep this calm and uncluttered."],
      openQuestions: ["Do we dress it at all or just keep it crisp?"]
    },
    {
      id: "garden",
      name: "Garden",
      floor: "Outdoor",
      dimensionsMm: { length: 0, width: 0 },
      dimensionsM: { length: 0, width: 0 },
      areaM2: 0,
      notes: ["Future phase rather than move-in priority."],
      plans: ["Outdoor seating", "Planting", "Maybe pergola later"],
      budgetEstimate: 2500,
      actualSpend: 0,
      status: "planning",
      checklist: ["Keep wishlist only for now", "Do not let this eat phase-one budget"],
      decisions: ["Garden is not urgent."],
      openQuestions: ["What is the nicest low-effort first step?"]
    }
  ] as RosebankRoom[],
  budgetItems: [
    {
      id: "kitchen",
      category: "Kitchen",
      estimateLow: 18000,
      estimateHigh: 23000,
      actual: null,
      paid: false,
      supplier: "PC Kitchens",
      notes: "Redesigned kitchen, island, laminate counters, Belling range, wine fridge, 2k fridge, integrated microwave and oven.",
      status: "quoted"
    },
    {
      id: "flooring-downstairs",
      category: "Flooring downstairs",
      estimateLow: 634,
      estimateHigh: 2500,
      actual: null,
      paid: false,
      supplier: "Tiles R Us / laminate option",
      notes: "Laminate example for living room alone came out at €634.01 for 13 boxes including waste.",
      status: "quoted"
    },
    {
      id: "upstairs-carpet",
      category: "Upstairs carpet",
      estimateLow: 3050,
      estimateHigh: 3600,
      actual: null,
      paid: false,
      supplier: "Kesari Saxony",
      notes: "Carpet plus underlay rough total approx €3,050 before fitting.",
      status: "quoted"
    },
    {
      id: "tiles",
      category: "Tiles",
      estimateLow: 4760,
      estimateHigh: 6200,
      actual: null,
      paid: false,
      supplier: "Tiles R Us",
      notes: "Materials quote approx €4,760 with labour extra depending on scope.",
      status: "quoted"
    },
    {
      id: "bathrooms",
      category: "Bathrooms",
      estimateLow: 3500,
      estimateHigh: 6500,
      actual: null,
      paid: false,
      notes: "Includes sanitaryware, tiling, shower details and finishing bits.",
      status: "idea"
    },
    {
      id: "shower-doors",
      category: "Shower doors",
      estimateLow: 1200,
      estimateHigh: 2200,
      actual: null,
      paid: false,
      notes: "Need proper quotes once layouts are fixed.",
      status: "idea"
    },
    {
      id: "media-wall",
      category: "Media wall",
      estimateLow: 3500,
      estimateHigh: 5000,
      actual: null,
      paid: false,
      notes: "Living room media wall / unit target.",
      status: "idea"
    },
    {
      id: "sofa",
      category: "Sofa",
      estimateLow: 4000,
      estimateHigh: 4000,
      actual: null,
      paid: false,
      notes: "Main living room sofa budget.",
      status: "idea"
    },
    {
      id: "tv-soundbar",
      category: "TV / soundbar",
      estimateLow: 1800,
      estimateHigh: 1900,
      actual: 310,
      paid: true,
      notes: "85 inch gaming TV approx €1,500, soundbar €300–€400, racing cockpit €310 already noted.",
      status: "ordered"
    },
    {
      id: "walk-in-wardrobe",
      category: "Walk-in wardrobe",
      estimateLow: 3000,
      estimateHigh: 7000,
      actual: null,
      paid: false,
      notes: "Conversion of Bedroom 4 plus internal storage.",
      status: "idea"
    },
    {
      id: "lighting",
      category: "Lighting",
      estimateLow: 1500,
      estimateHigh: 4000,
      actual: null,
      paid: false,
      notes: "Essential lighting and electrics before decorative extras.",
      status: "idea"
    },
    {
      id: "blinds-curtains",
      category: "Blinds / curtains",
      estimateLow: 1500,
      estimateHigh: 3500,
      actual: null,
      paid: false,
      notes: "Can be phased if needed.",
      status: "idea"
    },
    {
      id: "garden",
      category: "Garden",
      estimateLow: 1000,
      estimateHigh: 5000,
      actual: null,
      paid: false,
      notes: "Future phase and not a move-in priority.",
      status: "idea"
    },
    {
      id: "misc",
      category: "Miscellaneous",
      estimateLow: 1500,
      estimateHigh: 4000,
      actual: null,
      paid: false,
      notes: "All the bits that always appear once real life starts.",
      status: "idea"
    }
  ] satisfies RosebankBudgetItem[],
  quotes: [
    {
      id: "tiles-r-us",
      supplier: "Tiles R Us",
      quoteDate: "2026-07-01",
      category: "Flooring and tiles",
      amount: 4760,
      includesLabour: false,
      includesVat: "unknown",
      contact: "In-store quote",
      notes:
        "Includes various tiles, vinyl, grout, trims, anti-crack matting, tanking kit. Labour approx: tiling €35/sq yd, flooring/vinyl €15/sq yd.",
      status: "pending"
    },
    {
      id: "living-room-laminate",
      supplier: "Laminate option",
      quoteDate: "2026-07-02",
      category: "Living room flooring",
      amount: 634.01,
      includesLabour: false,
      includesVat: "yes",
      contact: "Online estimate",
      notes: "12mm AC4 laminate, 13 boxes including waste for living room.",
      status: "pending"
    },
    {
      id: "upstairs-carpet",
      supplier: "Kesari Saxony",
      quoteDate: "2026-07-02",
      category: "Upstairs carpet",
      amount: 3050,
      includesLabour: false,
      includesVat: "unknown",
      contact: "Online estimate",
      notes: "Approx 105.25 sq yd carpet plus 10mm underlay before fitting.",
      status: "pending"
    },
    {
      id: "ensuite-tiling",
      supplier: "Tiles R Us",
      quoteDate: "2026-07-03",
      category: "Ensuite wall tiling",
      amount: 1325,
      includesLabour: true,
      includesVat: "unknown",
      contact: "In-store quote",
      notes: "Installed estimate for ensuite wall tiling with tile, labour, and setting materials.",
      status: "pending"
    }
  ] satisfies RosebankQuote[],
  shoppingItems: [
    {
      id: "tv",
      product: "85 inch TV",
      room: "Living Room",
      store: "TBC",
      price: 1500,
      status: "considering",
      notes: "Gaming TV, main media wall anchor.",
      priority: "high"
    },
    {
      id: "soundbar",
      product: "Soundbar",
      room: "Living Room",
      store: "TBC",
      price: 350,
      status: "considering",
      notes: "Target range €300–€400.",
      priority: "medium"
    },
    {
      id: "sofa",
      product: "L-shaped sofa",
      room: "Living Room",
      store: "TBC",
      price: 4000,
      status: "favourite",
      notes: "Main living spend, needs to feel great every day.",
      priority: "high"
    },
    {
      id: "cockpit",
      product: "Racing cockpit",
      room: "Living Room",
      store: "TBC",
      price: 310,
      status: "bought",
      notes: "Already accounted for in current spend.",
      priority: "low"
    },
    {
      id: "range-cooker",
      product: "Belling electric range cooker",
      room: "Kitchen / Dining",
      store: "TBC",
      price: 0,
      status: "considering",
      notes: "Needs final model / price lock.",
      priority: "high"
    },
    {
      id: "wine-fridge",
      product: "Wine fridge",
      room: "Kitchen / Dining",
      store: "TBC",
      price: 0,
      status: "considering",
      notes: "Part of kitchen redesign wish list.",
      priority: "medium"
    },
    {
      id: "fridge",
      product: "Main fridge",
      room: "Kitchen / Dining",
      store: "TBC",
      price: 2000,
      status: "considering",
      notes: "2k working estimate.",
      priority: "high"
    },
    {
      id: "microwave",
      product: "Integrated microwave",
      room: "Kitchen / Dining",
      store: "TBC",
      price: 0,
      status: "considering",
      notes: "Needs proper comparison list.",
      priority: "medium"
    },
    {
      id: "oven",
      product: "Integrated oven",
      room: "Kitchen / Dining",
      store: "TBC",
      price: 0,
      status: "considering",
      notes: "Needs proper comparison list.",
      priority: "medium"
    }
  ] satisfies RosebankShoppingItem[],
  decisions: [
    {
      id: "wardrobe-conversion",
      title: "Bedroom 4 becomes the walk-in wardrobe",
      note: "The current landing door gets blocked and a new doorway comes from the master."
    },
    {
      id: "tv-wall",
      title: "Living room TV wall is approx 3.7m",
      note: "That gives the media wall decision a real constraint rather than guessing in shops."
    },
    {
      id: "cash-budget",
      title: "Initial move-in cash budget is €30k–€35k",
      note: "This is the number that matters most for phase one, even if the full house fit-out goes beyond it."
    },
    {
      id: "kitchen-priority",
      title: "Kitchen is the biggest early decision",
      note: "Current target is €18k–€23k out of pocket and it shapes the rest of the house."
    },
    {
      id: "warm-style",
      title: "Overall feel stays warm, modern, timeless",
      note: "No cold showroom choices if they do not feel good to live with."
    }
  ] satisfies RosebankDecision[]
};
