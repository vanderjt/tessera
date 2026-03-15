interface PageProps {
  params: {
    circleId: string
  }
}

export default function CirclePage({ params }: PageProps) {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-semibold">Circle</h1>

      <p className="mt-4 text-gray-600">
        Circle ID: {params.circleId}
      </p>
    </main>
  )
}