import { Button, Loader, Error } from "../../components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "/util/users";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const credentials = [
  {
    key: "Farm location",
    value: "Kaduna"
  },
  {
    key: "Land size",
    value: "1 acre"
  },
  {
    key: "Crop",
    value: "Rice"
  },
  {
    key: "Household",
    value: "2 adults, 3 children"
  },
  {
    key: "Harvest, 2022",
    value: "2,500 kg"
  },
  {
    key: "Harvest, 2021",
    value: "2,200 kg"
  },
  {
    key: "Cooperative",
    value: "RiceCoop"
  },
  {
    key: "Income, 2022",
    value: "$2,200"
  },
  {
    key: "Income, 2021",
    value: "$1,540"
  },
]

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

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/signin");
  //     return;
  //   }
  // }, [router, status]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signOutUser(dispatch);
    router.push("/");
  }
  
  return (
    <>
      {isLoading ? <Loader /> : <div className="px-2 py-8 pb-20">
        <h1 className="text-3xl font-semibold">Profile & Settings</h1>
        <h2 className="text-xl py-5 font-semibold">My credentials</h2>
        {credentials.map((credential, i) => <div key={i} className={`w-full flex text-gray-500 py-4 ${(i < credentials.length - 1) && "border-b border-gray-200"}`}>
          <svg width="24" height="24" className="my-auto mr-2" stroke="currentColor" viewBox="0 0 24 24" fill="none"><path d="M6.5 20H5C3.89543 20 3 19.1046 3 18V4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V18C21 19.1046 20.1046 20 19 20H17.5M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19ZM12 19L12.0214 18.9998L8.82867 22.1926L6.00024 19.3641L9.01965 16.3447M12 19L15.1928 22.1926L18.0212 19.3641L15.0018 16.3447M9 6H15M7 9.5H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p className="my-auto text-gray-500">{credential.key}</p>
          <p className="my-auto ml-auto font-bold">{credential.value}</p>
        </div>)}
        <h2 className="text-xl py-5 font-semibold">{mintName}</h2>
        <p className="pb-5">There are currently {guardians?.length} guardians for the mint.</p>
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
      </div>}
    </>
  );
}