"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const titles = ["Développeur Full Stack", "Expert Gestion de Projet IT", "Auditeur Sécurité SI"];

  useEffect(() => {
    const timer = setInterval(() => setActiveTitleIndex((prev) => (prev + 1) % titles.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <h2 className="text-purple-500 font-medium tracking-widest uppercase mb-4 text-sm">Disponible Septembre 2026</h2>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
          Cédric <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Pascal</span>
        </h1>
        <div className="h-12 text-2xl md:text-3xl font-light text-zinc-400">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeTitleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {titles[activeTitleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex gap-6 mt-12 justify-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2 group"
          >
            Voir mes travaux
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex gap-4 items-center">
            <a href="#" className="p-2 text-zinc-400 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
            <a href="#" className="p-2 text-zinc-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 animate-bounce text-zinc-600">
        <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
      </div>
    </section>
  );
}