from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path("/Users/monique/Documents/Codex/2026-04-21-project-wedding-website-ai-concierge-reusable")
PREVIEW_DIR = ROOT / "tmp" / "slides" / "wedding-brochure" / "preview"
OUTPUT_PATH = ROOT / "outputs" / "wedding-brochure" / "agelo-wedding-brochure.pdf"


def main() -> None:
    image_paths = sorted(PREVIEW_DIR.glob("slide-*.png"))
    if not image_paths:
        raise SystemExit("No brochure preview images found.")

    first_image = Image.open(image_paths[0])
    width, height = first_image.size
    first_image.close()

    pdf = canvas.Canvas(str(OUTPUT_PATH), pagesize=(width, height))

    for image_path in image_paths:
        image = Image.open(image_path).convert("RGB")
        pdf.drawImage(ImageReader(image), 0, 0, width=width, height=height)
        pdf.showPage()
        image.close()

    pdf.save()


if __name__ == "__main__":
    main()
