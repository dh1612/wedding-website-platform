import { sanitizeRichTextHtml } from "@/lib/rich-text";

type RichTextContentProps = {
  html: string;
  className?: string;
};

export function RichTextContent({ html, className = "" }: RichTextContentProps) {
  const sanitizedHtml = sanitizeRichTextHtml(html);

  return (
    <div
      className={`rich-text-content space-y-4 text-[var(--muted)] ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
