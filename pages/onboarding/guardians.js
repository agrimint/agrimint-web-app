import { Input, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { inviteGuardian } from "../../util/mints";
import { setMintName, setMintLocation, setGuardianName, setGuardianCountryCode, setGuardianPhoneNumber } from "../../redux/onboardingSlice";

export default function InviteGuardians() {
  // const step = useSelector(state => state.onboarding.step);
  const guardians = useSelector(state => state.onboarding.guardians);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const sendInvites = async (e) => {
    // TODO:
    for (let i = 1; i < guardians.length; i++) {
      console.log('Guardian', guardians[i].phoneNumber);
      inviteGuardian(dispatch, session.user.accessToken, )
    }
    // dispatch(nextStep());
  }

  return(
    <>
      <h1 className="text-3xl text-center font-bold py-5">Invite Guardians</h1>
      <p className="pb-5 text-center">You need 4 guardians in total.</p>
      {guardians.map((s, i) => {
          // console.log(i);
          if (i > 0) return (<div key={i}>
            <h2 className="text-xl font-bold py-1">Guardian {i + 1}</h2>
            {/* <Input label="Name" value={guardians[i].name} onChange={(e) => dispatch((setGuardianName({ index: i, name: e.target.value })))} /> */}
            <Input label="Country code" value={guardians[i].countryCode} onChange={(e) => dispatch((setGuardianCountryCode({ index: i, countryCode: e.target.value })))} />
            <Input label="Phone number" value={guardians[i].phoneNumber} onChange={(e) => dispatch((setGuardianPhoneNumber({ index: i, phoneNumber: e.target.value })))} />
          </div>)
      })}
      <Button label="Send invites" disabled={(guardians[1].countryCode === '') || (guardians[1].phoneNumber === '') || 
      (guardians[2].countryCode === '') || (guardians[2].phoneNumber === '') || 
      (guardians[3].countryCode === '') || (guardians[3].phoneNumber === '') ? true : false} onClick={(e) => createMint(e)} />
    </>
  );
}