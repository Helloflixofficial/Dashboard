import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0]?.emailAddress || "" },
    })

    if (!dbUser) {
      return NextResponse.json({ links: [], stats: { totalLinks: 0, totalClicks: 0, activeLinks: 0 } })
    }

    // Fetch user's links
    const links = await prisma.link.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    })

    // Calculate stats
    const stats = {
      totalLinks: links.length,
      totalClicks: links.reduce((sum, link) => sum + link.clicks, 0),
      activeLinks: links.filter((link) => link.isActive).length,
    }

    return NextResponse.json({ links, stats })
  } catch (error) {
    console.error("Error fetching links:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
