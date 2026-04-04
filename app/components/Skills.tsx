"use client";
import { motion } from "framer-motion";
import { Cpu, Code2, Smartphone, Briefcase, ShieldCheck, Database } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: any;
  category: string;
}

const SKILLS: Skill[] = [
  { name: 'Java / Spring Boot', level: 66, icon: Cpu, category: 'Tech' },
  { name: 'JavaScript / React', level: 50, icon: Code2, category: 'Tech' },
  { name: 'Next.js / Tailwind', level: 45, icon: Smartphone, category: 'Tech' },
  { name: 'Gestion de Projet IT', level: 95, icon: Briefcase, category: 'Management' },
  { name: 'Audit & Gouvernance SI', level: 90, icon: ShieldCheck, category: 'Security' },
  { name: 'SQL / Supabase', level: 60, icon: Database, category: 'Tech' },
];

export default function Skills() {
  return (
    <section className="py-24 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Compétences & <span className="text-purple-400">Maîtrise</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS.map(skill => (
            <div key={skill.name} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <skill.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold">{skill.name}</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-gradient-to-r from-purple-500 to-blue-500" />
              </div>
              <div className="mt-2 text-right text-xs text-zinc-500 font-mono">{skill.level}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}