import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !data) notFound()

  return (
    <main style={{
      minHeight: "100vh",
      padding: "140px 24px 80px",
      maxWidth: "780px",
      margin: "0 auto",
    }}>
      {/* Back link */}
      <Link
        href="/#projects"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--muted)",
          textDecoration: "none",
          fontSize: "14px",
          marginBottom: "48px",
          transition: "color 0.2s",
        }}
        onMouseEnter={() => {}}
      >
        ← Retour aux projets
      </Link>

      {/* Category badge */}
      {data.category && (
        <span style={{
          display: "inline-block",
          fontSize: "12px",
          padding: "4px 14px",
          borderRadius: "100px",
          background: "rgba(129,140,248,0.1)",
          color: "var(--accent)",
          border: "1px solid rgba(129,140,248,0.2)",
          marginBottom: "24px",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}>
          {data.category}
        </span>
      )}

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(36px, 6vw, 64px)",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        color: "var(--text)",
        lineHeight: 1.05,
        marginBottom: "24px",
      }}>
        {data.title}
      </h1>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
          {data.tags.map((tag: string) => (
            <span key={tag} style={{
              fontSize: "13px",
              padding: "5px 14px",
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

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "40px" }} />

      {/* Description */}
      <p style={{
        color: "var(--muted)",
        fontSize: "17px",
        lineHeight: 1.85,
        marginBottom: "48px",
      }}>
        {data.description}
      </p>

      {/* CTA */}
      {data.url && (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "var(--accent)",
            color: "#fff",
            textDecoration: "none",
            padding: "14px 28px",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "15px",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = "0.85"
            e.currentTarget.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = "1"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          Voir le projet en ligne ↗
        </a>
      )}
    </main>
  )
}
