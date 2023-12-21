"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

import { useAuthContext } from "../context/AuthContext"
import getUser from "@/firebase/firestore/getUser"
import ChirpForm from "./ChirpForm"
import ChirpsList from "./ChirpsList"
import uploadIcon from "@/firebase/storage/uploadIcon"
import getIcon from "@/firebase/storage/getIcon"

export default function ProfileDetails({userUid}) {
    const router = useRouter()

    const {user: loggedInUser} = useAuthContext()

    const [userDetails, setUserDetails] = useState()
    const [icon, setIcon] = useState()
    const [iconPreviewUrl, setIconPreviewUrl] = useState("")
    const [iconUrl, setIconUrl] = useState()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        if(!loggedInUser){
            router.refresh()
            router.push("/login")
            return
        }

        const loadUser = async() =>{
            const {user, error} = await getUser(userUid ? userUid : loggedInUser.uid)
            setError(error)
            
            if(user){
                setUserDetails(user)

                const {url} = await getIcon(userUid ? userUid : loggedInUser.uid)
                setIconUrl(url)
            }

            setIsLoading(false)
        }

        loadUser()
    }, [])

    const handleIconUpload = async() =>{
        const {url, error} = await uploadIcon(icon, userUid ? userUid : loggedInUser.uid)

        setIconUrl(url)
        setIconPreviewUrl("")
        setError(error)
        forceUpdate()
    }

    useEffect(() =>{
        if(icon){
            const previewUrl = URL.createObjectURL(icon)
            setIconPreviewUrl(previewUrl)

            return () => URL.revokeObjectURL(icon)
        }
    }, [icon])

    return(
        <>
            {isLoading ?
                <div>Loading...</div>
            :
                <>
                    {error && <div className="error"><span className="exclamation-mark">!</span>{error}</div>}

                    {userDetails &&
                        <>
                            <ul className="text-left max-w-md mx-auto my-4 text-xl list-disc">
                                <img className="block mx-auto rounded-full w-28 h-28 aspect-square border-2 border-green-900" src={iconUrl} alt="User's icon" />
                                {!userUid &&
                                    <> 
                                        <label className="block mt-4 mx-auto text-black text-center p-2 rounded bg-gray-100 hover:bg-gray-300 transition-colors cursor-pointer" htmlFor="icon">
                                            Upload Profile Picture
                                            <input accept="image/*" onChange={e => setIcon(e.target.files [0])} className="hidden" type="file" id="icon"/>
                                        </label>

                                        {iconPreviewUrl &&
                                            <div className="my-4 text-center rounded">
                                                <p>Preview:</p>
                                                <img className="block mx-auto rounded-full w-28 h-28 aspect-square border-2 border-green-900" src={iconPreviewUrl} alt="Preview icon" />
                                                <button onClick={handleIconUpload} className="text-black mt-4 mx-auto bg-gray-300 flex items-center p-2 gap-3 rounded hover:bg-gray-450 transition-colors cursor-pointer">
                                                    Update
                                                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        }
                                    </>
                                }

                                <li>Username: {userDetails.username}</li>
                                <li>Email: {userDetails.email}</li>
                                <li>Joined on {format(userDetails.createdAt.seconds * 1000, "dd/MM/yyyy")}</li>
                             </ul>

                            <div className="mt-8 max-w-lg mx-auto">
                                {!userUid && <ChirpForm/>}
                                <h3 className="text-2xl font-bold">{!userUid ? "Your" : "User's"} chirps:</h3>
                                <ChirpsList filters={{userUid: userUid ? userUid : loggedInUser.uid}} />
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}