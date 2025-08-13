import { customAlphabet } from "nanoid"

// Create a custom alphabet without confusing characters
const alphabet = "0123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz"
const nanoid = customAlphabet(alphabet, 6)

export function generateSlug(): string {
  return nanoid()
}

export function isValidSlug(slug: string): boolean {
  return /^[0-9A-HJ-NP-Za-hj-np-z]{6}$/.test(slug)
}

export function isExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return false
  return new Date() > expiresAt
}

export function formatExpiryDate(expiresAt: Date | null): string {
  if (!expiresAt) return "Never"
  return expiresAt.toLocaleDateString()
}
