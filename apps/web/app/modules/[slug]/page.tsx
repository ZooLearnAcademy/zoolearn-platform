import React from "react"

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <h1 className="text-4xl font-bold capitalize">Module: {slug.replace(/-/g, ' ')}</h1>
      <p className="text-muted-foreground text-lg">This is a temporary template page for the module content.</p>
    </div>
  )
}
