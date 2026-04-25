from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path("/Users/monique/Documents/Codex/2026-04-21-project-wedding-website-ai-concierge-reusable")
OUTPUT_PATH = ROOT / "outputs" / "project-status-summary.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 54
TOP_Y = PAGE_HEIGHT - 58
BODY_WIDTH = PAGE_WIDTH - (MARGIN_X * 2)


TITLE = "Wedding Website Project Summary"
SUBTITLE = "Status update for Jo & Mike live version"

SECTIONS = [
    (
        "Where We Are Now",
        [
            "A live guest-facing wedding route now exists at /wedding with the Aegean Romance theme for Jo and Mike.",
            "The site content has been swapped over from the old John and Sarah demo to a Greece destination-wedding direction.",
            "The couple portal is active and includes checklist, RSVP dashboard, seating planner, and calendar sections.",
            "Checklist, RSVP, and calendar are now connected to the database and save real data.",
            "The existing database has been purged of sample rows and the automatic sample re-seeding has been removed.",
            "A clean new portal wedding shell will be created from the current Jo and Mike data rather than old test records.",
        ],
    ),
    (
        "Links To Use Locally",
        [
            "Public wedding site: http://localhost:3000/wedding?theme=aegean-romance",
            "Couple portal: http://localhost:3000/couple-portal?theme=aegean-romance",
            "Portal login: http://localhost:3000/portal-login?next=%2Fcouple-portal%3Ftheme%3Daegean-romance",
            "Portal password: john-sarah-portal",
        ],
    ),
    (
        "What Still Needs Doing Next",
        [
            "Replace any placeholder factual details in weddingData.json with Jo and Mike's real confirmed date, venue, travel, and contact details.",
            "Restart the dev server if Prisma changes were made recently, so the latest client is definitely being used.",
            "Push the repo to GitHub.",
            "Create a Vercel project and add DATABASE_URL, OPENAI_API_KEY if needed, COUPLE_PORTAL_PASSWORD, and PORTAL_SESSION_SECRET.",
            "Deploy and test the public wedding page plus the couple portal on the Vercel link.",
            "If they are happy with it later, connect a custom domain; for now the Vercel URL is enough to share.",
        ],
    ),
    (
        "Recommendation For Tomorrow",
        [
            "Use the guest-facing /wedding route for sharing, not /templates, because /templates is still the style-browser experience.",
            "Treat the live version as a polished first client delivery, then tighten any last details after they review it.",
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

    panel_y = 38
    panel_height = PAGE_HEIGHT - 76
    pdf.setFillColor(panel)
    pdf.setStrokeColor(border)
    pdf.roundRect(MARGIN_X - 12, panel_y, BODY_WIDTH + 24, panel_height, 22, fill=1, stroke=1)

    y = TOP_Y
    pdf.setFillColor(accent)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(MARGIN_X, y, "PROJECT STATUS")

    y -= 24
    pdf.setFillColor(heading)
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawString(MARGIN_X, y, TITLE)

    y -= 22
    pdf.setFillColor(body)
    pdf.setFont("Helvetica", 12)
    pdf.drawString(MARGIN_X, y, SUBTITLE)

    y -= 28

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

        y -= 8

    pdf.save()


if __name__ == "__main__":
    main()
