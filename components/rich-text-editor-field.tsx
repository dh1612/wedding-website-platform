"use client";

import { useEffect, useId, useState } from "react";

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
  onClick,
  active = false
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
        active
          ? "border-[#184b38] bg-[#184b38] text-white shadow-[0_10px_24px_rgba(24,75,56,0.16)]"
          : "border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[#f5f2ec]"
      }`}
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
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    bulletList: false,
    paragraph: false,
    headingLarge: false,
    headingSmall: false,
    quote: false
  });
  const [activeFont, setActiveFont] = useState("");

  function refreshToolbarState() {
    if (typeof document === "undefined") {
      return;
    }

    const nextFormats = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      bulletList: document.queryCommandState("insertUnorderedList"),
      paragraph: false,
      headingLarge: false,
      headingSmall: false,
      quote: false
    };

    const block = document.queryCommandValue("formatBlock")?.toLowerCase?.() ?? "";
    nextFormats.paragraph = block.includes("p");
    nextFormats.headingLarge = block.includes("h2");
    nextFormats.headingSmall = block.includes("h3");
    nextFormats.quote = block.includes("blockquote");

    setActiveFormats(nextFormats);

    const fontName = document.queryCommandValue("fontName")?.replaceAll('"', "") ?? "";
    const matchedFont =
      fontOptions.find((option) => fontName.toLowerCase().includes(option.value.replaceAll('"', "").toLowerCase()))?.value ?? "";
    setActiveFont(matchedFont);
  }

  function withSelection(action: () => void) {
    action();
    const editor = document.getElementById(editorId);
    if (editor instanceof HTMLDivElement) {
      setHtml(editor.innerHTML);
      editor.focus();
      refreshToolbarState();
    }
  }

  function applyCommand(command: string, value?: string) {
    withSelection(() => {
      document.execCommand(command, false, value);
    });
  }

  useEffect(() => {
    setHtml(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    function handleSelectionChange() {
      const editor = document.getElementById(editorId);
      const selection = document.getSelection();

      if (!(editor instanceof HTMLDivElement) || !selection?.anchorNode) {
        return;
      }

      if (!editor.contains(selection.anchorNode)) {
        return;
      }

      refreshToolbarState();
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [editorId]);

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
          <ToolbarButton label="Bold" active={activeFormats.bold} onClick={() => applyCommand("bold")} />
          <ToolbarButton label="Italic" active={activeFormats.italic} onClick={() => applyCommand("italic")} />
          <ToolbarButton label="Bullet list" active={activeFormats.bulletList} onClick={() => applyCommand("insertUnorderedList")} />
          <ToolbarButton label="Paragraph" active={activeFormats.paragraph} onClick={() => applyCommand("formatBlock", "p")} />
          <ToolbarButton label="Large heading" active={activeFormats.headingLarge} onClick={() => applyCommand("formatBlock", "h2")} />
          <ToolbarButton label="Small heading" active={activeFormats.headingSmall} onClick={() => applyCommand("formatBlock", "h3")} />
          <ToolbarButton label="Quote" active={activeFormats.quote} onClick={() => applyCommand("formatBlock", "blockquote")} />
          <select
            value={activeFont}
            onMouseDown={(event) => event.preventDefault()}
            onChange={(event) => {
              if (!event.target.value) return;
              applyCommand("fontName", event.target.value);
            }}
            className={`rounded-full border px-3 py-2 text-xs font-medium ${
              activeFont
                ? "border-[#184b38] bg-[#184b38] text-white"
                : "border-[var(--border)] bg-white text-[var(--foreground)]"
            }`}
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
          onInput={(event) => {
            setHtml(event.currentTarget.innerHTML);
            refreshToolbarState();
          }}
          onKeyUp={refreshToolbarState}
          onMouseUp={refreshToolbarState}
          onFocus={refreshToolbarState}
          className={`w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)] outline-none ${minHeightClassName}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <input type="hidden" name={name} value={html} />
    </div>
  );
}
