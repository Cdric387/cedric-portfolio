"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown } from "lucide-react"

const ROLES = [
  "Développeur Full Stack",
  "Expert Gestion de Projet IT",
  "Auditeur Sécurité SI",
  "Consultant Digital",
]

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIALS = [
  { href: "#", Icon: GithubIcon,   label: "GitHub" },
  { href: "#", Icon: LinkedinIcon, label: "LinkedIn" },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex(i => (i + 1) % ROLES.length),
      3500
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "15%",
          left: "-5%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.13) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: "100px",
            padding: "7px 18px",
            marginBottom: "36px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--emerald)",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span style={{ fontSize: "13px", color: "var(--emerald)", fontWeight: 500 }}>
            Disponible — Septembre 2026
          </span>
        </motion.div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(54px, 11vw, 120px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            marginBottom: "28px",
            color: "var(--text)",
          }}
        >
          Cédric{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #818cf8 20%, #a78bfa 50%, #c084fc 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pascal
          </span>
        </h1>

        {/* Animated role */}
        <div
          style={{
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "44px",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                fontSize: "clamp(17px, 3vw, 26px)",
                color: "var(--muted)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <p
          style={{
            color: "#52525b",
            fontSize: "16px",
            maxWidth: "500px",
            margin: "0 auto 52px",
            lineHeight: 1.75,
          }}
        >
          Étudiant en Master MIAGE, passionné par la création d'applications
          web modernes alliant performance technique et impact métier.
        </p>

        {/* CTA Row */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: "100px",
              fontWeight: 600,
              fontSize: "15px",
              boxShadow: "0 0 40px rgba(129,140,248,0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 48px rgba(129,140,248,0.4)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 0 40px rgba(129,140,248,0.25)"
            }}
          >
            Voir mes projets
          </a>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text)",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: "100px",
              fontWeight: 500,
              fontSize: "15px",
              transition: "background 0.2s",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.09)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
          >
            Me contacter
          </a>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "8px", marginLeft: "4px" }}>
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: "46px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--muted)",
                  transition: "color 0.2s, border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--text)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--muted)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "#3f3f46",
        }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
