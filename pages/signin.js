import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input, Button, Loader, Error } from '/components';
import { useSelector, useDispatch } from "react-redux";
import { onboardingFlow } from "/redux/onboardingSlice";
import { useRouter } from "next/router";
import { handleUserProgress, signOutUser, signInUser } from "/util/users";

export default function Signin() {
  const { data: session, status } = useSession();
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const userName = useSelector(state => state.user.name);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secret, setSecret] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("handleSignIn");
    let result = await signInUser(dispatch, countryCode, phoneNumber, secret, setError);
    console.log("Done handleSignIn", result);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    router.push("/");
  }

  const handleSignOut = async (e) => {
    e.preventDefault();
    setLoggingOut(true);
    await signOutUser(dispatch);
    router.push("/");
  }

  useEffect(() => {
    if (!loggingOut) handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
  }, [session, status, signedIn, userDataFetched, step]);

  if (session) {
    return (
      <>
        <Loader />
        {/* {(status === "loading") && <Loader />}
        <h1 className="text-3xl text-center font-bold py-5">User profile</h1>
        <p className="pb-5 text-center">Signed in as {userName}</p>
        <div className="mt-auto pb-5">
          <Button onClick={handleSignOut} label="Sign out" intent="primary" />
        </div> */}
      </>
    );
  }

  return (
    <>
      {(status === "loading") && <Loader />}
      <h1 className="text-3xl text-center font-bold py-5">Sign in</h1>
      <p className="pb-5 text-center">Please enter your phone number and PIN to sign in.</p>
      <Input label="Country code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
      <Input label="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <Input label="PIN" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
      {error !== "" && <Error text={error} />}
      <div className="mt-auto pb-5">
        <Button onClick={handleSignIn} disabled={(countryCode === "") || (phoneNumber === "") || (secret === "")} label="Sign in" intent="primary" />
        <Button intent="transparent" label="Or sign up" onClick={handleSignUp} />
      </div>
   </>
  );
}