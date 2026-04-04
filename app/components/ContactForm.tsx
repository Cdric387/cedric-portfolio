"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Status = "idle" | "loading" | "success" | "error"

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "var(--text)",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  fontFamily: "inherit",
  lineHeight: 1.5,
}

export default function ContactForm() {
  const [name,    setName]    = useState("")
  const [email,   setEmail]   = useState("")
  const [message, setMessage] = useState("")
  const [status,  setStatus]  = useState<Status>("idle")

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) return
    setStatus("loading")

    const { error } = await supabase
      .from("messages")
      .insert({ name: name.trim(), email: email.trim(), message: message.trim() })

    if (error) {
      console.error(error)
      setStatus("error")
    } else {
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    }

    setTimeout(() => setStatus("idle"), 6000)
  }

  const isLoading = status === "loading"

  function focusStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = "rgba(129,140,248,0.5)"
    e.target.style.background = "rgba(129,140,248,0.04)"
  }
  function blurStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = "rgba(255,255,255,0.08)"
    e.target.style.background = "rgba(255,255,255,0.03)"
  }

  return (
    <section id="contact" style={{ padding: "120px 24px 160px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p style={{
            color: "var(--accent)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}>
            Contact
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: "16px",
          }}>
            Travaillons{" "}
            <span style={{ color: "var(--accent)" }}>ensemble</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: 1.6 }}>
            Disponible pour un stage dès septembre 2026. N'hésitez pas à me
            contacter pour discuter de vos projets.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Name + Email row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <input
                style={inputBase}
                placeholder="Nom"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={focusStyle}
                onBlur={blurStyle}
                disabled={isLoading}
              />
              <input
                style={inputBase}
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={focusStyle}
                onBlur={blurStyle}
                disabled={isLoading}
              />
            </div>

            <textarea
              style={{ ...inputBase, minHeight: "160px", resize: "vertical" }}
              placeholder="Votre message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onFocus={focusStyle as any}
              onBlur={blurStyle as any}
              disabled={isLoading}
            />

            {/* Status banner */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    background: "rgba(52,211,153,0.08)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    color: "#34d399",
                    fontSize: "14px",
                    fontWeight: 500,
                    overflow: "hidden",
                  }}
                >
                  <CheckCircle2 size={16} />
                  Message envoyé avec succès ! Je vous répondrai rapidement.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    color: "#f87171",
                    fontSize: "14px",
                    fontWeight: 500,
                    overflow: "hidden",
                  }}
                >
                  <AlertCircle size={16} />
                  Une erreur est survenue. Veuillez réessayer.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !name || !email || !message}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background:
                  !name || !email || !message ? "rgba(129,140,248,0.4)" : "var(--accent)",
                color: "#fff",
                border: "none",
                padding: "15px 28px",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "15px",
                cursor: !name || !email || !message || isLoading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                fontFamily: "inherit",
                alignSelf: "flex-end",
              }}
              onMouseEnter={e => {
                if (!isLoading && name && email && message)
                  e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Envoi en cours...
                  <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                </>
              ) : (
                <>
                  <Send size={15} />
                  Envoyer le message
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
