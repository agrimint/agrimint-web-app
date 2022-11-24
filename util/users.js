import { signIn, signOut } from "next-auth/react";
import { setStep, clearOnboardingData, setOnboardingComplete } from "../redux/onboardingSlice";
import { clearUserData, setCountryCode, setPhoneNumber, setFederations, setGuardians, setMembers, setUserSignedIn, setUserDataFetched } from "../redux/userSlice";

// User utilities
export const requestOtp = async (name, countryCode, phoneNumber, setError) => {
  try {
    console.log("requestOtp", name, countryCode, phoneNumber);

    const options = {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "otpType": "REG",
        phoneNumber,
        countryCode,
        name,
        "otpLength": 6
      })
    };

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "otp/request", options);

    if (res && res.status === 409) {
      setError("There is an existing account already registered for this phone number. Please sign in.");

    } else if (res && res.status === 200) {
      let data = await res.json();
      if (data && data.otp) {
        setError("");
        return data.otp;
      }
    }
  } catch (e) {
    console.error("requestOtp error", e);
    setError("An error has occurred. Please try again.")
    return null;
  }
};


export const signInUser = async (dispatch, countryCode, phoneNumber, secret, setError) => {
  console.log("signInUser");
  try {
    let result = await signIn("credentials", {
      redirect: false,
      countryCode,
      phoneNumber,
      secret
    });
    if (result.ok) {
      dispatch(setCountryCode(countryCode));
      dispatch(setPhoneNumber(phoneNumber));
      return true;
    } else {
      setError("The phone number or PIN code you have provided are not correct.")
      console.error(result.error)
      return false;
    }
  } catch (e) {
    console.error(e);
    setError("An error has occurred. Please try again.")
    return false;
  }
}


export const signUpUser = async (dispatch, name, countryCode, phoneNumber, secret, otp, signIn, setError) => {
  try {
    const options = {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        countryCode,
        phoneNumber,
        secret,
        otp
      })
    };

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "user", options);
  
    if (res.status === 201) {
      setError("");
      
      if (signInUser(dispatch, countryCode, phoneNumber, secret, setError)) return true;
      else return false;

    } else {
      setError("Could not create a user. Please try again.");
      return false;
    }
  } catch (e) {
    console.error("signUp error", e);
    setError("An error occurred. Please try again.");
    return false;
  }
};

export const fetchUserData = async (dispatch, accessToken, setError) => {
  try {
    console.log("=== FETCH USER DATA ===")
    let federations;

    // Fetch federation(s)
    let requestOptions = {
      method: "GET",
      cache: "no-cache",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
    };
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + "federations", requestOptions);
    
    if (res) {
      let federations = await res.json();
      console.log("Federations[] length", federations.length);

      if (federations && federations.length > 0) {
        // TODO: Fetch guardians (& other members)
        console.log("Fetch guardians");

        let federationId = federations[0].id;
        federations[0].federationId = federationId;
        let isFederationActive = federations[0].active;
        console.log("Federation", federations);
        dispatch(setFederations(federations));

        requestOptions = {
          method: "GET",
          cache: "no-cache",
          headers: new Headers({
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          }),
        };
        res = await fetch(process.env.NEXT_PUBLIC_API_URL + "member/federation/" + federationId, requestOptions);

        if (res) {
          let allMembers = await res.json();
          let guardians = allMembers.filter(guardian => guardian.guardian)
          console.log("Guardians", guardians);
          dispatch(setGuardians({ "index": 0, guardians }));
          let members = allMembers.filter(member => !(member.guardian))
          console.log("Members", members);
          dispatch(setMembers({ "index": 0, members }));

          if (guardians && guardians.length > 0) {
            if (isFederationActive) {
              // We're ready
              console.log("Federation active");
              dispatch(setOnboardingComplete(true));
            } else {
              // Let's monitor
              console.log("Monitor federation");
              dispatch(setStep(6));
            }
          }
        } else {
          // No guardians, go to the invitation step
          console.log("Time to invite guardians");
          dispatch(setStep(6));
        }
      } else {
        // Federation is empty, go to the new federation/join federation step
        console.log("Federation is empty");
        dispatch(setStep(4));
      }
      dispatch(setUserDataFetched(true));
    } else {
      setError("An error occurred. Please try again later.")
      console.error("fetchUserData error");
    }


  } catch (e) {
    // TODO: Proper error handling
    setError("An error occurred. Please try again later.")
    console.error("fetchUserData error", e);
  }
}

export const signOutUser = async (dispatch) => {
  await signOut({ redirect: false });
  await dispatch(clearUserData());
  await dispatch(clearOnboardingData());
}

export const handleUserProgress = async (dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError) => {
  if (status === "unauthenticated") {
    console.log("Not authenticated");
    // router.push(onboardingFlow[step].stepUrl(onboardingState));
  } else if (session) {
    // After the successful sign up & sign in
    console.log("Authenticated, session user", session.user);
    if (!signedIn) {
      console.log("Set signedIn flag");
      dispatch(setUserSignedIn({ name: session.user.name, countryCode: session.user.countryCode, phoneNumber: session.user.phoneNumber }));
      // dispatch(nextStep());
    } else {
      if (!userDataFetched) {
        console.log("Fetch user data", signedIn, session.user);
        fetchUserData(dispatch, session.user.accessToken, setError);
      } else {
        // Let's go
        if (onboardingState.onboardingComplete) {
          console.log("Push to dashboard");
          router.push("/dashboard");
        } else {
          console.log("Step", step);
          console.log("Onboarding state", onboardingState);
          console.log("Push URL", onboardingFlow[step].stepUrl(onboardingState));
          router.push(onboardingFlow[step].stepUrl(onboardingState));
        }
      }
    }
  }
}