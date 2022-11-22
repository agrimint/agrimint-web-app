import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Input, Button } from '../components';
import { useSelector, useDispatch } from "react-redux";
import { setCountryCode, setPhoneNumber, signInUser } from "../redux/userSlice";
import { useRouter } from "next/router";
import { fetchUserData, handleSignOut } from "../util/users";

export default function Signin() {
  const { data: session } = useSession();
  const userName = useSelector(state => state.user.name);
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const signedIn = useSelector(state => state.user.signedIn);
  const [secret, setSecret] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [signInError, setSignInError] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    let result = await signIn("credentials", {
      redirect: false,
      countryCode,
      phoneNumber,
      secret
    });
    if (result.ok) {
      // Authentication successful
      // TODO: Redirect
    } else {
      // Authentication failed
      setSignInError(true);
    }
  }

  useEffect(() => {
    if (!signedIn && session) {
      console.log("Authenticated, SESSION =", session);
      dispatch(signInUser(session.user));
    }

    if (signedIn && session) {
      fetchUserData(dispatch, session.user.accessToken);
    }
    // if (signedIn && !session) {
    //   console.log("Not authenticated, clean up store");
    //   dispatch(signOutUser());
    //   dispatch(clearOnboardingData());
    // }  
  }, [signedIn, session, dispatch]);


  if (session) {
    return (
      <>
        <h1 className="text-3xl text-center font-bold py-5">User profile</h1>
        <p className="pb-5 text-center">Signed in as {userName}</p>
        <div className="mt-auto pb-5">
          <Button onClick={(e) => { e.preventDefault(); handleSignOut(dispatch); }} label="Sign out" intent="primary" />
        </div>
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl text-center font-bold py-5">Sign in</h1>
      <p className="pb-5 text-center">Please enter your phone number and PIN to sign in.</p>
      <Input label="Country code" value={countryCode} onChange={(e) => dispatch((setCountryCode(e.target.value)))} />
      <Input label="Phone number" value={phoneNumber} onChange={(e) => dispatch((setPhoneNumber(e.target.value)))} />
      <Input label="PIN" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
      {signInError && <div className="rounded-[6px] p-2 bg-red-200">
        <p className="text-center text-red-900">Error signing in. Please provide correct credentials.</p>
      </div>}
      <div className="mt-auto pb-5">
        <Button onClick={handleSignIn} label="Sign in" intent="primary" />
        <Button intent="transparent" label="Or sign up" onClick={(e) => {e.preventDefault(); router.push("/onboarding/signup"); }} />
      </div>
   </>
  );
}