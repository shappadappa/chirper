import app from "../config";

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app)

export default async function logout(){
    await signOut(auth)
}