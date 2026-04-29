type RichTextContentProps = {
  html: string;
  className?: string;
};

export function RichTextContent({ html, className = "" }: RichTextContentProps) {
  return (
    <div
      className={`rich-text-content space-y-4 text-[var(--muted)] ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
