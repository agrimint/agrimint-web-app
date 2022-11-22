import { Input, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { nextStep } from "../../redux/onboardingSlice";
import { setName, setCountryCode, setPhoneNumber, signInUser } from "../../redux/userSlice";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { requestOtp, signUp } from '../../util/users';

export default function Signup() {
  const step = useSelector(state => state.onboarding.step);
  const name = useSelector(state => state.user.name);
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const [otp, setOtp] = useState("");
  const [secret, setSecret] = useState("");
  const [secret2, setSecret2] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const handleRequestOtp = async (e, moveToNextStep = true) => {
    e.preventDefault();
    let generatedOtp = await requestOtp(name, countryCode, phoneNumber);
    if (generatedOtp) {
      setOtp(generatedOtp);
      if (moveToNextStep) dispatch(nextStep());
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    let signedIn = await signUp(name, countryCode, phoneNumber, secret, otp, signIn);
    if (signedIn) {
      dispatch(nextStep());
      dispatch(signInUser(name));
    }
  }

  // TODO: Improve step management & display progress
  if (step === 1) {
    return (<>
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="pb-5 text-center">Please enter your name and phone number, so that other guardians and members will know who you are.</p>
      <Input label="Name" value={name} onChange={(e) => dispatch((setName(e.target.value)))} />
      <Input label="Country code" value={countryCode} onChange={(e) => dispatch((setCountryCode(e.target.value)))} />
      <Input label="Phone number" value={phoneNumber} onChange={(e) => dispatch((setPhoneNumber(e.target.value)))} />
      <Button label="Send verification code" disabled={(name === '') || (countryCode === '') || (phoneNumber === '') ? true : false} onClick={handleRequestOtp} />
      <Button intent="transparent" label="Or sign in if you already have an account" onClick={(e) => {e.preventDefault(); router.push("/signin"); }} />
    </>);
  } else if (step === 2) {
    return (<>
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="pb-5">We have sent a verification code to +{countryCode} {phoneNumber}. Please enter it below.</p>
      <Input label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <Button intent="transparent" label="Didn't receive the code?" onClick={(e) => { handleRequestOtp(e, false); }} />
      <Button label="Continue" onClick={(e) => dispatch(nextStep())} disabled={(otp === '') ? true : false} />
    </>);
  } else if (step === 3) {
    return (<>
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="text-center pb-5">Please set your secret PIN.</p>
      <Input label="Choose PIN" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
      <Input label="Reenter PIN" type="password" value={secret2} onChange={(e) => setSecret2(e.target.value)} />
      <Button label="Sign up" onClick={handleSignUp} disabled={(otp === '') || (secret === '') || (secret !== secret2) ? true : false} />
    </>);
  } else if (step === 4) {
    return(<>
      <h1 className="text-3xl text-center font-bold py-5">Account created</h1>
      <p className="text-center pb-5">{name}, welcome to AgriMint! You can now create a new mint or join an existing one if you are invited.</p>
      <div className="mt-auto pb-10">
        <Button label="Create a new mint" onClick={(e) => {e.preventDefault(); router.push("/onboarding/new-mint"); }} />
        <Button intent="secondary" label="Join a mint" onClick={(e) => {e.preventDefault(); router.push("/onboarding/join-mint"); }}/>
      </div>
    </>);
  } else router.push("/onboarding/mint");
}