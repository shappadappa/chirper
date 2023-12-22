"use client"

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import getChirps from "../../firebase/firestore/getChirps";
import getUser from "@/firebase/firestore/getUser";
import { useAuthContext } from "../context/AuthContext";
import getIcon from "@/firebase/storage/getIcon";
import deleteChirp from "@/firebase/firestore/deleteChirp";

export default function ChirpsList({filters, iconUrl}) {
    const [chirps, setChirps] = useState([])
    const [chirpUsers, setChirpUsers] = useState({})
    const [chirpsLoading, setChirpsLoading] = useState(true)
    const [usersLoading, setUsersLoading] = useState(true)

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
                setChirps(data)
                setChirpsLoading(false)
            }, filters)
        }

        loadChirps()
    
        return () => unsubscribe()
    }, [])

    useEffect(() =>{
        const loadUsers = async() =>{
            setUsersLoading(true)

            let chirpUserData = {}
            if(chirps?.length > 0){
                for(const userUid of chirps.map(chirp => chirp.userUid)){
                    const {user} = await getUser(userUid)

                    const {url} = await getIcon(userUid)

                    chirpUserData [userUid] = {...user, url}
                }

                setUsersLoading(false)
            }

            setChirpUsers(chirpUserData)
        }

        loadUsers()
    }, [chirps])

    const handleDelete = async(id) =>{
        const {error} = await deleteChirp(id)
        console.error(error)
    }

    return (
        <ul className="mt-8">
            {chirpsLoading ? 
                <div>Loading...</div>
            :
                <>
                    {chirps.length === 0 && filters.userUid && 
                        <>
                            {filters.userUid === loggedInUser.uid ? 
                                <div className="text-center">You have no chirps</div>
                            :
                                <div className="text-center">User has no chirps</div>
                            }
                        </>
                    }
                    
                    {chirps?.map(chirp =>(
                        <li key={chirp.id} className="bg-white text-black my-2 mx-auto max-w-xl rounded-md p-2 text-left relative">
                            {usersLoading ?
                                <div className="p-2 text-lg">
                                    <div className="rounded-full border border-gray-500 w-10 h-10"></div>
                                </div>
                            :
                                <div className="p-2 text-lg font-semibold flex gap-4 place-items-center">
                                    <img className="rounded-full aspect-square border border-gray-500 w-10 h-10" src={loggedInUser.uid === chirp.userUid && iconUrl ? iconUrl : chirpUsers [chirp.userUid].url} alt="User's profile picture" />
                                    {chirpUsers [chirp.userUid].username ? 
                                        <Link href={loggedInUser.uid === chirp.userUid ? "/profile" : `/profile/${chirp.userUid}`}>{chirpUsers [chirp.userUid].username}</Link> 
                                    : 
                                        "(unknown)"
                                    }
                                </div>
                            }

                            <div className="bg-gradient-to-r from-gray-200 to-transparent rounded-md p-6 relative">
                                <span className="text-3xl mr-4 text-gray-450 absolute left-1 top-1">❝</span>
                                <p className="break-words px-2 whitespace-pre">{chirp.msg}</p>
                                <span className="text-3xl ml-4 text-gray-450 absolute right-1 top-1">❞</span>
                            </div>

                            <p className="text-sm mt-2">posted {formatDistanceToNow(chirp.createdAt.seconds * 1000, {addSuffix: true})}</p>

                            {chirp.userUid === loggedInUser.uid && (new Date().getTime() - chirp.createdAt.seconds * 1000) / 86400000 < 1 && 
                                <button onClick={() => handleDelete(chirp.id)} className="absolute bottom-0 right-0 p-1 bg-red-100 hover:bg-red-200 transition-colors rounded-br-md">Delete</button>
                            }
                        </li>
                    ))}
                </>
            }
        </ul>
    )
}