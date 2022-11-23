import { useSession } from "next-auth/react";
import { Button, Loader } from '../../components';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "/util/users";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return;
  }

  const handleSignOut = async (e) => {
    e.preventDefault();
    signOutUser(dispatch);
  }

  return (
    <>
      <h1 className="text-3xl text-center font-bold py-5">Dashboard</h1>
      <div className="container mt-auto mx-auto bottom-2">
        <Button onClick={handleSignOut} label="Sign out" intent="primary" />
      </div>
    </>
  );
}