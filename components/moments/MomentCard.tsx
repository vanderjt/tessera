'use client';

import { useMemo, useState } from 'react';

interface MomentImage {
  src: string;
  alt: string;
}

const REFLECTIVE_PROMPTS = [
  'What did this moment bring back for you?',
  'What would you like to remember about this moment?',
  'What felt most present here for you?',
  'What does this moment hold for you now?',
] as const;

export interface MomentCardProps {
  author: string;
  reflection: string;
  timestamp: Date | string;
  image?: MomentImage;
  notePrompt?: string;
  noteCtaLabel?: string;
  className?: string;
}

function formatMomentTimestamp(timestamp: MomentCardProps['timestamp']) {
  if (typeof timestamp === 'string') {
    return timestamp;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(timestamp);
}

function getRandomPrompt() {
  return REFLECTIVE_PROMPTS[Math.floor(Math.random() * REFLECTIVE_PROMPTS.length)];
}

export default function MomentCard({ author, reflection, timestamp, image, className }: MomentCardProps) {
  const timestampText = formatMomentTimestamp(timestamp);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [savedNote, setSavedNote] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const hasSavedNote = savedNote.length > 0;
  const canSaveNote = draftNote.trim().length > 0;

  const notePrompt = useMemo(() => activePrompt ?? getRandomPrompt(), [activePrompt]);

  const handleOpenNewNote = () => {
    if (!activePrompt) {
      setActivePrompt(getRandomPrompt());
    }

    setDraftNote('');
    setIsEditorOpen(true);
  };

  const handleEditNote = () => {
    if (!activePrompt) {
      setActivePrompt(getRandomPrompt());
    }

    setDraftNote(savedNote);
    setIsEditorOpen(true);
  };

  const handleCancel = () => {
    if (hasSavedNote) {
      setDraftNote(savedNote);
      setIsEditorOpen(false);
      return;
    }

    setDraftNote('');
    setActivePrompt(null);
    setIsEditorOpen(false);
  };

  const handleSave = () => {
    const nextNote = draftNote.trim();

    if (!nextNote) {
      return;
    }

    setSavedNote(nextNote);
    setDraftNote(nextNote);
    setIsEditorOpen(false);
  };

  return (
    <article
      className={`rounded-[1.4rem] border border-stone-200/65 bg-white/75 p-5 shadow-[0_9px_24px_-24px_rgba(28,25,23,0.42)] transition-[transform,box-shadow] duration-500 ease-out hover:scale-[1.015] hover:shadow-[0_16px_34px_-24px_rgba(28,25,23,0.48)] sm:p-6 ${className ?? ''}`}
      aria-label={`Remembered by ${author}`}
    >
      <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-stone-500">
        <p className="m-0 text-stone-600">{author}</p>
        <span aria-hidden>•</span>
        <time dateTime={typeof timestamp === 'string' ? undefined : timestamp.toISOString()}>{timestampText}</time>
      </header>

      <p className="mt-4 max-w-prose text-[1.04rem] leading-relaxed text-stone-700">{reflection}</p>

      {image ? (
        <figure className="mt-5 overflow-hidden rounded-xl border border-stone-200/80 bg-stone-50">
          <img src={image.src} alt={image.alt} className="h-auto w-full object-cover" />
        </figure>
      ) : null}

      <section
        className="mt-5 rounded-xl border border-stone-200 bg-stone-50/80 p-3.5 transition-all duration-300 ease-out"
        aria-label="Private note entry"
      >
        {!isEditorOpen && !hasSavedNote ? (
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-stone-300/90 px-3 py-1.5 text-sm text-stone-700 transition hover:border-stone-400 hover:bg-white"
            onClick={handleOpenNewNote}
          >
            Leave a private note
          </button>
        ) : null}

        {isEditorOpen ? (
          <div className="space-y-3">
            <p className="m-0 text-sm text-stone-600">{notePrompt}</p>
            <textarea
              value={draftNote}
              onChange={(event) => setDraftNote(event.target.value)}
              rows={4}
              className="w-full resize-y rounded-lg border border-stone-200 bg-white/90 px-3 py-2 text-sm leading-relaxed text-stone-700 outline-none transition focus:border-stone-300 focus:ring-2 focus:ring-stone-200"
              placeholder="Write your private reflection..."
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={!canSaveNote}
                className="rounded-full border border-stone-300/90 px-3 py-1.5 text-sm text-stone-700 transition hover:border-stone-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-55"
              >
                Save note
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-transparent px-3 py-1.5 text-sm text-stone-500 transition hover:border-stone-200 hover:text-stone-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {!isEditorOpen && hasSavedNote ? (
          <div className="space-y-2">
            <p className="m-0 text-xs uppercase tracking-[0.08em] text-stone-500">Your private note</p>
            <p className="m-0 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{savedNote}</p>
            <button
              type="button"
              onClick={handleEditNote}
              className="inline-flex rounded-full border border-transparent px-3 py-1 text-sm text-stone-500 transition hover:border-stone-200 hover:text-stone-700"
            >
              Edit note
            </button>
          </div>
        ) : null}
      </section>
    </article>
  );
}
