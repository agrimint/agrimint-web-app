import { Button, Loader } from "../../components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "/util/users";
import { useState } from "react";

export default function Vault() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);
  // const [loggingOut, setLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signOutUser(dispatch);
    router.push("/");
  }
  
  return (
    <>
      {isLoading && <Loader />}
      <h1 className="text-3xl text-center font-bold py-5">Settings</h1>
      <p className="text-center pb-5">{userName}, welcome to AgriMint!</p>
      <Button onClick={handleSignOut} label="Sign out" intent="primary" />
    </>
  );
}