import app from "../config";

import { addDoc, collection, getFirestore } from "firebase/firestore";

const db = getFirestore(app)

export default async function addChirp(msg, userUid){
    await addDoc(collection(db, "chirps"), {msg, userUid, createdAt: new Date()})
}