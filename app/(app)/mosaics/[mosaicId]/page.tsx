interface PageProps {
  params: {
    mosaicId: string
  }
}

export default function MosaicPage({ params }: PageProps) {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-semibold">Mosaic</h1>

      <p className="mt-4 text-gray-600">
        Mosaic ID: {params.mosaicId}
      </p>
    </main>
  )
}