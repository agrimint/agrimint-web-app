import { Input, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { onboardingFlow, nextStep, setMintName, setMintLocation } from "../../redux/onboardingSlice";
import { useRouter } from "next/router";
// import { createFederation } from "../../util/mints";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MintStatus() {
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const mintName = useSelector(state => state.onboarding.mintName);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else {
      handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  return(
    <>

      <h1 className="text-3xl text-center font-bold py-5">Mint status</h1>
      <p className="pb-5 text-center">Please enter the name of your new mint.</p>
    </>
  );
}