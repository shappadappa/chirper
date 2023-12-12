import app from "../config";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { collection, getFirestore, query, getDocs, where } from "firebase/firestore";

const auth = getAuth(app)
const db = getFirestore(app)

export default async function login(emailOrUsername, password){
    let user, error, email

    try{
        if(!emailOrUsername.includes("@")){
            const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", emailOrUsername)))

            if(querySnapshot.empty){
                error = "Username not found"
                return {user, error}
            }

            email = querySnapshot.docs [0].data().email
        } else{
            email = emailOrUsername
        }

        user = await signInWithEmailAndPassword(auth, email, password)
    } catch(e){
        switch(e.code.split("auth/") [1]){
            case "invalid-login-credentials":
                error = "Email or password is incorrect"
                break
            case "too-many-requests":
                error = "Too many recent login requests. Try again later"
                break
            default:
                error = "Something went wrong. Please try again"
        }
    }

    return {user, error}
}