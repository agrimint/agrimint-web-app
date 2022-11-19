import Link from 'next/link';
import { Button } from "../components";
import { useRouter } from "next/router";

// TODO: Check if the user is already logged in, and move them to the right step if onboarding or to the dashboard if onboarded
// TODO: Explainer screens + Let's get started screen
export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1 className="text-3xl font-bold pb-5">Welcome to AgriMint!</h1>
      <p className="pb-5">AgriMint enables you to create a mint – your community-owned bank where you can securely save money, pay, borrow and protect against surprising events, together with other members.</p>
      {/* <Link href="/signup">Get started</Link>*/}
      <Button label="Get started" onClick={(e) => {e.preventDefault(); router.push("/signup"); }} />
      <Button intent="transparent" label="Or sign in if you already have an account" onClick={(e) => {e.preventDefault(); router.push("/signin"); }} />
    </>
  )
}