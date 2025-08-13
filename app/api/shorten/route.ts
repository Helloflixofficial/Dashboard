import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/slug"

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { originalUrl, title, description, countdownSeconds = 5 } = body

    if (!originalUrl) {
      return NextResponse.json({ message: "Original URL is required" }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(originalUrl)
    } catch {
      return NextResponse.json({ message: "Invalid URL format" }, { status: 400 })
    }

    // Get or create user in database
    const dbUser = await prisma.user.upsert({
      where: { email: user.emailAddresses[0]?.emailAddress || "" },
      update: {},
      create: {
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || "User",
        role: "USER",
      },
    })

    // Generate unique short code
    let shortCode: string
    let attempts = 0
    const maxAttempts = 10

    do {
      shortCode = generateSlug()
      const existing = await prisma.link.findUnique({
        where: { shortCode },
      })
      if (!existing) break
      attempts++
    } while (attempts < maxAttempts)

    if (attempts >= maxAttempts) {
      return NextResponse.json({ message: "Failed to generate unique short code" }, { status: 500 })
    }

    // Create the link
    const link = await prisma.link.create({
      data: {
        originalUrl,
        shortCode,
        title,
        description,
        countdownSeconds: Math.max(0, Math.min(30, countdownSeconds)),
        userId: dbUser.id,
      },
    })

    return NextResponse.json(link)
  } catch (error) {
    console.error("Error creating short link:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
