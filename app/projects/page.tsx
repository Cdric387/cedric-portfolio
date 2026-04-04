// app/projects/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProjectsPage() {
  const { data: projects } = await supabase.from("projects").select("*");
  return (
    <main className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects?.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`} className="border p-4 rounded hover:shadow-lg">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
        </Link>
      ))}
    </main>
  );
}