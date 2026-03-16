interface PageProps {
  params: {
    circleId: string;
  };
}

export default function CirclePage({ params }: PageProps) {
  return (
    <section className="max-w-3xl">
      <p className="page-kicker">Circle</p>
      <h1 className="page-title">Circle space</h1>
      <p className="page-body">A circle holds the people who shape this sanctuary chapter.</p>

      <div className="soft-panel">
        <p className="m-0 text-sm">Viewing circle: {params.circleId}</p>
      </div>
    </section>
  );
}
