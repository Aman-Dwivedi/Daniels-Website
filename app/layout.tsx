import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Daniels Company - Leading Coal Processing Solutions",
  description:
    "Advanced coal processing technology and expertise delivering efficient, sustainable solutions for the energy industry.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
