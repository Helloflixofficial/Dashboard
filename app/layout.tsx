import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import "./globals.css"

export const metadata: Metadata = {
  title: "NovaCRM - Modern Business Management",
  description: "Complete CRM and business management solution with URL shortener",
  generator: "NovaCRM",
  keywords: ["CRM", "business management", "URL shortener", "dashboard"],
  authors: [{ name: "NovaCRM Team" }],
  creator: "NovaCRM",
  publisher: "NovaCRM",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#030712",
          colorInputBackground: "#111827",
          colorInputText: "#f9fafb",
        },
      }}
    >
      <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="bg-gray-950 text-gray-50 antialiased font-sans">{children}</body>
      </html>
    </ClerkProvider>
  )
}
