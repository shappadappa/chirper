import ProfileDetails from "@/app/components/ProfileDetails";

export default function UserProfile({params}) {
  return (
    <main>
        <h1>User's Profile</h1>

        <ProfileDetails userUid={params.id} />
    </main>
  )
}