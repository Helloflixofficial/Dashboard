import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { userAgent, referer } = body

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown"

    // Update click count and create analytics record
    await Promise.all([
      prisma.link.update({
        where: { id: params.id },
        data: { clicks: { increment: 1 } },
      }),
      prisma.linkAnalytics.create({
        data: {
          linkId: params.id,
          ipAddress: ip,
          userAgent,
          referer,
        },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
