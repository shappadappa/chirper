"use client"

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import getChirps from "../../firebase/firestore/getChirps";
import getUser from "@/firebase/firestore/getUser";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";

export default function ChirpsList() {
    const [chirps, setChirps] = useState([])
    const [chirpUsers, setChirpUsers] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    const {user: loggedInUser} = useAuthContext()

    useEffect(() =>{
        if(!loggedInUser){
            router.refresh()
            router.push("/login")
        }

        let unsubscribe

        const loadChirps = async() =>{
            unsubscribe = await getChirps(data =>{
                setIsLoading(true)
                setChirps(data)
            })
        }

        loadChirps()
    
        return () => unsubscribe()
    }, [])

    useEffect(() =>{
        const loadUsers = async() =>{
            let chirpUserData = {}
            if(chirps?.length > 0){
                for(const userUid of chirps.map(chirp => chirp.userUid)){
                    const { user } = await getUser(userUid)
                    chirpUserData [userUid] = user
                }
            }

            setChirpUsers(chirpUserData)
            
            setIsLoading(false)
        }

        loadUsers()
    }, [chirps])

    return (
        <ul className="mt-8">
            {isLoading ? 
                <div>Loading...</div>
            :
                <>
                    {chirps?.map(chirp =>(
                        <li key={chirp.id} className="bg-white text-black my-2 mx-auto max-w-xl rounded-md p-2 text-left">
                            <div className="p-2 text-lg font-semibold flex gap-4 place-items-center">
                                <div className="border border-black rounded-full p-1 box-content w-6 h-6">
                                    <img className="rounded-full" src="icon.png" alt="User's profile picture" />
                                </div>
                                {chirpUsers [chirp.userUid] ? 
                                    <Link href={loggedInUser.uid === chirp.userUid ? "/profile" : `/profile/${chirp.userUid}`}>{chirpUsers [chirp.userUid].username}</Link> 
                                : 
                                    "(unknown)"
                                }
                            </div>

                            <div className="bg-gradient-to-r from-gray-200 to-transparent rounded-md p-6 relative">
                                <span className="text-5xl mr-4 text-gray-450 absolute left-1 top-1">"</span>
                                <p className="break-words px-2 whitespace-pre">{chirp.msg}</p>
                                <span className="text-5xl ml-4 text-gray-450 absolute right-1 top-1">"</span>
                            </div>

                            <p className="text-sm mt-2">posted {formatDistanceToNow(chirp.createdAt.seconds * 1000, {addSuffix: true})}</p>
                        </li>
                    ))}
                </>
            }
        </ul>
    )
}