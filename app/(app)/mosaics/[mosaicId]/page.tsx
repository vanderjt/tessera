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
      src: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=80',
      alt: 'City lights seen through soft rain at dusk',
    },
  },
  {
    author: 'Noor',
    timestamp: 'Remembered Mar 10, 2026',
    reflection:
      'The kettle kept humming while everyone looked through old photos at the table. Nothing dramatic happened; it just felt like we were exactly where we needed to be.',
  },
  {
    author: 'Mae',
    timestamp: 'Remembered Mar 3, 2026',
    reflection:
      'We left the windows open all afternoon. The room smelled like rain and oranges, and someone started telling stories from years ago as if no time had passed.',
    image: {
      src: 'https://images.unsplash.com/photo-1470165518248-ff79316f145d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Warm interior by a rain-streaked window',
    },
  },
];

export default async function MosaicPage({ params }: PageProps) {
  const { mosaicId } = await params;

  return (
    <section className="max-w-4xl pb-8">
      <header className="space-y-4 border-b border-stone-200/70 pb-8">
        <p className="page-kicker">Mosaic chapter</p>
        <h1 className="page-title">Late Winter Evenings</h1>
        <p className="page-body max-w-2xl">
          A quiet chapter gathered between February and March, held by the same circle and revisited when you need to
          feel close again.
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Sanctuary chapter • {mosaicId}</p>
      </header>

      <div className="mt-10 flex items-center justify-between gap-4">
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

      <div className="mt-10 space-y-10">
        {moments.map((moment, index) => (
          <div key={`${moment.author}-${moment.timestamp}`} className={index % 2 === 1 ? 'md:pl-10' : ''}>
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
