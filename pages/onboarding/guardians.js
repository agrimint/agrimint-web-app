import { Input, Button, Loader, Error, Info } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { inviteGuardian } from "../../util/mints";
import { onboardingFlow, setMintName, setGuardianName, setGuardianCountryCode, setGuardianPhoneNumber } from "../../redux/onboardingSlice";
import { setUserDataFetched } from "../../redux/userSlice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { handleUserProgress, signOutUser } from "../../util/users";
import Confetti from 'react-confetti';

export default function InviteGuardians() {
  const guardians = useSelector(state => state.onboarding.guardians);
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const federationId = useSelector(state => state.user.federations ? state.user.federations[0]?.federationId : null);
  const guardiansJoined = useSelector(state => state.user.federations ? state.user.federations[0]?.guardians : []);
  // const isNewMint = useSelector(state => state.onboarding.isNewMint);
  // const mintName = useSelector(state => state.onboarding.mintName);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const countryCode = useSelector(state => state.user.countryCode);
  const phoneNumber = useSelector(state => state.user.phoneNumber);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState(Array(4).fill(""));
  const [refetch, setRefetch] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else {
      if (!loggingOut) handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }

    // Refetch once
    if (userDataFetched && refetch) {
      console.log("Refetching")
      dispatch(setUserDataFetched(false));
      setRefetch(false);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    setLoggingOut(true);
    await signOutUser(dispatch);
    router.push("/");
  }

  const handleSendInvite = async (e, i) => {
    console.log('Guardian', guardians[i].phoneNumber);
    let code = inviteGuardian(dispatch, session.user.accessToken, federationId, i, guardians[i].countryCode, guardians[i].phoneNumber, errors, setErrors);
    if (code) {
      console.log("Invite sent");
    } else {
      console.error("Cannot send an invite");
    }
  }

  let remainingGuardians = guardians.length - 1; // Default
  if (guardiansJoined) {
    remainingGuardians = guardians.length - guardiansJoined.length;
    if (remainingGuardians < 0) remainingGuardians = 0;
  }

  return (
    <>
      {<Confetti recycle={false} />}
      {(status === "loading") && <Loader />}
      <h1 className="text-3xl text-center font-bold py-5">{remainingGuardians === 0 ? "You are ready!" : "Invite Guardians"}</h1>
      <p className="pb-5 text-center">You need {remainingGuardians} guardians more out of {guardians.length} in total.</p>
      {error && <Error text={error} />}
      {guardiansJoined?.map((s, i) => (
        <div key={i} className="flex w-full rounded-[6px] border border-gray-300 bg-white p-4 mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold py-1">{guardiansJoined[i].name} {((guardiansJoined[i].countryCode === countryCode) && (guardiansJoined[i].phoneNumber === phoneNumber)) && '(You)'}</h2>
            <p className="text-gray-500">+{guardiansJoined[i].countryCode} {guardiansJoined[i].phoneNumber}</p>
          </div>
          <svg className="flex my-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#0D9488" />
            <path d="M26.6663 15L17.4997 24.1667L13.333 20" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>      
      ))}
      {guardians.map((s, i) => {
          // console.log(i);
          if (i > (guardians.length - remainingGuardians - 1)) return (<div key={i}>
            <div key={i} className="w-full rounded-[6px] border border-gray-300 bg-white p-4 mb-4">
              <h2 className="text-lg font-bold py-1">Invite Guardian {i + 1}</h2>
              {/* <Input label="Name" value={guardians[i].name} onChange={(e) => dispatch((setGuardianName({ index: i, name: e.target.value })))} /> */}
              <Input label="Country code" value={guardians[i].countryCode} onChange={(e) => dispatch((setGuardianCountryCode({ index: i, countryCode: e.target.value })))} />
              <Input label="Phone number" value={guardians[i].phoneNumber} onChange={(e) => dispatch((setGuardianPhoneNumber({ index: i, phoneNumber: e.target.value })))} />
              {guardians[i].invitationCode && <Info text={"Invitation code sent successfully: " + guardians[i].invitationCode} />}
              {errors[i] && <Error text={errors[i]} />}
              <Button label="Send invite" disabled={(guardians[i].countryCode === '') || (guardians[i].phoneNumber === '')} onClick={(e) => handleSendInvite(e, i)} />
            </div>
          </div>)
      })}
      <div className="pb-8">
        <Button onClick={handleSignOut} label="Sign out" intent="secondary" />
      </div>
    </>
  );
}