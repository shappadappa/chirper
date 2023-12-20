import { app } from "../config"

import { doc, getDoc, getFirestore } from "firebase/firestore"

const db = getFirestore(app)

export default async function getUser(userUid){
    const userSnapshot = await getDoc(doc(db, "users", userUid))

    if(userSnapshot.exists()){
        const user = userSnapshot.data()
        return {user, error: null}
    } else{
        return {user: null, error: "User not found"}
    }
}