import { setFederations, setUserDataFetched } from "../redux/userSlice";
import { setGuardianInvitationCode } from "../redux/onboardingSlice";
import { execOnce } from "next/dist/shared/lib/utils";

export const createFederation = async (dispatch, accessToken, mintName, guardianName, guardianSecret, setError) => {
  try {
    // Create a federation
    // At this time, we are fixing the number of nodes to 4
    let requestOptions = {
      method: "POST",
      cache: "no-cache",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        "name": mintName,
        "numberOfNode": 4
      })
    };
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + "federation", requestOptions);
    
    if (res && res.status === 201) {
      let federation = await res.json();
      console.log("Federation created", federation);

      let federationId = federation.id;
      federation.federationId = federationId;

      requestOptions = {
        method: "POST",
        cache: "no-cache",
        headers: new Headers({
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          "name": guardianName,
          "alias": guardianName,
          "federationId": federationId,
          "secret": guardianSecret
        })
      };
      
      res = await fetch(process.env.NEXT_PUBLIC_API_URL + "guardian", requestOptions);
  
      if (res && res.status === 201) {
        let guardian = await res.json();
        console.log("Guardian created", guardian);
  
        // TODO: Add federation to the end of the array to support multiple federations
        dispatch(setFederations([federation]));
        setError("");

        return true;
      } else {
        setError("Error creating a mint. Please try again later.");
        return false;
      }
    } else {
      console.error("createFederation error");
      setError("Error creating a mint. Please try again later.");
      return false;
    }

  } catch (e) {
    // TODO: Proper error handling
    setError("Error creating a mint. Please try again later.");
    console.error("createFederation error", e);
    return false;
  }
}

export const inviteGuardian = async (dispatch, accessToken, federationId, index, countryCode, phoneNumber, errors, setErrors) => {
  try {
    // Invite a guardian
    var requestOptions = {
      method: "POST",
      cache: "no-cache",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        "phoneNumber": phoneNumber,
        "countryCode": countryCode,
        "federationId": federationId
      })
    };
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "invite", requestOptions);
    
    // console.log("BLAH");
    // TODO: Check res code
    if (res && res.status === 200) {
      let invite = await res.json();
      console.log("Guardian invited", invite);
      
      dispatch(setGuardianInvitationCode({ index, invitationCode: invite.invitationCode }));
      let newErrors = errors;
      newErrors[index] = "";
      setErrors(newErrors);

      return true;
    } else {
      console.error("inviteGuardian error");
      let newErrors = errors;
      newErrors[index] = "An error occurred while trying to invite guardian. Please try again later.";
      setErrors(newErrors);
      return false;
    }
  } catch (e) {
    // TODO: Proper error handling
    console.error("inviteGuardian error", e);
    let newErrors = errors;
    newErrors[index] = "An error occurred while trying to invite guardian. Please try again later.";
    setErrors(newErrors);
    return false;
  }
}

export const joinFederation = async (dispatch, accessToken, guardianName, guardianSecret, invitationCode, setError) => {
  try {
    // Join a federation
    var requestOptions = {
      method: "POST",
      cache: "no-cache",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        "name": guardianName,
        "alias": guardianName,
        "secret": guardianSecret
      })
    };

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "guardian?invitationCode=" + invitationCode, requestOptions);
    
    if (res && res.status === 201) {
      let federation = await res.json();
      console.log("Guardian created", federation);
      
      // TODO: Add federation to the end of the array to support multiple federations
      dispatch(setFederations([federation]));
      // Reset user data fetched in order to re-fetch the federation & guardians
      dispatch(setUserDataFetched(false));
      
      setError("");
      return true;
    } else {
      setError("Could not join the mind. Please check your invitation code.");
      return false;
    }
  } catch (e) {
    // TODO: Proper error handling
    console.error("joinFederation error", e);
    setError("Could not join the mind. Please check your invitation code.");
    return false;
  }
}
