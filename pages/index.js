import Image from 'next/image';
import { Button, Loader } from "../components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { nextStep } from "/redux/onboardingSlice";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// TODO: Explainer screens + Let's get started screen
export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const step = useSelector(state => state.onboarding.step);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: Check if the user is already logged in, and move them to the right step if onboarding or to the dashboard if onboarded
    // if (session) router.push("/signin");
    // If onboarding has started, push to signup
    if (step >= 1) router.push("/onboarding/signup");
  }, [session, router, step]);
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(nextStep());
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    router.push("/signin");
  }

  if (!session) {
    return (
      <>
        {(status === "loading") && <Loader />}
        <Image src="/agrimint-logo-vector.svg" alt="AgriMint logo" width="10" height="10" className="w-24 h-24 mx-auto my-10" />
        <h1 className="text-3xl font-bold py-5 text-center">Welcome to AgriMint!</h1>
        <p className="pb-5 text-center">AgriMint enables you to create a mint – your community-owned bank where you can securely save money, pay, borrow and protect against surprising events, together with other members.</p>
        <div className="mt-auto pb-10">
          <Button label="Get started" onClick={handleSignUp} />
          <Button intent="transparent" label="Or sign in if you already have an account" onClick={handleSignIn} />
        </div>
      </>
    )
  }
}