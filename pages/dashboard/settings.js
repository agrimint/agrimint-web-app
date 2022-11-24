import { Button, Loader, Error } from "../../components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "/util/users";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Vault() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const mintName = useSelector(state => state.user.federations ? state.user.federations[0]?.name : "");
  const guardians = useSelector(state => state.user.federations ? state.user.federations[0]?.guardians : []);
  // const [loggingOut, setLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
  }, [router, status]);

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
      <p className="text-center text-lg pb-5 text-teal-600 font-bold">{mintName}</p>
      <p className="pb-5 text-center">There are currently {guardians?.length} guardians for the mint.</p>
      {error && <Error text={error} />}
      {guardians?.map((s, i) => (
        <div key={i} className="flex w-full rounded-[6px] border border-gray-300 bg-white p-4 mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold py-1">{guardians[i].name} {((guardians[i].countryCode === countryCode) && (guardians[i].phoneNumber === phoneNumber)) && '(You)'}</h2>
            <p className="text-gray-500">+{guardians[i].countryCode} {guardians[i].phoneNumber}</p>
          </div>
          <svg className="ml-auto my-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#0D9488" />
            <path d="M26.6663 15L17.4997 24.1667L13.333 20" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>      
      ))}
      <Button onClick={handleSignOut} label="Sign out" intent="primary" />
    </>
  );
}