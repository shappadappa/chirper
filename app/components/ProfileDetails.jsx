"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

import { useAuthContext } from "../context/AuthContext"
import getUser from "@/firebase/firestore/getUser"
import ChirpsList from "./ChirpsList"

export default function ProfileDetails({userUid}) {
    const router = useRouter()

    const {user: loggedInUser} = useAuthContext()

    const [userDetails, setUserDetails] = useState()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        if(!loggedInUser){
            router.refresh()
            router.push("/login")
            return
        }

        const loadUser = async() =>{
            let user, error
            if(userUid){
                ({user, error} = await getUser(userUid))
            } else{
                ({user, error} = await getUser(loggedInUser.uid))
            }

            setUserDetails(user)
            setError(error)

            setIsLoading(false)
        }

        loadUser()
    }, [])

    return(
        <>
            {isLoading ?
                <div>Loading...</div>
            :
                <>
                    {error && <div className="error "><span className="exclamation-mark">!</span>{error}</div>}

                    {userDetails &&
                        <ul className="text-left max-w-md mx-auto my-4 text-xl list-disc">
                            <div className="w-28 h-28 bg-white rounded-full p-2 mx-auto">
                                <img className="rounded-full" src="icon.png" alt="User's icon" />
                            </div>
                            <li>Username: {userDetails.username}</li>
                            <li>Email: {userDetails.email}</li>
                            <li>Joined on {format(userDetails.createdAt.seconds * 1000, "dd/MM/yyyy")}</li>
                        </ul>
                    }
                </>
            }
        </>
    )
}