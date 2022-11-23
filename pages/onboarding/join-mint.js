import { Input, Button, Loader, Error } from "/components";
import { useSelector, useDispatch } from "react-redux";
import { onboardingFlow, nextStep, setInvitationCode } from "/redux/onboardingSlice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { joinFederation } from "/util/mints";
import { handleUserProgress } from "/util/users";

export default function JoinMint() {
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const isNewMint = useSelector(state => state.onboarding.isNewMint);
  const invitationCode = useSelector(state => state.onboarding.invitationCode);
  const guardianName = useSelector(state => state.user.name);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [guardianSecret, setGuardianSecret] = useState("");
  const [guardianSecret2, setGuardianSecret2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("isNewMint", isNewMint);
    // if (isNewMint) { 
    //   router.push("/onboarding/new-mint");
    //   return;
    // }
    // else 
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else {
      handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  const handleJoinMint = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      let result = await joinFederation(dispatch, session.user.accessToken, guardianName, guardianSecret, invitationCode, setError)
      if (result) {
        dispatch(nextStep());
      }
    } catch {
      setIsLoading(false);
    }
  }

  return(
    <>
      {((status === "loading") || isLoading) && <Loader />}
      <h1 className="text-3xl text-center font-bold py-5">Join a mint</h1>
      <p className="pb-5 text-center">Please enter the invitation code you have received to join a mint.</p>
      <Input label="Invitation code" value={invitationCode} onChange={(e) => dispatch((setInvitationCode(e.target.value)))} />
      <Input label="Choose Guardian secret" type="password" value={guardianSecret} onChange={(e) => setGuardianSecret(e.target.value)} />
      <Input label="Reenter Guardian secret" type="password" value={guardianSecret2} onChange={(e) => setGuardianSecret2(e.target.value)} />
      {error !== "" && <Error text={error} />}
      <Button label="Join" disabled={(invitationCode === '') || (guardianSecret === '') || (guardianSecret2 === '') || (guardianSecret !== guardianSecret2)} onClick={handleJoinMint} />
    </>
  );
}