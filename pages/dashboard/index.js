import { useSession } from "next-auth/react";
import { BottomNavigation, Button, Loader } from '../../components';
import { useRouter } from "next/router";
import { onboardingFlow } from "/redux/onboardingSlice";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "/util/users";
import { useState, useEffect } from "react";
import { handleUserProgress } from "/util/users";
// import Confetti from 'react-confetti';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else if (!loggingOut) {
      handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  // const handleSignOut = async (e) => {
  //   e.preventDefault();
  //   setLoggingOut(true);
  //   await signOutUser(dispatch);
  //   router.push("/");
  // }

  return (
    <>
      {/* <Confetti recycle={false} /> */}
      {(status === "loading") && <Loader />}
      <h1 className="text-3xl text-center font-bold py-5">Dashboard</h1>
      <p className="text-center pb-5">{userName}, welcome to AgriMint!</p>
    </>
  );
}