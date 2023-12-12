import LoginForm from "@/app/components/LoginForm";

export default function Signup() {
    return (
        <main>
            <h1>Signup</h1>

            <LoginForm loggingIn={false} />
        </main>
    )
}