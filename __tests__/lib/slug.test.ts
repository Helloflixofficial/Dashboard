import { generateSlug, isSlugExpired } from "@/lib/slug"

describe("Slug Generation", () => {
  test("generates unique slugs", () => {
    const slug1 = generateSlug()
    const slug2 = generateSlug()

    expect(slug1).not.toBe(slug2)
    expect(slug1).toHaveLength(8)
    expect(slug2).toHaveLength(8)
  })

  test("generates custom length slugs", () => {
    const shortSlug = generateSlug(4)
    const longSlug = generateSlug(12)

    expect(shortSlug).toHaveLength(4)
    expect(longSlug).toHaveLength(12)
  })

  test("only contains valid characters", () => {
    const slug = generateSlug()
    const validChars = /^[a-zA-Z0-9]+$/

    expect(slug).toMatch(validChars)
  })
})

describe("Slug Expiry Logic", () => {
  test("detects expired URLs", () => {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago

    expect(isSlugExpired(pastDate)).toBe(true)
  })

  test("detects non-expired URLs", () => {
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now

    expect(isSlugExpired(futureDate)).toBe(false)
  })

  test("handles null expiry dates", () => {
    expect(isSlugExpired(null)).toBe(false)
  })
})
