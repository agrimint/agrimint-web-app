import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from '../components';
import { Button } from '../components';
import { useSelector, useDispatch } from "react-redux";
import { setCountryCode, setPhoneNumber } from "../redux/userSlice";
import { useRouter } from "next/router";

export default function Signin() {
  const { data: session } = useSession();
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const [secret, setSecret] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      countryCode,
      phoneNumber,
      secret
    });
  }

  console.log("SESSION", session);

  if (session) {
    return (
      <>
        <h1 className="text-3xl text-center font-bold py-5">User profile</h1>
        <p className="pb-5 text-center">Signed in as {session.user.name}</p>
        <div className="mt-auto pb-5">
          <Button onClick={() => signOut()} label="Sign out" intent="primary" />
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
      <div className="mt-auto pb-5">
        <Button onClick={handleSignIn} label="Sign in" intent="primary" />
        <Button intent="transparent" label="Or sign up" onClick={(e) => {e.preventDefault(); router.push("/signup"); }} />
      </div>
   </>
  );
}