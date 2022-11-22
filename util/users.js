import { signOut } from "next-auth/react";
import { clearOnboardingData } from "../redux/onboardingSlice";
import { signOutUser, setFederations } from "../redux/userSlice";

// User utilities
export const requestOtp = async (name, countryCode, phoneNumber) => {
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
  
    if (res) {
      let data = await res.json();
      if (data && data.otp) {
        return data.otp;
      }
    }
  }
  catch (e) {
    console.error("requestOtp error", e);
    return null;
  }
};

export const signUp = async (name, countryCode, phoneNumber, secret, otp, signIn) => {
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
      await signIn("credentials", {
        redirect: false,
        countryCode,
        phoneNumber,
        secret
      });

      return true;
    } else {
      return false;
    }
  }
  catch (e) {
    console.error("signUp error", e);
    return false;
  }
};

export const fetchUserData = async (dispatch, accessToken) => {
  try {
    let federations;

    // Fetch federation(s)
    var requestOptions = {
      method: "GET",
      cache: "no-cache",
      credentials: "include",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
    };
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "federations", requestOptions);
    
    if (res) {
      let federations = await res.json();
      console.log("FEDERATIONS", federations)
      dispatch(setFederations(federations));
    }

    if (federations && federations.length > 0) {
      // TODO: Fetch guardians & other members
      console.log("Fetch guardians")      

    }
  } catch (e) {
    // TODO: Proper error handling
    console.error("fetchUserData error", e);
  }
}

export const handleSignOut = async (dispatch) => {
  await dispatch(signOutUser());
  await dispatch(clearOnboardingData());
  await signOut();
}