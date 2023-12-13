"use client"

import { useState } from "react"

import addChirp from "@/firebase/firestore/addChirp"

export default function Test() {
  const [msg, setMsg] = useState("")

  const handleSubmit = async(e) =>{
    e.preventDefault()
    addChirp(msg.replaceAll("\\n", "\n"))
    setMsg("")
  }

  return (
    <form onSubmit={e =>handleSubmit(e)} className="bg-white text-black my-2 mx-auto max-w-xl rounded p-2 text-left relative">
        <span className="absolute top-0 right-0 text-gray-600 text-sm p-0.5">{msg.length}/250</span>
        
        <label className="italic text-gray-600" htmlFor="chirp-msg">What's on your mind?</label>
        <textarea value={msg} onChange={e => setMsg(e.target.value.slice(0, 250))} name="chirp-msg" id="chirp-msg" className="resize-none w-full p-2 border border-gray-200 focus-within:border-gray-300 rounded focus-within:outline-none focus-within:bg-gray-50 transition-colors whitespace-pre-wrap" />

        <input className="block ml-auto bg-teal-500 disabled:bg-teal-400 hover:bg-teal-600 px-2 py-1 rounded cursor-pointer disabled:cursor-not-allowed transition-colors text-white" type="submit" value="Chirp" disabled={msg.length === 0} />
    </form>
  )
}