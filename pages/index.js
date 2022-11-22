import Link from 'next/link';
import Image from 'next/image';
import { Button } from "../components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// TODO: Check if the user is already logged in, and move them to the right step if onboarding or to the dashboard if onboarded
// TODO: Explainer screens + Let's get started screen
export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) router.push("/dashboard");

  return (
    <>
      <Image src="/agrimint-logo-vector.svg" alt="AgriMint logo" width="10" height="10" className="w-20 h-20 mx-auto my-10" />
      <h1 className="text-3xl font-bold py-5 text-center">Welcome to AgriMint!</h1>
      <p className="pb-5 text-center">AgriMint enables you to create a mint – your community-owned bank where you can securely save money, pay, borrow and protect against surprising events, together with other members.</p>
      <div className="mt-auto pb-10">
        <Button label="Get started" onClick={(e) => {e.preventDefault(); router.push("/onboarding/signup"); }} />
        <Button intent="transparent" label="Or sign in if you already have an account" onClick={(e) => {e.preventDefault(); router.push("/signin"); }} />
      </div>
    </>
  )
}