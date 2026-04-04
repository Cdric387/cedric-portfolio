"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Lock, AlertCircle } from "lucide-react"

const SECRET_ANSWER = "livet"

type Step = "idle" | "question" | "wrong" | "video"

interface VideoModalProps {
  src: string
  label?: string
}

export default function VideoModal({ src, label = "Voir ma présentation vidéo" }: VideoModalProps) {
  const [step, setStep] = useState<Step>("idle")
  const [input, setInput] = useState("")

  function handleOpen() {
    setStep("question")
    setInput("")
  }

  function handleClose() {
    setStep("idle")
    setInput("")
  }

  function handleSubmit() {
    if (input.trim().toLowerCase() === SECRET_ANSWER) {
      setStep("video")
    } else {
      setStep("wrong")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit()
    if (e.key === "Escape") handleClose()
  }

  return (
    <>
      {/* ── Trigger ── */}
      <button
        onClick={handleOpen}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          padding: "13px 22px",
          borderRadius: "100px",
          fontWeight: 500,
          fontSize: "14px",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "var(--accent)"
          e.currentTarget.style.background = "var(--accent-glow)"
          e.currentTarget.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border)"
          e.currentTarget.style.background = "rgba(255,255,255,0.04)"
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        <span style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: "var(--accent)", display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Play size={12} fill="#fff" color="#fff" style={{ marginLeft: "2px" }} />
        </span>
        {label}
      </button>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {step !== "idle" && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              zIndex: 200,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Question modal ── */}
      <AnimatePresence>
        {(step === "question" || step === "wrong") && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(460px, calc(100vw - 32px))",
              zIndex: 201,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "40px 36px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Fermer"
              style={{
                position: "absolute", top: "16px", right: "16px",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                color: "var(--muted)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              <X size={14} />
            </button>

            {/* Icon */}
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: "rgba(129,140,248,0.1)",
              border: "1px solid rgba(129,140,248,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "24px",
            }}>
              <Lock size={22} color="var(--accent)" />
            </div>

            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px", fontWeight: 800,
              color: "var(--text)", letterSpacing: "-0.02em",
              marginBottom: "10px", lineHeight: 1.2,
            }}>
              Accès restreint
            </h3>

            <p style={{
              color: "var(--muted)", fontSize: "14px",
              lineHeight: 1.65, marginBottom: "28px",
            }}>
              De quel lycée avons-nous discuté le 26 mars ?
              <br />
              <span style={{ fontSize: "12px", opacity: 0.6 }}>(insensible à la casse)</span>
            </p>

            {/* Input */}
            <input
              autoFocus
              value={input}
              onChange={e => {
                setInput(e.target.value)
                if (step === "wrong") setStep("question")
              }}
              onKeyDown={handleKeyDown}
              placeholder="Votre réponse..."
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: step === "wrong"
                  ? "1px solid rgba(248,113,113,0.5)"
                  : "1px solid var(--border)",
                color: "var(--text)",
                fontSize: "15px",
                outline: "none",
                fontFamily: "inherit",
                marginBottom: "10px",
                transition: "border-color 0.2s",
              }}
              onFocus={e => {
                if (step !== "wrong")
                  e.target.style.borderColor = "rgba(129,140,248,0.5)"
              }}
              onBlur={e => {
                if (step !== "wrong")
                  e.target.style.borderColor = "var(--border)"
              }}
            />

            {/* Error message */}
            <AnimatePresence>
              {step === "wrong" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden", marginBottom: "10px" }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "10px 14px", borderRadius: "10px",
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    color: "#f87171", fontSize: "13px", fontWeight: 500,
                  }}>
                    <AlertCircle size={14} />
                    Il ne s'agit pas de cet établissement.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "100px",
                border: "none",
                background: input.trim() ? "var(--accent)" : "rgba(129,140,248,0.3)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "15px",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                transition: "opacity 0.2s, transform 0.2s",
                marginTop: "4px",
              }}
              onMouseEnter={e => {
                if (input.trim()) e.currentTarget.style.opacity = "0.85"
              }}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Accéder à la vidéo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Video modal ── */}
      <AnimatePresence>
        {step === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 32 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(860px, calc(100vw - 32px))",
              zIndex: 201,
              borderRadius: "20px",
              overflow: "hidden",
              background: "#000",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Fermer la vidéo"
              style={{
                position: "absolute", top: "14px", right: "14px", zIndex: 10,
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
            >
              <X size={16} />
            </button>

            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <video
                src={src}
                controls
                autoPlay
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "contain", background: "#000",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
