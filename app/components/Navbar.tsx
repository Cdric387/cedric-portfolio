"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const NAV_LINKS = [
  { label: "Compétences", href: "/#skills" },
  { label: "Projets",     href: "/#projects" },
  { label: "Contact",     href: "/#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const isDark = theme === "dark"

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "10px 24px" : "20px 24px",
        transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? isDark ? "rgba(9, 9, 11, 0.85)" : "rgba(250, 250, 250, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled ? "1px solid var(--border)" : "none",
          borderRadius: "100px",
          padding: scrolled ? "10px 20px 10px 24px" : "0",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "auto",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "17px",
            fontWeight: 800,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.03em",
          }}
        >
          CP<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "14px",
                padding: "7px 14px",
                borderRadius: "100px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--text)"
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--muted)"
                e.currentTarget.style.background = "transparent"
              }}
            >
              {label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Changer de thème"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
              marginLeft: "4px",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--text)"
              e.currentTarget.style.borderColor = "var(--accent)"
              e.currentTarget.style.background = "var(--accent-glow)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--muted)"
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.background = "transparent"
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* CV download */}
          <a
            href="/cv.pdf"
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "4px",
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "100px",
              transition: "opacity 0.2s, transform 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = "0.85"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = "1"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <Download size={13} />
            CV
          </a>
        </div>
      </nav>
    </header>
  )
}
