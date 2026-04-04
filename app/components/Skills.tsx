"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Skill {
  name: string
  level: number
  category: string
  color: string
}

const SKILLS: Skill[] = [
  { name: "Gestion de Projet IT",   level: 95, category: "Management",    color: "#818cf8" },
  { name: "Audit & Gouvernance SI", level: 90, category: "Sécurité",      color: "#818cf8" },
  { name: "Java / Spring Boot",     level: 66, category: "Backend",       color: "#34d399" },
  { name: "SQL / Supabase",         level: 60, category: "Base de données",color: "#34d399" },
  { name: "JavaScript / React",     level: 50, category: "Frontend",      color: "#f472b6" },
  { name: "Next.js / Tailwind",     level: 45, category: "Frontend",      color: "#f472b6" },
]

function SkillCard({ skill, delay, inView }: { skill: Skill; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      style={{
        padding: "24px 26px",
        borderRadius: "16px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        cursor: "default",
        transition: "border-color 0.25s, background 0.25s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${skill.color}40`
        e.currentTarget.style.background = `${skill.color}06`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.background = "var(--bg-card)"
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
        <div>
          <p style={{ fontWeight: 600, color: "var(--text)", fontSize: "15px", marginBottom: "8px" }}>
            {skill.name}
          </p>
          <span style={{
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "100px",
            background: `${skill.color}14`,
            color: skill.color,
            border: `1px solid ${skill.color}30`,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}>
            {skill.category}
          </span>
        </div>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "36px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#1c1c1f",
          lineHeight: 1,
        }}>
          {skill.level}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
            borderRadius: "2px",
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="skills" style={{ padding: "120px 24px" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p style={{
            color: "var(--accent)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}>
            Savoir-faire
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            lineHeight: 1.05,
          }}>
            Compétences &{" "}
            <span style={{ color: "var(--accent)" }}>Maîtrise</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "14px",
        }}>
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 0.07} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
