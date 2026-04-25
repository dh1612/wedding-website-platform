const fs = await import("node:fs/promises");
const path = await import("node:path");
const { Presentation, PresentationFile } = await import("@oai/artifact-tool");

const W = 1280;
const H = 720;
const OUT_DIR = path.resolve("outputs/wedding-brochure");
const SCRATCH_DIR = path.resolve("tmp/slides/wedding-brochure");
const PREVIEW_DIR = path.join(SCRATCH_DIR, "preview");

const COLORS = {
  ink: "#16211D",
  muted: "#51665D",
  stone: "#F5F2EC",
  paper: "#FBFAF7",
  pine: "#0D4A36",
  pineSoft: "#E3EFE9",
  sage: "#C7DDD3",
  gold: "#C49A57",
  blush: "#E7D9D1",
  line: "#D9DFD9",
  white: "#FFFFFF"
};

const FONTS = {
  display: "Caladea",
  body: "Lato",
  mono: "Aptos Mono"
};

async function ensureDirs() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
}

function line(fill = COLORS.line, width = 1) {
  return { style: "solid", fill, width };
}

function addShape(slide, geometry, left, top, width, height, fill, stroke = COLORS.line, strokeWidth = 1) {
  return slide.shapes.add({
    geometry,
    position: { left, top, width, height },
    fill,
    line: line(stroke, strokeWidth)
  });
}

function addText(
  slide,
  text,
  left,
  top,
  width,
  height,
  {
    fontSize = 20,
    color = COLORS.ink,
    bold = false,
    face = FONTS.body,
    align = "left",
    valign = "top",
    fill = "#00000000",
    stroke = "#00000000",
    strokeWidth = 0
  } = {}
) {
  const box = addShape(slide, "rect", left, top, width, height, fill, stroke, strokeWidth);
  box.text = text;
  box.text.fontSize = fontSize;
  box.text.color = color;
  box.text.bold = bold;
  box.text.alignment = align;
  box.text.verticalAlignment = valign;
  box.text.typeface = face;
  box.text.insets = { left: 0, right: 0, top: 0, bottom: 0 };
  return box;
}

function addBulletList(slide, items, left, top, width, itemHeight = 46) {
  items.forEach((item, index) => {
    const y = top + index * itemHeight;
    addShape(slide, "ellipse", left, y + 9, 14, 14, COLORS.gold, COLORS.gold, 0);
    addText(slide, item, left + 28, y, width - 28, 30, {
      fontSize: 20,
      color: COLORS.ink
    });
  });
}

function addBackground(slide, variant = "light") {
  slide.background.fill = variant === "deep" ? "#F1F6F3" : COLORS.paper;

  addShape(slide, "rect", 0, 0, W, H, variant === "deep" ? "#F1F6F3" : COLORS.paper, "#00000000", 0);
  addShape(slide, "ellipse", -80, -120, 420, 300, variant === "deep" ? "#DDECE5" : "#EEF4F0", "#00000000", 0);
  addShape(slide, "ellipse", 1010, 500, 360, 260, "#E9E0D6", "#00000000", 0);
  addShape(slide, "ellipse", 930, -40, 260, 200, "#E7F0EA", "#00000000", 0);
  addShape(slide, "rect", 64, 54, 1152, 612, "#FFFFFFD9", "#00000000", 0);
}

function addHeader(slide, section, page) {
  addText(slide, "AGELO WEDDINGS", 84, 78, 260, 22, {
    fontSize: 12,
    color: COLORS.pine,
    bold: true,
    face: FONTS.mono
  });
  addText(slide, section.toUpperCase(), 84, 104, 260, 20, {
    fontSize: 11,
    color: COLORS.gold,
    bold: true,
    face: FONTS.mono
  });
  addText(slide, String(page).padStart(2, "0"), 1140, 82, 40, 20, {
    fontSize: 12,
    color: COLORS.muted,
    bold: true,
    face: FONTS.mono,
    align: "right"
  });
  addShape(slide, "rect", 84, 132, 1092, 1, COLORS.line, "#00000000", 0);
}

function addFooter(slide, text = "Elegant wedding websites and planning portals, built to feel bespoke.") {
  addText(slide, text, 84, 668, 900, 20, {
    fontSize: 11,
    color: COLORS.muted
  });
}

function addCover(slide) {
  addBackground(slide, "deep");
  addShape(slide, "roundRect", 770, 120, 330, 420, "#0D4A36", "#0D4A36", 0);
  addShape(slide, "ellipse", 835, 170, 190, 190, "#F4E8D5", "#F4E8D5", 0);
  addShape(slide, "ellipse", 910, 205, 90, 180, "#C7DDD3", "#C7DDD3", 0);
  addShape(slide, "ellipse", 830, 370, 140, 90, "#E7D9D1", "#E7D9D1", 0);
  addText(slide, "AGELO WEDDINGS", 96, 110, 260, 22, {
    fontSize: 13,
    color: COLORS.pine,
    bold: true,
    face: FONTS.mono
  });
  addText(slide, "Wedding Websites\nWith A Planning Portal", 96, 162, 560, 190, {
    fontSize: 42,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });
  addText(
    slide,
    "A refined digital service for couples who want a beautiful wedding website, clear guest communication, and practical planning tools in one place.",
    100,
    378,
    560,
    96,
    {
      fontSize: 21,
      color: COLORS.muted
    }
  );
  addShape(slide, "roundRect", 100, 514, 286, 64, COLORS.pine, COLORS.pine, 0);
  addText(slide, "Packages from EUR195", 130, 535, 230, 26, {
    fontSize: 18,
    color: COLORS.white,
    bold: true
  });
  addText(slide, "Wedding websites that feel bespoke, not templated.", 100, 600, 520, 26, {
    fontSize: 16,
    color: COLORS.pine,
    face: FONTS.body
  });
}

function addOverview(slide) {
  addBackground(slide);
  addHeader(slide, "What Couples Receive", 2);
  addText(slide, "A polished guest-facing website with a private planning space behind it.", 84, 166, 700, 72, {
    fontSize: 34,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });
  addText(
    slide,
    "The result is more than a website. It becomes a calm digital home for wedding information, RSVP organisation, and planning progress.",
    84,
    252,
    640,
    68,
    { fontSize: 19, color: COLORS.muted }
  );

  const cards = [
    ["Beautiful website", "Guest information, story, travel details, accommodation, FAQ and registry in a style-led site."],
    ["AI concierge", "Optional guest question assistant that answers from the wedding's own information only."],
    ["Couple portal", "Private planning area for checklist progress, guest visibility, and portal-style tools."],
    ["RSVP control", "Manual guest management, responses, and practical planning data stored in one place."]
  ];

  cards.forEach(([title, body], index) => {
    const left = 84 + (index % 2) * 330;
    const top = 360 + Math.floor(index / 2) * 160;
    addShape(slide, "roundRect", left, top, 300, 132, "#FFFFFF", COLORS.line, 1);
    addShape(slide, "rect", left, top, 10, 132, index % 2 === 0 ? COLORS.pine : COLORS.gold, "#00000000", 0);
    addText(slide, title, left + 24, top + 22, 230, 28, {
      fontSize: 22,
      color: COLORS.ink,
      bold: true,
      face: FONTS.display
    });
    addText(slide, body, left + 24, top + 58, 248, 54, {
      fontSize: 16,
      color: COLORS.muted
    });
  });

  addShape(slide, "roundRect", 788, 206, 326, 332, "#0F5A41", "#0F5A41", 0);
  addText(slide, "Designed to reduce wedding admin, not add to it.", 820, 242, 250, 94, {
    fontSize: 31,
    color: COLORS.white,
    bold: true,
    face: FONTS.display
  });
  addBulletList(
    slide,
    [
      "Clear guest information in one place",
      "A premium digital experience for couples",
      "Reusable structure behind the scenes",
      "Room to upgrade into a fuller planning portal"
    ],
    820,
    372,
    240
  );
  addFooter(slide);
}

function addPackages(slide) {
  addBackground(slide);
  addHeader(slide, "Packages", 3);
  addText(slide, "Three clear package options.", 84, 168, 500, 54, {
    fontSize: 36,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });
  addText(slide, "Positioned as a done-for-you service rather than a DIY template.", 84, 222, 560, 34, {
    fontSize: 18,
    color: COLORS.muted
  });

  const packages = [
    {
      name: "Essential Website",
      price: "EUR195",
      tone: "Perfect for couples who want a polished digital invite and information hub.",
      points: ["Beautiful website setup", "Guest info pages", "One selected design direction", "Mobile-friendly launch"],
      fill: "#FFFFFF",
      accent: COLORS.pine
    },
    {
      name: "Website + AI Concierge",
      price: "EUR345",
      tone: "Adds a premium guest experience with a wedding-specific question assistant.",
      points: ["Everything in Essential", "AI concierge setup", "Wedding-data answer guardrails", "Premium positioning for guests"],
      fill: "#F5F9F6",
      accent: COLORS.gold
    },
    {
      name: "Complete Wedding Portal",
      price: "EUR595",
      tone: "The full package for couples who want planning tools as well as a stunning website.",
      points: ["Everything in AI package", "Couple portal", "Checklist and RSVP management", "Planning-ready foundation"],
      fill: "#0D4A36",
      accent: COLORS.blush
    }
  ];

  packages.forEach((pkg, index) => {
    const left = 84 + index * 374;
    addShape(slide, "roundRect", left, 292, 336, 316, pkg.fill, pkg.fill === "#0D4A36" ? "#0D4A36" : COLORS.line, 1);
    addShape(slide, "rect", left, 292, 336, 10, pkg.accent, "#00000000", 0);
    addText(slide, pkg.name, left + 24, 326, 250, 54, {
      fontSize: 26,
      color: pkg.fill === "#0D4A36" ? COLORS.white : COLORS.ink,
      bold: true,
      face: FONTS.display
    });
    addText(slide, pkg.price, left + 24, 386, 180, 34, {
      fontSize: 27,
      color: pkg.fill === "#0D4A36" ? "#F4E8D5" : COLORS.pine,
      bold: true,
      face: FONTS.mono
    });
    addText(slide, pkg.tone, left + 24, 436, 286, 60, {
      fontSize: 16,
      color: pkg.fill === "#0D4A36" ? "#EAF3EE" : COLORS.muted
    });
    pkg.points.forEach((point, bulletIndex) => {
      const y = 512 + bulletIndex * 24;
      addShape(slide, "ellipse", left + 24, y + 6, 8, 8, pkg.fill === "#0D4A36" ? "#F4E8D5" : pkg.accent, "#00000000", 0);
      addText(slide, point, left + 40, y, 260, 18, {
        fontSize: 14,
        color: pkg.fill === "#0D4A36" ? COLORS.white : COLORS.ink
      });
    });
  });
  addFooter(slide);
}

function addComparison(slide) {
  addBackground(slide);
  addHeader(slide, "Feature Comparison", 4);
  addText(slide, "A simple side-by-side view of what is included.", 84, 168, 600, 54, {
    fontSize: 34,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });

  const tableLeft = 84;
  const tableTop = 260;
  const tableWidth = 1110;
  const labelWidth = 360;
  const colWidth = 250;
  const rowHeight = 56;

  addShape(slide, "roundRect", tableLeft, tableTop, tableWidth, 364, "#FFFFFF", COLORS.line, 1);
  addShape(slide, "rect", tableLeft, tableTop, tableWidth, 68, "#F1F6F3", "#00000000", 0);

  addText(slide, "Included features", tableLeft + 24, tableTop + 22, 220, 24, {
    fontSize: 18,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });

  const headers = ["Essential", "AI Concierge", "Complete Portal"];
  headers.forEach((header, index) => {
    addText(slide, header, tableLeft + labelWidth + 24 + index * colWidth, tableTop + 22, 200, 24, {
      fontSize: 16,
      color: COLORS.pine,
      bold: true,
      face: FONTS.mono
    });
  });

  const rows = [
    ["Wedding website setup", ["Yes", "Yes", "Yes"]],
    ["Tailored styling", ["Yes", "Yes", "Yes"]],
    ["AI guest question assistant", ["-", "Included", "Included"]],
    ["Private couple portal", ["-", "-", "Included"]],
    ["Checklist and RSVP tools", ["-", "-", "Included"]]
  ];

  rows.forEach(([label, values], rowIndex) => {
    const top = tableTop + 68 + rowIndex * rowHeight;
    if (rowIndex < rows.length - 1) {
      addShape(slide, "rect", tableLeft + 24, top + rowHeight - 1, tableWidth - 48, 1, COLORS.line, "#00000000", 0);
    }
    addText(slide, label, tableLeft + 24, top + 18, 300, 22, {
      fontSize: 17,
      color: COLORS.ink
    });
    values.forEach((value, valueIndex) => {
      addText(
        slide,
        value,
        tableLeft + labelWidth + 24 + valueIndex * colWidth,
        top + 16,
        180,
        24,
        {
          fontSize: 16,
          color: value === "Included" || value === "Yes" ? COLORS.pine : COLORS.muted,
          bold: value === "Included" || value === "Yes",
          face: value === "Included" || value === "Yes" ? FONTS.mono : FONTS.body
        }
      );
    });
  });

  addText(slide, "This pricing leaves room to deliver a creative, guided service rather than racing to the bottom on template work.", 84, 646, 980, 24, {
    fontSize: 13,
    color: COLORS.muted
  });
}

function addDifference(slide) {
  addBackground(slide);
  addHeader(slide, "Why This Is Different", 5);
  addText(slide, "This goes beyond asking AI for a pretty page.", 84, 166, 600, 56, {
    fontSize: 36,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });
  addText(slide, "The value is in the product thinking, structure, and delivery.", 84, 222, 580, 34, {
    fontSize: 18,
    color: COLORS.muted
  });

  const pillars = [
    {
      title: "Thoughtful structure",
      body: "The website, RSVP handling, portal, and planning tools are designed as one reusable system rather than disconnected pages."
    },
    {
      title: "Real implementation",
      body: "Database setup, live guest data, protected portal areas, and reusable wedding records create a foundation that goes well beyond a mockup."
    },
    {
      title: "Creative direction",
      body: "Design taste, package thinking, and a calm client experience are what make the service feel premium and commercially usable."
    }
  ];

  pillars.forEach((pillar, index) => {
    const left = 84 + index * 374;
    addShape(slide, "roundRect", left, 330, 336, 236, "#FFFFFF", COLORS.line, 1);
    addShape(slide, "ellipse", left + 28, 358, 42, 42, index === 1 ? COLORS.gold : COLORS.pineSoft, "#00000000", 0);
    addText(slide, pillar.title, left + 24, 426, 260, 54, {
      fontSize: 25,
      color: COLORS.ink,
      bold: true,
      face: FONTS.display
    });
    addText(slide, pillar.body, left + 24, 490, 280, 72, {
      fontSize: 16,
      color: COLORS.muted
    });
  });

  addShape(slide, "roundRect", 84, 586, 720, 46, "#EAF3EE", "#EAF3EE", 0);
  addText(slide, "What couples are really buying is a low-stress, beautiful, done-for-you digital experience.", 108, 600, 660, 20, {
    fontSize: 17,
    color: COLORS.pine,
    bold: true
  });
  addFooter(slide);
}

function addProcess(slide) {
  addBackground(slide, "deep");
  addHeader(slide, "How It Works", 6);
  addText(slide, "A simple client journey from\nenquiry to launch.", 84, 166, 620, 86, {
    fontSize: 36,
    color: COLORS.ink,
    bold: true,
    face: FONTS.display
  });
  addText(slide, "Keep the service feeling easy, guided, and organised from the first conversation.", 84, 262, 620, 34, {
    fontSize: 18,
    color: COLORS.muted
  });

  const steps = [
    ["1. Enquiry", "Discuss the couple's style, guest needs, and chosen package."],
    ["2. Content collection", "Gather names, schedule, travel details, FAQ, and optional guest list."],
    ["3. Build and refine", "Design the site, set up features, and make final edits."],
    ["4. Launch", "Publish the website and give the couple a polished digital home for the wedding."]
  ];

  steps.forEach(([title, body], index) => {
    const left = 84 + index * 272;
    addShape(slide, "roundRect", left, 358, 236, 190, "#FFFFFF", COLORS.line, 1);
    addShape(slide, "ellipse", left + 84, 310, 68, 68, COLORS.pine, COLORS.pine, 0);
    addText(slide, String(index + 1), left + 106, 329, 24, 24, {
      fontSize: 24,
      color: COLORS.white,
      bold: true,
      face: FONTS.mono,
      align: "center"
    });
    addText(slide, title, left + 20, 396, 190, 30, {
      fontSize: 22,
      color: COLORS.ink,
      bold: true,
      face: FONTS.display,
      align: "center"
    });
    addText(slide, body, left + 22, 446, 190, 68, {
      fontSize: 15,
      color: COLORS.muted,
      align: "center"
    });
  });

  addShape(slide, "roundRect", 84, 588, 610, 58, COLORS.pine, COLORS.pine, 0);
  addText(slide, "Ready to position this as a premium wedding offer", 116, 608, 550, 24, {
    fontSize: 22,
    color: COLORS.white,
    bold: true
  });
  addFooter(slide, "Use this brochure in enquiries, emails, DMs, and discovery calls.");
}

async function saveBlobToFile(blob, filePath) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(filePath, bytes);
}

async function renderPreviews(presentation) {
  for (let index = 0; index < presentation.slides.items.length; index += 1) {
    const slide = presentation.slides.items[index];
    const preview = await presentation.export({ slide, format: "png", scale: 1 });
    await saveBlobToFile(
      preview,
      path.join(PREVIEW_DIR, `slide-${String(index + 1).padStart(2, "0")}.png`)
    );
  }
}

async function buildDeck() {
  await ensureDirs();
  const presentation = Presentation.create({
    slideSize: { width: W, height: H }
  });

  const slides = [
    addCover,
    addOverview,
    addPackages,
    addComparison,
    addDifference,
    addProcess
  ];

  slides.forEach((render) => {
    const slide = presentation.slides.add();
    render(slide);
  });

  await renderPreviews(presentation);
  const blob = await PresentationFile.exportPptx(presentation);
  const outputPath = path.join(OUT_DIR, "output.pptx");
  await blob.save(outputPath);
  console.log(outputPath);
}

await buildDeck();
