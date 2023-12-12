"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import signup from "@/firebase/auth/signup"
import login from "@/firebase/auth/login"
import Link from "next/link"

export default function LoginForm({loggingIn}) {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async(e) =>{
        setError("")
        e.preventDefault()
        
        let user, error

        if(loggingIn){
            ({user, error} = await login(username, password))
        } else{
            ({user, error} = await signup(email, username, password))
        }

        if(user){
            router.refresh()
            router.push("/")
        } else{
            setError(error)
        }
    }

    return (
        <>
            {error && <div className="error"><span className="exclamation-mark">!</span>{error}</div> }
            
            <form className="login-form" onSubmit={e => handleSubmit(e)}>
                {loggingIn ? 
                    <label htmlFor="email-or-username">
                        <span>Email/Username:</span>
                        <input type={username.includes("@") ? "email" : "text"} name="email-or-username" id="email-or-username" value={username} onChange={e => setUsername(e.target.value)}/>
                    </label>
                :
                    <>
                        <label htmlFor="email">
                            <span>Email:</span>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </label>
                        <label htmlFor="username">
                            <span>Username:</span>
                            <input minLength="3"  maxLength="25" type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                        </label>
                    </>
                }
                <label htmlFor="password">
                    <span>Password:</span>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>

                <input type="submit" value={loggingIn ? "Login" : "Signup"} />
            </form>

            <p className="mt-4 text-lg">
                {loggingIn ? 
                    <>Don't have an account? Signup <Link href="/signup" className="underline">here.</Link></>
                : 
                    <>Already have an account? Login <Link href="/login" className="underline">here.</Link></>
                }
            </p>
        </>
    )
}