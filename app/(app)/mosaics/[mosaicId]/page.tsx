interface PageProps {
  params: {
    mosaicId: string;
  };
}

export default function MosaicPage({ params }: PageProps) {
  return (
    <section className="max-w-3xl">
      <p className="page-kicker">Mosaic</p>
      <h1 className="page-title">A chapter of shared memory</h1>
      <p className="page-body">Each mosaic is time-bounded and reflective, made from tesserae contributed by your circle.</p>

      <div className="soft-panel">
        <p className="m-0 text-sm">Viewing mosaic: {params.mosaicId}</p>
      </div>
    </section>
  );
}
