"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ArrowRight, X } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  url?: string
  tags?: string[]
  category?: string
}

const CATEGORIES = ["Tous", "Web", "Mobile", "Data", "DevOps"]

function CategoryFilter({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div style={{
      display: "flex",
      gap: "4px",
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "4px",
      flexWrap: "wrap",
    }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            padding: "8px 18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            transition: "all 0.2s",
            background: active === cat ? "var(--accent)" : "transparent",
            color: active === cat ? "#fff" : "var(--muted)",
            fontFamily: "inherit",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28, delay: index * 0.05 }}
      whileHover={{ y: -4, borderColor: "rgba(129,140,248,0.35)" } as object}
      onClick={onClick}
      style={{
        padding: "28px",
        borderRadius: "18px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >
      {project.category && (
        <span style={{
          display: "inline-block",
          alignSelf: "flex-start",
          fontSize: "11px",
          padding: "3px 10px",
          borderRadius: "100px",
          background: "rgba(129,140,248,0.1)",
          color: "var(--accent)",
          border: "1px solid rgba(129,140,248,0.2)",
          marginBottom: "16px",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}>
          {project.category}
        </span>
      )}

      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "19px",
        fontWeight: 700,
        color: "var(--text)",
        marginBottom: "10px",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
      }}>
        {project.title}
      </h3>

      <p style={{
        color: "var(--muted)",
        fontSize: "14px",
        lineHeight: 1.65,
        marginBottom: "20px",
        flexGrow: 1,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {project.description}
      </p>

      {project.tags && project.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} style={{
              fontSize: "11px",
              padding: "3px 10px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#a1a1aa",
              letterSpacing: "0.02em",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 100,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: "spring", damping: 28, stiffness: 380 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(640px, calc(100vw - 40px))",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          padding: "44px",
          zIndex: 101,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          <X size={16} />
        </button>

        {project.category && (
          <span style={{
            display: "inline-block",
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "100px",
            background: "rgba(129,140,248,0.1)",
            color: "var(--accent)",
            border: "1px solid rgba(129,140,248,0.2)",
            marginBottom: "20px",
            fontWeight: 500,
          }}>
            {project.category}
          </span>
        )}

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "30px",
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: "-0.03em",
          marginBottom: "16px",
          lineHeight: 1.1,
        }}>
          {project.title}
        </h2>

        <p style={{
          color: "var(--muted)",
          lineHeight: 1.75,
          marginBottom: "28px",
          fontSize: "15px",
        }}>
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "36px" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: "12px",
                padding: "4px 12px",
                borderRadius: "100px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--accent)",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "14px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Voir le projet
              <ExternalLink size={14} />
            </a>
          )}

          {/* Link to full detail page */}
          <Link
            href={`/projects/${project.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: "100px",
              fontWeight: 500,
              fontSize: "14px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--accent-glow)"
              e.currentTarget.style.borderColor = "var(--accent)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--bg-card)"
              e.currentTarget.style.borderColor = "var(--border)"
            }}
          >
            Page détail
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </>
  )
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Tous")
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = filter === "Tous" ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div>
            <p style={{
              color: "var(--accent)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Réalisations
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              lineHeight: 1.05,
            }}>
              Mes <span style={{ color: "var(--accent)" }}>Projets</span>
            </h2>
          </div>
          <CategoryFilter active={filter} onChange={setFilter} />
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "14px",
          }}>
            {filtered.length === 0 && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: "var(--border)",
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "80px 0",
                  fontSize: "15px",
                }}
              >
                Aucun projet dans cette catégorie pour l'instant.
              </motion.p>
            )}
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
