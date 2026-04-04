import type { Metadata } from "next"
import { Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cédric Pascal — Portfolio",
  description:
    "Consultant IT & Développeur Full Stack.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  )
}
