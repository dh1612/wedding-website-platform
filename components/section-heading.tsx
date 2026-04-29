import { RichTextContent } from "@/components/rich-text-content";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleHtml?: string;
  description?: string;
  descriptionHtml?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  titleHtml,
  description,
  descriptionHtml
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      {titleHtml ? (
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
      ) : (
        <h2 className="section-title">{title}</h2>
      )}
      {descriptionHtml ? (
        <RichTextContent html={descriptionHtml} className="text-lg" />
      ) : description ? (
        <p className="prose-copy text-lg">{description}</p>
      ) : null}
    </div>
  );
}
