import app from "../config"
import { getFirestore, query, collection, onSnapshot, orderBy } from "firebase/firestore"

const db = getFirestore(app)

export default async function getChirps(callback, filters = {}){
    const q = query(collection(db, "chirps"), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, querySnapshot =>{
        const chirps = querySnapshot.docs.map(doc =>{
            return {
                id: doc.id,
                ...doc.data(),
            }
        })

        callback(chirps)
    })

    return unsubscribe
}