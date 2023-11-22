import ChirpForm from "./components/ChirpForm"
import ChirpsList from "./components/ChirpsList";

export default function Home() {
  

  return (
    <main>
      <h4 className="text-2xl py-2 font-semibold border-emerald-500 border-b-2">Chirper, the X (formerly known as Twitter) clone.</h4>
    
      <ChirpForm />
      <ChirpsList />
    </main>
  )
}