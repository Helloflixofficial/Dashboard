import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NovaCRM - Your Business at a Glance",
  description:
    "Modern CRM and business management solution with powerful insights",
  generator: "NovaCRM",
  keywords: ["CRM", "business management", "dashboard", "analytics"],
  authors: [{ name: "NovaCRM Team" }],
  creator: "NovaCRM",
  publisher: "NovaCRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "hsl(217 91% 60%)",
          colorBackground: "hsl(220 13% 9%)",
          colorInputBackground: "hsl(220 13% 15%)",
          colorInputText: "hsl(220 9% 98%)",
        },
      }}
    >
      <html lang="en" className={`dark ${inter.variable}`}>
        <body className="bg-background text-foreground antialiased font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
