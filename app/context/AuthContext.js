"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import app from "@/firebase/config";

const auth = getAuth(app)

export const AuthContext = createContext()

export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error("useAuthContext must be used within a provider")
    }
    
    return context
}

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, user =>{
            if(user){
                setUser(user)
            } else{
                setUser()
            }
            
            setIsLoading(false)
        })
        
        return () => unsubscribe()
    })

    return(
        <AuthContext.Provider value={{user}}>
            {isLoading ? <div className="absolute w-full h-full grid place-items-center text-4xl text-white bg-gradient-to-br from-emerald-900 to-emerald-500">Loading...</div> : children}
        </AuthContext.Provider>
    )
}