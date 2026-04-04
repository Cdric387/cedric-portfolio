import { supabase } from "@/lib/supabase"

export default async function ProjectPage({params}:{params:{id:string}}){

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id",params.id)
    .single()

  return (

    <main className="p-20">

      <h1 className="text-4xl font-bold mb-6">
        {data.title}
      </h1>

      <p>
        {data.description}
      </p>

      <a
        href={data.url}
        className="text-blue-600"
      >
        Voir le projet
      </a>

    </main>

  )
}