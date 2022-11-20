import { Input } from "../../components";
import { Button } from "../../components";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, previousStep } from "../../redux/onboardingSlice";
import { setName, setCountryCode, setPhoneNumber, signInUser } from "../../redux/userSlice";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const requestOtp = async (e) => {
    try {
      e.preventDefault();
      
      const options = {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "otpType": "REG",
          phoneNumber,
          countryCode,
          name,
          "otpLength": 6
        })
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "otp/request", options);
    
      if (res) {
        let data = await res.json();
        console.log("data", data);
        if (data && data.otp) {
          setOtp(data.otp);
          dispatch(nextStep());
        }
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  const signUp = async (e) => {
    try {
      e.preventDefault();
      
      const options = {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          countryCode,
          phoneNumber,
          secret,
          otp
        })
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "user", options);
    
      if (res.status === 201) {
        console.log("User created");

        await signIn("credentials", {
          redirect: false,
          countryCode,
          phoneNumber,
          secret
        });

        console.log("Authenticated");

        dispatch(nextStep());
        dispatch(signInUser(session.user));
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      countryCode,
      phoneNumber,
      secret
    });
  }

  // TODO: Improve step management & display progress
  return (
    step < 4 ? <>
      <h1 className="text-3xl text-center font-bold py-5">Create account</h1>
      <p className="pb-5 text-center">Please enter your name and phone number, so that other guardians and members will know who you are.</p>
      <Input label="Name" value={name} onChange={(e) => dispatch((setName(e.target.value)))} />
      <Input label="Country code" value={countryCode} onChange={(e) => dispatch((setCountryCode(e.target.value)))} />
      <Input label="Phone number" value={phoneNumber} onChange={(e) => dispatch((setPhoneNumber(e.target.value)))} />
      <Button label="Send verification code" disabled={(name === '') || (countryCode === '') || (phoneNumber === '') ? true : false} onClick={(e) => requestOtp(e)} />
      {step === 1 && <Button intent="transparent" label="Or sign in if you already have an account" onClick={(e) => {e.preventDefault(); router.push("/signin"); }} />}
      {step >= 2 && <>
        <p className="pb-5">We have sent a verification code to +{countryCode} {phoneNumber}. Please enter it below.</p>
        <Input label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        {step === 2 && <Button intent="transparent" label="Didn't receive the code?" onClick={(e) => { dispatch(previousStep()); requestOtp(e); }} />}
        <Button label="Continue" onClick={(e) => dispatch(nextStep())} disabled={(otp === '') ? true : false} />
        {step >= 3 && <>
          <Input label="Choose PIN" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
          <Input label="Reenter PIN" type="password" value={secret2} onChange={(e) => setSecret2(e.target.value)} />
          <Button label="Sign up" onClick={(e) => signUp(e)} disabled={(otp === '') || (secret === '') || (secret !== secret2) ? true : false} />
        </>}
      </>}
    </> : <>
      <h1 className="text-3xl text-center font-bold py-5">Account created</h1>
      <p className="text-center pb-5">{name}, welcome to AgriMint! You can now create a new mint or join an existing one if you are invited.</p>
      <div className="mt-auto pb-10">
        <Button label="Create a new mint" />
        <Button intent="secondary" label="Join a mint" />
      </div>
    </>
  );
}