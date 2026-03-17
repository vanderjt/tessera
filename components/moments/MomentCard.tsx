interface MomentImage {
  src: string;
  alt: string;
}

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

export default function MomentCard({
  author,
  reflection,
  timestamp,
  image,
  notePrompt = 'Hold your private note for this moment here.',
  noteCtaLabel = 'Add your private note',
  className,
}: MomentCardProps) {
  const timestampText = formatMomentTimestamp(timestamp);

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

      <section className="mt-5 rounded-xl border border-stone-200 bg-stone-50/80 p-3.5" aria-label="Private note entry">
        <p className="m-0 text-sm text-stone-600">{notePrompt}</p>
        <button
          type="button"
          className="mt-2 inline-flex items-center rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-700 transition hover:border-stone-400 hover:bg-white"
        >
          {noteCtaLabel}
        </button>
      </section>
    </article>
  );
}
