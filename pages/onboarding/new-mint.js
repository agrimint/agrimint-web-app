import { Input, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, setMintName, setMintLocation } from "../../redux/onboardingSlice";
import { useRouter } from "next/router";
import { createFederation } from "../../util/mints";
import { useSession } from "next-auth/react";

export default function SetupMint() {
  // const step = useSelector(state => state.onboarding.step);
  const mintName = useSelector(state => state.onboarding.mintName);
  // const mintLocation = useSelector(state => state.onboarding.mintLocation);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const createMint = async (e) => {
    // TODO:
    if (createFederation(dispatch, session.user.accessToken, mintName)) {
      dispatch(nextStep());
      router.push("/onboarding/guardians");
    }
  }

  return(
    <>
      <h1 className="text-3xl text-center font-bold py-5">Create a mint</h1>
      <p className="pb-5 text-center">Please enter the name of your new mint.</p>
      <Input label="Name" value={mintName} onChange={(e) => dispatch((setMintName(e.target.value)))} />
      {/* <Input label="Location" value={mintLocation} onChange={(e) => dispatch((setMintLocation(e.target.value)))} /> */}
      <Button label="Create" disabled={(mintName === '') ? true : false} onClick={(e) => createMint(e)} />
    </>
  );
}