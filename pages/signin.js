import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from '../components';
import { Button } from '../components';
import { useSelector, useDispatch } from "react-redux";
import { setCountryCode, setPhoneNumber, setSecret } from '../redux/userSlice';


export default function Signin() {
  const { data: session } = useSession();
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const secret = useSelector(state => state.user.secret);
  const dispatch = useDispatch();

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
        <h1 className="text-3xl font-bold pb-5">Sign in</h1>
        <p className="pb-5">Signed in as {session.user.name}</p>
        <Button onClick={() => signOut()} label="Sign out" intent="primary" />
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-bold pb-5">Sign in</h1>
      <p className="pb-5">Not signed in</p>
      <Input label="Country code" value={countryCode} onChange={(e) => dispatch((setCountryCode(e.target.value)))} />
      <Input label="Phone number" value={phoneNumber} onChange={(e) => dispatch((setPhoneNumber(e.target.value)))} />
      <Input label="PIN" type="password" value={secret} onChange={(e) => dispatch((setSecret(e.target.value)))} />
      <Button onClick={handleSignIn} label="Sign in" intent="primary" />
    </>
  );
}