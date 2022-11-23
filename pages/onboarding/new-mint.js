import { Input, Button, Loader, Error } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { onboardingFlow, nextStep, setMintName } from "../../redux/onboardingSlice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { createFederation } from "/util/mints";
import { handleUserProgress } from "/util/users";

export default function SetupMint() {
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const isNewMint = useSelector(state => state.onboarding.isNewMint);
  const guardianName = useSelector(state => state.user.name);
  const mintName = useSelector(state => state.onboarding.mintName);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [guardianSecret, setGuardianSecret] = useState("");
  const [guardianSecret2, setGuardianSecret2] = useState("");

  useEffect(() => {
    if (!isNewMint) { 
      router.push("/onboarding/join-mint");
      return;
    }
    else if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else {
      handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  const handleCreateMint = async (e) => {
    e.preventDefault();
    if (createFederation(dispatch, session.user.accessToken, mintName, guardianName, guardianSecret, setError)) {
      console.log("Federation created");
      dispatch(nextStep());
    }
  }

  return(
    <>
      {(status === "loading" && <Loader />)}
      <h1 className="text-3xl text-center font-bold py-5">Create a mint</h1>
      <p className="pb-5 text-center">Please enter the name of your new mint.</p>
      <Input label="Name" value={mintName} onChange={(e) => dispatch((setMintName(e.target.value)))} />
      <Input label="Choose Guardian secret" type="password" value={guardianSecret} onChange={(e) => setGuardianSecret(e.target.value)} />
      <Input label="Reenter Guardian secret" type="password" value={guardianSecret2} onChange={(e) => setGuardianSecret2(e.target.value)} />
      {error !== "" && <Error text={error} />}
      <Button label="Create" disabled={((mintName === "") || (guardianSecret === "") || (guardianSecret2 === "") || (guardianSecret !== guardianSecret2))} onClick={handleCreateMint} />
    </>
  );
}