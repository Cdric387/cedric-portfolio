import { supabase } from "@/lib/supabase"
import Hero from "./components/Hero"
import Skills from "./components/Skills"
import ProjectsSection from "./components/ProjectsSection"
import ContactForm from "./components/ContactForm"

async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) console.error("Supabase error:", error.message)
  return data ?? []
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <main>
      <Hero />
      <Skills />
      <ProjectsSection projects={projects} />
      <ContactForm />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: "13px",
        }}
      >
        <p>
          © {new Date().getFullYear()} Cédric Pascal — Conçu & développé avec{" "}
          <span style={{ color: "var(--accent)" }}>Next.js</span>,{" "}
          <span style={{ color: "var(--accent)" }}>Supabase</span> &{" "}
          <span style={{ color: "var(--accent)" }}>Vercel</span>
        </p>
      </footer>
    </main>
  )
}
