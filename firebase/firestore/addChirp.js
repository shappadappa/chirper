import app from "../config";

import { addDoc, collection, getFirestore } from "firebase/firestore";

const db = getFirestore(app)

export default async function addChirp(msg){
    await addDoc(collection(db, "chirps"), {msg, createdAt: new Date()})
}