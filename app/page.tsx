export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">
          Cédric — Développeur Web
        </h1>

        <p className="text-xl text-zinc-600">
          Portfolio personnel construit avec Next.js, React,
          TypeScript et Tailwind.
        </p>
      </section>


      {/* PROJETS */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8">
          Projets
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="border rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">
              Portfolio Next.js
            </h3>

            <p className="text-zinc-600">
              Portfolio personnel développé avec Next.js
              et Tailwind CSS.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}