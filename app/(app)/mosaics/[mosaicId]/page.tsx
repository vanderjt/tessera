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
    author: 'Jonah',
    timestamp: 'Remembered Feb 27, 2026',
    reflection:
      'I found your note tucked into the cookbook again. The paper is soft at the fold now. I still read it before I start chopping anything.',
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
    author: 'Sam',
    timestamp: 'Remembered Feb 18, 2026',
    reflection:
      'No one was in a hurry, so supper stretched. Someone poured one last cup of tea and we stayed at the table until the street was fully dark.',
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
    author: 'Rae',
    timestamp: 'Remembered Feb 8, 2026',
    reflection:
      'I heard laughter from the kitchen before I reached the door and knew it was one of those evenings that would feel familiar for a long time.',
  },
  {
    author: 'Theo',
    timestamp: 'Remembered Feb 2, 2026',
    reflection:
      'A short power outage left us with candles and borrowed blankets. We sat close, listening to wind at the windows, and the night slowed down on its own.',
  },
];

export default async function MosaicPage({ params }: PageProps) {
  const { mosaicId } = await params;

  const placementPattern = [
    'md:col-span-7 md:translate-y-0 md:pr-5 lg:col-span-6 lg:pr-8',
    'md:col-span-5 md:translate-y-9 md:max-w-[27rem] md:justify-self-end lg:col-span-4 lg:col-start-8 lg:translate-y-10',
    'md:col-span-8 md:translate-y-3 md:max-w-[40rem] md:pr-7 lg:col-span-6 lg:col-start-2 lg:translate-y-2',
    'md:col-span-5 md:translate-y-11 md:max-w-[26rem] md:justify-self-end lg:col-span-4 lg:col-start-8',
  ];

  return (
    <section className="max-w-5xl rounded-[2rem] bg-stone-50/45 px-1 pb-10">
      <header className="space-y-4 pb-7">
        <p className="page-kicker">Mosaic chapter</p>
        <h1 className="page-title">Late Winter Evenings</h1>
        <p className="page-body max-w-2xl">
          A quiet chapter gathered between February and March, held by the same circle and revisited when you need to
          feel close again.
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Sanctuary chapter • {mosaicId}</p>
      </header>

      <div className="mt-2 h-px w-full bg-gradient-to-r from-stone-200/60 via-stone-200/30 to-transparent" />

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-stone-600">
          These tesserae are placed intentionally, like stones on a shared wall. Take your time and linger where
          something resonates.
        </p>
        <button
          type="button"
          className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
        >
          Add a tessera
        </button>
      </div>

      <div className="mt-9 space-y-9 md:grid md:grid-cols-12 md:gap-x-5 md:gap-y-8 md:space-y-0 lg:gap-x-8 lg:gap-y-10">
        {moments.map((moment, index) => (
          <div
            key={`${moment.author}-${moment.timestamp}`}
            className={`${placementPattern[index % placementPattern.length]} ${
              !moment.image ? 'md:w-[96%]' : ''
            }`}
          >
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
    </section>
  );
}
