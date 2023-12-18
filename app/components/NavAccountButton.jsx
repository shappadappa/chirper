"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import logout from "@/firebase/auth/logout"
import { useAuthContext } from "../context/AuthContext"

export default function NavAccountButton() {
    const {user} = useAuthContext()

    const router = useRouter()

    const handleLogout = async() =>{
        logout()

        router.refresh()
        router.push("/login")
    }

    return(
        <>
            {user ? 
                <li onClick={handleLogout} className="mt-10 py-1.5 px-3 bg-white text-black rounded-full hover:cursor-pointer hover:underline">
                    Logout
                </li>
            :
                <>
                    <li className="mt-10"><Link href="/login">Login</Link></li>
                    <li><Link href="/signup">Signup</Link></li>
                </>
            }
        </>
    )
}