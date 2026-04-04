"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0)
      setShowTop(scrollY > 300)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ── Barre de progression ── */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "transparent",
      }}>
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #818cf8, #a78bfa, #c084fc)",
            boxShadow: "0 0 10px rgba(129,140,248,0.6)",
            transformOrigin: "left",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* ── Bouton retour en haut ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            style={{
              position: "fixed",
              bottom: "32px",
              right: "28px",
              zIndex: 9998,
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "var(--muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--text)"
              e.currentTarget.style.borderColor = "var(--accent)"
              e.currentTarget.style.background = "var(--accent-glow)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--muted)"
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.background = "var(--bg-card)"
            }}
          >
            {/* Mini progress arc autour du bouton */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}
              viewBox="0 0 46 46"
            >
              <circle cx="23" cy="23" r="21" fill="none" stroke="rgba(129,140,248,0.12)" strokeWidth="2" />
              <circle
                cx="23" cy="23" r="21"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 21}`}
                strokeDashoffset={`${2 * Math.PI * 21 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
            </svg>
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
