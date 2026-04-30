"use client";

import { useEffect, useId, useRef, useState } from "react";
import { plainTextToHtml, sanitizeRichTextHtml } from "@/lib/rich-text";

type RichTextEditorFieldProps = {
  name: string;
  label: string;
  defaultValue: string;
  description?: string;
  minHeightClassName?: string;
};

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
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
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
  }

  function saveSelection() {
    const editor = editorRef.current;
    const selection = document.getSelection();

    if (!editor || !selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) {
      return;
    }

    savedRangeRef.current = range.cloneRange();
  }

  function restoreSelection() {
    const editor = editorRef.current;
    const savedRange = savedRangeRef.current;

    if (!editor || !savedRange) {
      return false;
    }

    const selection = document.getSelection();
    if (!selection) {
      return false;
    }

    editor.focus();
    selection.removeAllRanges();
    selection.addRange(savedRange);
    return true;
  }

  function withSelection(action: () => void) {
    restoreSelection();
    action();
    const editor = editorRef.current;
    if (editor) {
      const nextHtml = sanitizeRichTextHtml(editor.innerHTML);
      editor.innerHTML = nextHtml;
      setHtml(nextHtml);
      editor.focus();
      saveSelection();
      refreshToolbarState();
    }
  }

  function applyCommand(command: string, value?: string) {
    withSelection(() => {
      document.execCommand(command, false, value);
    });
  }

  function insertCallout(style: "ivory" | "gold") {
    withSelection(() => {
      const selection = document.getSelection();
      const selectedText = selection?.toString().trim() ?? "";
      const html = selectedText
        ? `<div class="editor-callout editor-callout-${style}"><p>${selectedText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</p></div>`
        : `<div class="editor-callout editor-callout-${style}"><p>Callout text</p></div>`;

      document.execCommand("insertHTML", false, html);
    });
  }

  useEffect(() => {
    const sanitizedDefault = sanitizeRichTextHtml(defaultValue);
    setHtml(sanitizedDefault);

    const editor = editorRef.current;
    if (editor && editor.innerHTML !== sanitizedDefault) {
      editor.innerHTML = sanitizedDefault;
    }
  }, [defaultValue]);

  useEffect(() => {
    function handleSelectionChange() {
      const editor = editorRef.current;
      const selection = document.getSelection();

      if (!editor || !selection?.anchorNode) {
        return;
      }

      if (!editor.contains(selection.anchorNode)) {
        return;
      }

      saveSelection();
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
          <ToolbarButton label="Ivory box" onClick={() => insertCallout("ivory")} />
          <ToolbarButton label="Gold box" onClick={() => insertCallout("gold")} />
        </div>

        <div
          id={editorId}
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onPaste={(event) => {
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            const pastedHtml = plainTextToHtml(text);

            withSelection(() => {
              document.execCommand("insertHTML", false, pastedHtml);
            });
          }}
          onInput={(event) => {
            setHtml(sanitizeRichTextHtml(event.currentTarget.innerHTML));
            saveSelection();
            refreshToolbarState();
          }}
          onKeyUp={() => {
            saveSelection();
            refreshToolbarState();
          }}
          onMouseUp={() => {
            saveSelection();
            refreshToolbarState();
          }}
          onFocus={() => {
            saveSelection();
            refreshToolbarState();
          }}
          className={`w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)] outline-none ${minHeightClassName}`}
        />
      </div>

      <input type="hidden" name={name} value={html} />
    </div>
  );
}
