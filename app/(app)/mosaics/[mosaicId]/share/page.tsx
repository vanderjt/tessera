interface PageProps {
  params: {
    mosaicId: string
  }
}

export default function ShareMomentPage({ params }: PageProps) {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-semibold">Share a Moment</h1>

      <p className="mt-4 text-gray-600">
        Share a tessera in mosaic {params.mosaicId}.
      </p>
    </main>
  )
}