import app from "../config"
import { getFirestore, query, collection, onSnapshot, orderBy, where } from "firebase/firestore"

const db = getFirestore(app)

export default async function getChirps(callback, filters = {}){
    let q = query(collection(db, "chirps"))

    if(filters.userUid){
        q = query(q, where("userUid", "==", filters.userUid))
    }

    q = query(q, orderBy("createdAt", "desc"))

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