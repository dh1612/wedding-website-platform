const CALLOUT_CLASSES = new Set([
  "editor-callout editor-callout-ivory",
  "editor-callout editor-callout-gold"
]);

function escapeForHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractAllowedCalloutClass(attributes: string) {
  const classMatch = attributes.match(/class\s*=\s*["']([^"']+)["']/i);
  if (!classMatch) {
    return null;
  }

  const className = classMatch[1].trim().replace(/\s+/g, " ");
  return CALLOUT_CLASSES.has(className) ? className : null;
}

export function plainTextToHtml(value: string) {
  return value
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeForHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function sanitizeRichTextHtml(input: string) {
  if (!input.trim()) {
    return "";
  }

  let html = input;

  html = html.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, "");

  html = html.replace(/<\s*b\b[^>]*>/gi, "<strong>");
  html = html.replace(/<\s*\/\s*b\s*>/gi, "</strong>");
  html = html.replace(/<\s*i\b[^>]*>/gi, "<em>");
  html = html.replace(/<\s*\/\s*i\s*>/gi, "</em>");

  html = html.replace(/<\s*(span|font)\b[^>]*>/gi, "");
  html = html.replace(/<\s*\/\s*(span|font)\s*>/gi, "");

  html = html.replace(/<div\b([^>]*)>/gi, (_match, attributes: string) => {
    const allowedClass = extractAllowedCalloutClass(attributes);
    return allowedClass ? `<div class="${allowedClass}">` : "<p>";
  });
  html = html.replace(/<\/div>/gi, "</div>");

  html = html.replace(/<(p|h2|h3|blockquote|ul|ol|li|strong|em)\b[^>]*>/gi, "<$1>");
  html = html.replace(/<(br)\b[^>]*\/?>/gi, "<br>");

  html = html.replace(/<(?!\/?(p|div|h2|h3|blockquote|ul|ol|li|strong|em|br)\b)[^>]+>/gi, "");

  html = html.replace(/<p>\s*<\/p>/gi, "");
  html = html.replace(/(<br>\s*){3,}/gi, "<br><br>");

  return html.trim();
}

