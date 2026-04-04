"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function sendMessage() {
    await supabase
      .from("messages")
      .insert({ name, email, message })

    alert("Message envoyé")
  }

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Contact</h2>

      <input
        className="border p-3 w-full mb-3"
        placeholder="Nom"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        className="border p-3 w-full mb-3"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Envoyer
      </button>
    </div>
  )
}
