import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, Loader } from "/components";
import { useSelector, useDispatch } from "react-redux";

export default function OnboardingHome() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userName = useSelector(state => state.user.name);
  
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return;
  }

  const handleNewMint = async (e) => {
    e.preventDefault();
    router.push("/onboarding/new-mint");
  }

  const handleJoinMint = async (e) => {
    e.preventDefault();
    router.push("/onboarding/join-mint");
  }

  return(<>
    <h1 className="text-3xl text-center font-bold py-5">Account created</h1>
    <p className="text-center pb-5">{userName}, welcome to AgriMint! You can now create a new mint or join an existing one if you are invited.</p>
    <div className="mt-auto pb-10">
      <Button label="Create a new mint" onClick={handleNewMint} />
      <Button intent="secondary" label="Join a mint" onClick={handleJoinMint}/>
    </div>
  </>);
}