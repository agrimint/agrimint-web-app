import { signIn, signOut } from "next-auth/react";
import { clearOnboardingData } from "../redux/onboardingSlice";
import { clearUserData, setCountryCode, setFederations, setPhoneNumber, setUserSignedIn } from "../redux/userSlice";

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
    let federations;

    // Fetch federation(s)
    var requestOptions = {
      method: "GET",
      cache: "no-cache",
      credentials: "include",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4000", // TODO: fix
        "Access-Control-Allow-Credentials": "true"
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
    setError("An error occurred. Please try again later.")
    console.error("fetchUserData error", e);
  }
}

export const signOutUser = async (dispatch) => {
  await dispatch(clearUserData());
  await dispatch(clearOnboardingData());
  await signOut({ redirect: false });
}