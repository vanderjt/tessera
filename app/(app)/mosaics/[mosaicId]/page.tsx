import MomentCard from '../../../../components/moments/MomentCard';

interface PageProps {
  params: Promise<{
    mosaicId: string;
  }>;
}

export default async function MosaicPage({ params }: PageProps) {
  const { mosaicId } = await params;

  return (
    <section className="max-w-3xl">
      <p className="page-kicker">Mosaic</p>
      <h1 className="page-title">A chapter of shared memory</h1>
      <p className="page-body">Each mosaic is time-bounded and reflective, made from tesserae contributed by your circle.</p>

      <div className="mt-8">
        <MomentCard
          author="Ari"
          timestamp="Remembered Mar 14, 2026"
          reflection="Rain started just as we reached the overlook. We stood under the cedar branches, listening instead of speaking, and the city lights softened into a quiet blur below us."
          image={{
            src: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=80',
            alt: 'City lights seen through soft rain at dusk',
          }}
          notePrompt="What did this moment feel like for you?"
          noteCtaLabel="Leave your private note"
        />
      </div>

      <div className="soft-panel">
        <p className="m-0 text-sm">Viewing mosaic: {mosaicId}</p>
      </div>
    </section>
  );
}
