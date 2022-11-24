import { Input, Button, Loader, Error, Info } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { inviteMember } from "../../util/mints";
import { setUserDataFetched } from "../../redux/userSlice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { fetchUserData, handleUserProgress, signOutUser } from "../../util/users";

export default function Members() {
  // const guardians = useSelector(state => state.onboarding.guardians);
  const members = useSelector(state => state.user.federations ? state.user.federations[0]?.members : []);
  // const onboardingState = useSelector(state => state.onboarding);
  // const step = useSelector(state => state.onboarding.step);
  const federationId = useSelector(state => state.user.federations ? state.user.federations[0]?.federationId : null);
  // const members = useSelector(state => state.user.federations ? state.user.federations[0]?.guardians : []);
  // // const isNewMint = useSelector(state => state.onboarding.isNewMint);
  // // const mintName = useSelector(state => state.onboarding.mintName);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const dispatch = useDispatch();
  // const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [newMemberCountryCode, setNewMemberCountryCode] = useState("");
  const [newMemberPhoneNumber, setNewMemberPhoneNumber] = useState("");
  const [newMemberInvitationCode, setNewMemberInvitationCode] = useState("");

  const [refetch, setRefetch] = useState(true);
  // const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } 
    // else {
    //   if (!loggingOut) handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    // }

    // Refetch once
    if (session && refetch) {
      console.log("REFETCHING");
      dispatch(setUserDataFetched(false));
      fetchUserData(dispatch, session.user.accessToken, setError);
      setRefetch(false);
    }

  }, [dispatch, session, status, refetch]);

  const handleSendInvite = async (e) => {
    console.log('Invite member', newMemberCountryCode, newMemberPhoneNumber);
    let code = await inviteMember(session.user.accessToken, federationId, newMemberCountryCode, newMemberPhoneNumber, setError);
    if (code) {
      console.log("Invite sent", code);
      setNewMemberInvitationCode(code);
    } else {
      console.error("Cannot send an invite");
    }
  }

  return(
    <>
      {((status === "loading") || (!userDataFetched)) && <Loader />}
      <div className="pb-20">
        <h1 className="text-3xl text-center font-bold py-5">Members</h1>
        <div className="w-full rounded-[6px] border border-gray-300 bg-white p-4 mb-4">
          <h2 className="text-lg font-bold py-1">Invite a new member</h2>
          <Input label="Country code" value={newMemberCountryCode} onChange={(e) => setNewMemberCountryCode(e.target.value)} />
          <Input label="Phone number" value={newMemberPhoneNumber} onChange={(e) => setNewMemberPhoneNumber(e.target.value)} />
          {newMemberInvitationCode && <Info text={"Invitation code sent successfully: " + newMemberInvitationCode} />}
          <Button label="Send invite" disabled={(newMemberCountryCode === '') || (newMemberPhoneNumber === '')} onClick={handleSendInvite} />
        </div>

        <p className="pb-5 text-center">There are currently {members?.length} members using the mint.</p>
        {error && <Error text={error} />}
        {members?.map((s, i) => (
          <div key={i} className="flex w-full rounded-[6px] border border-gray-300 bg-white p-4 mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold py-1">{members[i].name} {((members[i].countryCode === countryCode) && (members[i].phoneNumber === phoneNumber)) && '(You)'}</h2>
              <p className="text-gray-500">+{members[i].countryCode} {members[i].phoneNumber}</p>
            </div>
            <svg className="ml-auto my-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="20" fill="#0D9488" />
              <path d="M26.6663 15L17.4997 24.1667L13.333 20" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>      
        ))}
      </div>
    </>
  );
}