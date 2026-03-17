import MomentCard from '../../../../components/moments/MomentCard';

interface PageProps {
  params: Promise<{
    mosaicId: string;
  }>;
}

const moments = [
  {
    author: 'Ari',
    timestamp: 'Remembered Mar 14, 2026',
    reflection:
      'Rain started just as we reached the overlook. We stood under the cedar branches, listening instead of speaking, and the city lights softened into a quiet blur below us.',
    image: {
      src: '/images/moments/cedar-overlook.svg',
      alt: 'Quiet overlook beneath cedar branches at dusk',
    },
  },
  {
    author: 'Jonah',
    timestamp: 'Remembered Feb 27, 2026',
    reflection:
      'I found your note tucked into the cookbook again. The paper is soft at the fold now. I still read it before I start chopping anything.',
  },
  {
    author: 'Noor',
    timestamp: 'Remembered Mar 10, 2026',
    reflection:
      'The kettle kept humming while everyone looked through old photos at the table. Nothing dramatic happened; it just felt like we were exactly where we needed to be.',
    image: {
      src: '/images/moments/tea-table.svg',
      alt: 'Warm tea table with old photographs scattered nearby',
    },
  },
  {
    author: 'Mae',
    timestamp: 'Remembered Mar 3, 2026',
    reflection:
      'We left the windows open all afternoon. The room smelled like rain and oranges, and someone started telling stories from years ago as if no time had passed.',
    image: {
      src: '/images/moments/window-rain.svg',
      alt: 'Rain-touched window in a softly lit room',
    },
  },
  {
    author: 'Sam',
    timestamp: 'Remembered Feb 18, 2026',
    reflection:
      'No one was in a hurry, so supper stretched. Someone poured one last cup of tea and we stayed at the table until the street was fully dark.',
  },
  {
    author: 'Lina',
    timestamp: 'Remembered Feb 21, 2026',
    reflection:
      'We sat on the rug while the lamp stayed on in the corner, each of us half-talking, half-daydreaming. The room felt gentler than usual.',
    image: {
      src: '/images/moments/lamp-corner.svg',
      alt: 'Soft lamp glow in a quiet living room corner',
    },
  },
  {
    author: 'Rae',
    timestamp: 'Remembered Feb 8, 2026',
    reflection:
      'I heard laughter from the kitchen before I reached the door and knew it was one of those evenings that would feel familiar for a long time.',
  },
  {
    author: 'Ivy',
    timestamp: 'Remembered Feb 12, 2026',
    reflection:
      'The shoreline was cold and almost empty. We walked without deciding a direction and came home with quiet hands and salt on our sleeves.',
    image: {
      src: '/images/moments/shoreline.svg',
      alt: 'Muted winter shoreline under pale sky',
    },
  },
  {
    author: 'Theo',
    timestamp: 'Remembered Feb 2, 2026',
    reflection:
      'A short power outage left us with candles and borrowed blankets. We sat close, listening to wind at the windows, and the night slowed down on its own.',
  },
];

const momentBands = [
  {
    moments: [moments[0], moments[1]],
    spacing: 'mt-1',
    slots: ['md:col-span-7 lg:col-span-7', 'md:col-span-5 md:pt-8 lg:col-span-4 lg:col-start-9'],
  },
  {
    moments: [moments[2], moments[3]],
    spacing: 'mt-2',
    slots: ['md:col-span-5 lg:col-span-4 lg:col-start-2', 'md:col-span-7 md:pt-6 lg:col-span-6 lg:col-start-7'],
  },
  {
    moments: [moments[4], moments[5]],
    spacing: 'mt-1.5',
    slots: ['md:col-span-8 lg:col-span-7', 'md:col-span-4 md:pt-7 lg:col-span-4 lg:col-start-9'],
  },
  {
    moments: [moments[6], moments[7], moments[8]],
    spacing: 'mt-3',
    slots: [
      'md:col-span-6 lg:col-span-4 lg:col-start-2',
      'md:col-span-6 md:pt-5 lg:col-span-5 lg:col-start-7',
      'md:col-span-7 md:col-start-3 lg:col-span-6 lg:col-start-4',
    ],
  },
];

export default async function MosaicPage({ params }: PageProps) {
  const { mosaicId } = await params;

  return (
    <section className="max-w-5xl px-1 pb-10">
      <header className="pb-1">
        <div className="rounded-md border border-stone-300/65 bg-stone-100/95 px-5 py-6 shadow-[0_6px_16px_-18px_rgba(41,37,36,0.75)] md:px-7 md:py-7">
          <p className="page-kicker tracking-[0.12em] text-stone-600/95">Mosaic chapter</p>
          <h1 className="page-title mt-2 text-stone-900">Late Winter Evenings</h1>
          <p className="page-body mt-3 max-w-2xl text-stone-700/95">
            A quiet chapter gathered between February and March, held by the same circle and revisited when you need
            to feel close again.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-stone-500/95">Sanctuary chapter • {mosaicId}</p>

          <div className="mt-5 space-y-3 border-t border-stone-300/55 pt-4">
            <p className="max-w-xl text-sm leading-relaxed text-stone-600/95">
              These tesserae are placed intentionally, like stones on a shared wall. Take your time and linger where
              something resonates.
            </p>
            <button
              type="button"
              className="rounded-full border border-stone-400/70 bg-stone-100/90 px-4 py-2 text-sm text-stone-700 transition hover:border-stone-500/90 hover:text-stone-900"
            >
              Add a tessera
            </button>
          </div>
        </div>
      </header>

      <div className="relative mt-4 rounded-[1.35rem] bg-stone-200/50 bg-[linear-gradient(180deg,rgba(250,250,249,0.12)_0%,rgba(231,229,228,0.06)_56%,rgba(231,229,228,0.03)_100%)] px-4 pt-5 pb-4 ring-1 ring-inset ring-stone-600/10 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.34),inset_0_12px_20px_-16px_rgba(28,25,23,0.36),inset_0_-10px_16px_-15px_rgba(255,255,255,0.18)] md:px-6 lg:px-7">
        <div
          className="pointer-events-none absolute inset-x-4 top-0 h-8 bg-gradient-to-b from-stone-700/10 via-stone-700/5 to-transparent md:inset-x-6 lg:inset-x-7"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-4 bottom-0 h-10 bg-gradient-to-t from-stone-50/45 via-stone-50/15 to-transparent md:inset-x-6 lg:inset-x-7"
          aria-hidden
        />
        {momentBands.map((band, bandIndex) => (
          <div
            key={`band-${bandIndex}`}
            className={`grid gap-5 md:grid-cols-12 lg:gap-6 ${bandIndex === 0 ? '' : band.spacing}`}
          >
            {band.moments.map((moment, momentIndex) => (
              <div key={`${moment.author}-${moment.timestamp}`} className={band.slots[momentIndex]}>
                <MomentCard
                  author={moment.author}
                  timestamp={moment.timestamp}
                  reflection={moment.reflection}
                  image={moment.image}
                  notePrompt="What did this moment feel like for you?"
                  noteCtaLabel="Leave your private note"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
