import { supabase } from "@/lib/supabase"
import { ContactForm } from "./components/ContactForm"

async function getProjects() {
  const { data } = await supabase
    .from("projects")
    .select("*")

  return data ?? []
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 p-12">
      <h1 className="text-4xl font-bold mb-12">Cédric — Portfolio</h1>

      <h2 className="text-2xl font-semibold mb-6">Projets</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project: any) => (
          <div key={project.id} className="p-6 border rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-zinc-600 mb-3">{project.description}</p>
            <a href={project.url} className="text-blue-600">
              Voir le projet
            </a>
          </div>
        ))}
      </div>

      <ContactForm />
    </main>
  )
}
