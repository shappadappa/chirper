import LoginForm from "@/app/components/LoginForm";

export default function Login() {
    return (
        <main>
            <h1>Login</h1>

            <LoginForm loggingIn={true} />
        </main>
    )
}