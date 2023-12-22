import app from "../config";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app)
const auth = getAuth(app)

export default async function deleteChirp(id){
    const chirpSnapshot = await getDoc(doc(db, "chirps", id))

    if(!chirpSnapshot.exists()){
        return {error: "Requested chirp to delete does not exist"}
    }

    const chirp = chirpSnapshot.data()

    if(!auth){
        return {error: "You must login to delete this chirp"}
    }

    if(chirp.userUid !== auth.currentUser.uid){
        return {error: "You are not authorised to delete this chirp"}
    }

    if((new Date().getTime() - chirp.createdAt.seconds * 1000) / 86400000 >= 1){
        return {error: "Chirps can only be deleted up to one day after posting"}
    }

    await deleteDoc(doc(db, "chirps", id))

    return {error: null}
}