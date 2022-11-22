import { Input, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, setInvitationCode } from "../../redux/onboardingSlice";
import { useRouter } from "next/router";

export default function SetupMint() {
  // const step = useSelector(state => state.onboarding.step);
  const mintName = useSelector(state => state.onboarding.mintName);
  const mintLocation = useSelector(state => state.onboarding.mintLocation);
  const dispatch = useDispatch();
  const router = useRouter();

  const joinMint = async (e) => {
    // TODO:
    dispatch(nextStep());
    
  }

  return(
    <>
      <h1 className="text-3xl text-center font-bold py-5">Join a mint</h1>
      <p className="pb-5 text-center">Please enter the invitation code you have received to join a mint.</p>
      <Input label="Invitation code" value={invitationCode} onChange={(e) => dispatch((setInvitationCode(e.target.value)))} />
      <Button label="Join" disabled={(invitationCode === '') ? true : false} onClick={(e) => joinMint(e)} />
    </>
  );
}