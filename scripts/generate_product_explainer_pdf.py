from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path("/Users/monique/Documents/Codex/2026-04-21-project-wedding-website-ai-concierge-reusable")
OUTPUT_PATH = ROOT / "outputs" / "wedding-product-explainer.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 54
TOP_Y = PAGE_HEIGHT - 58
BODY_WIDTH = PAGE_WIDTH - (MARGIN_X * 2)


TITLE = "What We’ve Built"
SUBTITLE = "A simple explanation of the wedding website + portal product"

SECTIONS = [
    (
        "What This Is",
        [
            "This started as a reusable wedding website, but it has now grown into a wedding website plus planning portal.",
            "It is designed to be reused for different couples, with the look and content changed without rebuilding the whole system each time.",
            "The value is not just the website itself, but the combination of beautiful design, guest information, and planning tools behind the scenes.",
        ],
    ),
    (
        "What’s Already Built",
        [
            "A polished public wedding website with multiple visual styles and themes.",
            "A private couple portal for planning.",
            "An RSVP dashboard for tracking guest replies.",
            "A wedding checklist for tasks and notes.",
            "A seating-planning area.",
            "A calendar / roadmap planning feature.",
            "An optional AI concierge for guest questions.",
            "A real database underneath it, so the portal is backed by live data rather than just being a static mockup.",
        ],
    ),
    (
        "Why It’s More Than A Website",
        [
            "It is no longer just a page with wedding details on it.",
            "It is moving toward a product where the couple has a guest-facing site and their own private planning space.",
            "That means it can be sold as a service, not just as a one-off page design.",
        ],
    ),
    (
        "What Happens Next",
        [
            "Replace all remaining placeholder wedding details with the real couple’s confirmed information.",
            "Deploy the project to Vercel so it has a live shareable link.",
            "Test the public site and the couple portal on that live link.",
            "Keep refining the portal interface based on how real couples use it.",
            "Decide which features belong in each package.",
        ],
    ),
    (
        "How It Could Be Sold",
        [
            "Basic: a beautiful wedding website with the key guest information.",
            "Mid-tier: the website plus the AI guest assistant.",
            "Premium: the website plus the private planning portal with RSVP, checklist, seating, and calendar tools.",
        ],
    ),
    (
        "The Core Message",
        [
            "This is not just a wedding website anymore.",
            "It is the beginning of a sellable digital wedding service: website in front, planning portal behind, and reusable structure underneath.",
        ],
    ),
]


def draw_wrapped_text(pdf: canvas.Canvas, text: str, x: float, y: float, max_width: float, font_name: str, font_size: int, color: HexColor, leading: float):
    words = text.split()
    current_line = ""
    lines: list[str] = []

    for word in words:
      trial = f"{current_line} {word}".strip()
      if stringWidth(trial, font_name, font_size) <= max_width:
          current_line = trial
      else:
          if current_line:
              lines.append(current_line)
          current_line = word

    if current_line:
        lines.append(current_line)

    pdf.setFillColor(color)
    pdf.setFont(font_name, font_size)

    current_y = y
    for line in lines:
        pdf.drawString(x, current_y, line)
        current_y -= leading

    return current_y


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT_PATH), pagesize=A4)

    background = HexColor("#FAF7F2")
    panel = HexColor("#FFFFFF")
    heading = HexColor("#1E2F34")
    accent = HexColor("#5E8A98")
    body = HexColor("#4E5E63")
    border = HexColor("#D9E2E5")

    pdf.setFillColor(background)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

    panel_y = 34
    panel_height = PAGE_HEIGHT - 68
    pdf.setFillColor(panel)
    pdf.setStrokeColor(border)
    pdf.roundRect(MARGIN_X - 12, panel_y, BODY_WIDTH + 24, panel_height, 22, fill=1, stroke=1)

    y = TOP_Y
    pdf.setFillColor(accent)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(MARGIN_X, y, "PRODUCT EXPLAINER")

    y -= 24
    pdf.setFillColor(heading)
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawString(MARGIN_X, y, TITLE)

    y -= 22
    pdf.setFillColor(body)
    pdf.setFont("Helvetica", 12)
    pdf.drawString(MARGIN_X, y, SUBTITLE)

    y -= 24

    for section_title, bullets in SECTIONS:
        pdf.setFillColor(accent)
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(MARGIN_X, y, section_title)
        y -= 18

        for bullet in bullets:
            pdf.setFillColor(accent)
            pdf.circle(MARGIN_X + 4, y + 3, 2.2, fill=1, stroke=0)
            y = draw_wrapped_text(
                pdf,
                bullet,
                MARGIN_X + 14,
                y,
                BODY_WIDTH - 14,
                "Helvetica",
                11,
                body,
                15,
            )
            y -= 4

        y -= 6

    pdf.save()


if __name__ == "__main__":
    main()
