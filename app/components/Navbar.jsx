import Link from "next/link";

import NavAccountButton from "./NavAccountButton";

export default function Navbar() {
    return (
        <nav className="grid-span-1 bg-black text-white p-4 text-center">
            <h1 className="text-5xl font-extrabold tracking-tighter"><Link href="/">Chirper</Link></h1>
            <ul className="mt-8 text-xl flex flex-col gap-2">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/profile">Profile</Link>
                </li>

                <NavAccountButton />
            </ul>
        </nav>
    )
}