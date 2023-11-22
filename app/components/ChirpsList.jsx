"use client"

import { formatDistanceToNow } from "date-fns";
import getChirps from "../../firebase/firestore/getChirps";
import { useEffect, useState } from "react";

export default function ChirpsList() {
    const [chirps, setChirps] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        let unsubscribe

        const loadChirps = async() =>{
            unsubscribe = await getChirps(data =>{
                setIsLoading(false)
                setChirps(data)
            }, {})
        }

        loadChirps()
    
        return () => unsubscribe()
    }, [])

    return (
        <ul className="mt-8">
            {isLoading && <div>Loading...</div>}
            {chirps?.map(chirp =>(
                <li key={chirp.id} className="bg-white text-black my-2 mx-auto max-w-xl rounded-md p-2 text-left">
                    <div className="bg-gradient-to-r from-gray-200 to-transparent rounded-md p-6 relative">
                        <span className="text-5xl mr-4 text-gray-450 absolute left-1 top-1">"</span>
                        <p className="break-words px-2 whitespace-pre">{chirp.msg}</p>
                        <span className="text-5xl ml-4 text-gray-450 absolute right-1 top-1">"</span>
                    </div>
                    <p className="text-sm mt-2">added {formatDistanceToNow(chirp.createdAt.seconds * 1000, {addSuffix: true})}</p>
                </li>
            ))}
        </ul>
    )
}