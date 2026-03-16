interface PageProps {
  params: {
    mosaicId: string;
  };
}

export default function ShareMomentPage({ params }: PageProps) {
  return (
    <section className="max-w-3xl">
      <p className="page-kicker">Share tessera</p>
      <h1 className="page-title">Add a single moment</h1>
      <p className="page-body">Contribute one photo and note to the mosaic, simply and without noise.</p>

      <div className="soft-panel">
        <p className="m-0 text-sm">Sharing into mosaic: {params.mosaicId}</p>
      </div>
    </section>
  );
}
