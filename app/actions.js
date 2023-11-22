"use server"

import addChirp from "@/firebase/firestore/addChirp"

export async function handleChirpSubmit(formData){
    const chirpMsg = formData.get("chirp-msg").replaceAll("\\n", "\n")
    console.log(chirpMsg)
    addChirp(chirpMsg)
}