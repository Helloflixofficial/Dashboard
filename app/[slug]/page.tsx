import { prisma } from "@/lib/prisma"
import { Countdown } from "@/components/countdown"
import { notFound, redirect } from "next/navigation"

interface SlugPageProps {
  params: { slug: string }
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = params

  // Find the link
  const link = await prisma.link.findUnique({
    where: { shortCode: slug },
  })

  if (!link) {
    notFound()
  }

  // Check if link is active
  if (!link.isActive) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Link Inactive</h1>
          <p className="text-muted-foreground">This link has been deactivated.</p>
        </div>
      </div>
    )
  }

  // Check if link is expired
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Link Expired</h1>
          <p className="text-muted-foreground">This link has expired.</p>
        </div>
      </div>
    )
  }

  // If no countdown, redirect immediately
  if (link.countdownSeconds === 0) {
    // Increment click count
    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    })

    redirect(link.originalUrl)
  }

  // Show countdown page
  return (
    <Countdown
      originalUrl={link.originalUrl}
      title={link.title}
      countdownSeconds={link.countdownSeconds}
      linkId={link.id}
    />
  )
}
