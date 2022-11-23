import { Input, Button, Error, Loader } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, setNewUserName, setNewUserCountryCode, setNewUserPhoneNumber, setNewUserOtp } from "../../redux/onboardingSlice";
import { setUserSignedIn } from "../../redux/userSlice";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { requestOtp, signUpUser } from '../../util/users';

export default function Signup() {
  const step = useSelector(state => state.onboarding.step);
  const goBackHome = useSelector(state => state.onboarding.goBackHome);
  const signedIn = useSelector(state => state.user.signedIn);
  const name = useSelector(state => state.onboarding.newUser.name);
  const countryCode = useSelector(state => state.onboarding.newUser.countryCode);
  const phoneNumber = useSelector(state => state.onboarding.newUser.phoneNumber);
  const otp = useSelector(state => state.onboarding.newUser.otp);
  // const [otp, setOtp] = useState("");
  const [secret, setSecret] = useState("");
  const [secret2, setSecret2] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");

  useEffect(() => {
    // After the successful sign up & sign in
    if (session && !signedIn) {
      dispatch(setUserSignedIn(session.user.name));
      dispatch(nextStep());
      router.push("/onboarding/");
    }

    if (step === 0) router.push("/"); 
    if (step > 3) router.push("/onboarding");
  }, [step, signedIn, session, router, dispatch]);

  const handleRequestOtp = async (e, moveToNextStep = true) => {
    e.preventDefault();
    let generatedOtp = await requestOtp(name, countryCode, phoneNumber, setError);
    if (generatedOtp) {
      dispatch(setNewUserOtp(generatedOtp));
      if (moveToNextStep) dispatch(nextStep());
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signUpUser(dispatch, name, countryCode, phoneNumber, secret, otp, signIn, setError);
  }

  // TODO: Improve step management & display progress
  if (step === 1) {
    return (<>
      {(status === "loading" && <Loader />)}
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="pb-5 text-center">Please enter your name and phone number, so that other guardians and members will know who you are.</p>
      <Input label="Name" value={name} onChange={(e) => dispatch((setNewUserName(e.target.value)))} />
      <Input label="Country code" value={countryCode} onChange={(e) => dispatch((setNewUserCountryCode(e.target.value)))} />
      <Input label="Phone number" value={phoneNumber} onChange={(e) => dispatch((setNewUserPhoneNumber(e.target.value)))} />
      {error !== "" && <Error text={error} />}
      <Button label="Send verification code" disabled={(name === '') || (countryCode === '') || (phoneNumber === '') ? true : false} onClick={handleRequestOtp} />
      <Button intent="transparent" label="Or sign in if you already have an account" onClick={(e) => {e.preventDefault(); router.push("/signin"); }} />
    </>);
  } else if (step === 2) {
    return (<>
      {(status === "loading" && <Loader />)}
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="pb-5">We have sent a verification code to +{countryCode} {phoneNumber}. Please enter it below.</p>
      <Input label="OTP" value={otp} onChange={(e) => dispatch(setNewUserOtp(e.target.value))} />
      {error !== "" && <Error text={error} />}
      <Button intent="transparent" label="Didn't receive the code?" onClick={(e) => { handleRequestOtp(e, false); }} />
      <Button label="Continue" onClick={(e) => dispatch(nextStep())} disabled={(otp === '') ? true : false} />
    </>);
  } else if (step === 3) {
    return (<>
      {(status === "loading" && <Loader />)}
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="text-center pb-5">Please set your secret PIN.</p>
      <Input label="Choose PIN" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
      <Input label="Reenter PIN" type="password" value={secret2} onChange={(e) => setSecret2(e.target.value)} />
      {error !== "" && <Error text={error} />}
      <Button label="Sign up" onClick={handleSignUp} disabled={(otp === '') || (secret === '') || (secret !== secret2) ? true : false} />
    </>);
  }
}