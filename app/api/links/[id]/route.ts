import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { isActive } = body

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0]?.emailAddress || "" },
    })

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update the link
    const link = await prisma.link.updateMany({
      where: {
        id: params.id,
        userId: dbUser.id, // Ensure user owns the link
      },
      data: { isActive },
    })

    if (link.count === 0) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating link:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Delete the link
    const link = await prisma.link.deleteMany({
      where: {
        id: params.id,
        userId: dbUser.id, // Ensure user owns the link
      },
    })

    if (link.count === 0) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting link:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
