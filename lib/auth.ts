import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const user = await currentUser()

  if (!user) {
    return null
  }

  // Sync user with database
  const dbUser = await prisma.user.upsert({
    where: { email: user.emailAddresses[0]?.emailAddress || "" },
    update: {
      name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || "User",
      avatar: user.imageUrl,
    },
    create: {
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || "User",
      avatar: user.imageUrl,
      role: "USER",
    },
  })

  return dbUser
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication required")
  }

  return user
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}
