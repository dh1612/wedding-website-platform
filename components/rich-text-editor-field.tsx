"use client";

import { useId, useState } from "react";

type RichTextEditorFieldProps = {
  name: string;
  label: string;
  defaultValue: string;
  description?: string;
  minHeightClassName?: string;
};

const fontOptions = [
  { label: "Classic serif", value: "Georgia" },
  { label: "Modern serif", value: "\"Times New Roman\"" },
  { label: "Clean sans", value: "Arial" },
  { label: "Monospace", value: "\"Courier New\"" }
] as const;

function ToolbarButton({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[var(--foreground)] transition hover:bg-[#f5f2ec]"
    >
      {label}
    </button>
  );
}

export function RichTextEditorField({
  name,
  label,
  defaultValue,
  description,
  minHeightClassName = "min-h-[180px]"
}: RichTextEditorFieldProps) {
  const editorId = useId();
  const [html, setHtml] = useState(defaultValue);

  function withSelection(action: () => void) {
    action();
    const editor = document.getElementById(editorId);
    if (editor instanceof HTMLDivElement) {
      setHtml(editor.innerHTML);
      editor.focus();
    }
  }

  function applyCommand(command: string, value?: string) {
    withSelection(() => {
      document.execCommand(command, false, value);
    });
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label htmlFor={editorId} className="text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
        {description ? (
          <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
        ) : null}
      </div>

      <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <ToolbarButton label="Bold" onClick={() => applyCommand("bold")} />
          <ToolbarButton label="Italic" onClick={() => applyCommand("italic")} />
          <ToolbarButton label="Bullet list" onClick={() => applyCommand("insertUnorderedList")} />
          <ToolbarButton label="Paragraph" onClick={() => applyCommand("formatBlock", "p")} />
          <ToolbarButton label="Large heading" onClick={() => applyCommand("formatBlock", "h2")} />
          <ToolbarButton label="Small heading" onClick={() => applyCommand("formatBlock", "h3")} />
          <ToolbarButton label="Quote" onClick={() => applyCommand("formatBlock", "blockquote")} />
          <select
            defaultValue=""
            onChange={(event) => {
              if (!event.target.value) return;
              applyCommand("fontName", event.target.value);
              event.target.value = "";
            }}
            className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[var(--foreground)]"
          >
            <option value="">Change font</option>
            {fontOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          id={editorId}
          contentEditable
          suppressContentEditableWarning
          onInput={(event) => setHtml(event.currentTarget.innerHTML)}
          className={`w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)] outline-none ${minHeightClassName}`}
          dangerouslySetInnerHTML={{ __html: defaultValue }}
        />
      </div>

      <input type="hidden" name={name} value={html} />
    </div>
  );
}
