import { useSession } from "next-auth/react";
import { Button } from '../../components';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);

  if (!session) {
    router.push("/signin");
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold py-5">Dashboard</h1>
      <div className="container mt-auto mx-auto bottom-2">
        <Button onClick={(e) => { e.preventDefault(); handleSignOut(dispatch); }} label="Sign out" intent="primary" />
      </div>
    </>
  );
}