import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, Loader } from "/components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { handleUserProgress, signOutUser } from "/util/users";
import { onboardingFlow, nextStep, setNewMint } from "/redux/onboardingSlice";

export default function OnboardingHome() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const userName = useSelector(state => state.user.name);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else if (!loggingOut) {
      handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  const handleNewMint = async (e) => {
    e.preventDefault();
    dispatch(setNewMint(true));
    dispatch(nextStep());
  }

  const handleJoinMint = async (e) => {
    e.preventDefault();
    dispatch(setNewMint(false));
    dispatch(nextStep());
  }

  const handleSignOut = async (e) => {
    e.preventDefault();
    setLoggingOut(true);
    await signOutUser(dispatch);
    router.push("/");
  }

  return(<>
    {(status === "loading") && <Loader />}
    <h1 className="text-3xl text-center font-bold py-5">Account created</h1>
    <p className="text-center pb-5">{userName}, welcome to AgriMint! You can now create a new mint or join an existing one if you are invited.</p>
    <div className="mt-auto pb-10">
      <Button label="Create a new mint" onClick={handleNewMint} />
      <Button intent="secondary" label="Join a mint" onClick={handleJoinMint}/>
      <Button onClick={handleSignOut} label="Sign out" intent="secondary" />
    </div>
  </>);
}