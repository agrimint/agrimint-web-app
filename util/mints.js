import { setFederations } from "../redux/userSlice";

export const createFederation = async (dispatch, accessToken, mintName) => {
  try {
    // Create a federation
    // At this time, we are fixing the number of nodes to 4
    var requestOptions = {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        "name": mintName,
        "numberOfNode": 4
      })
    };
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "federation", requestOptions);
    
    if (res && res.status === 201) {
      let federation = await res.json();
      console.log("FEDERATION CREATED", federation);
      
      // TODO: Add federation to the end of the array to support multiple federations
      dispatch(setFederations([federation]));

      return true;
    } else return false;

  } catch (e) {
    // TODO: Proper error handling
    console.error("createFederation error", e);
    return false;
  }
}


export const inviteGuardian = async (dispatch, accessToken, federationId, index, countryCode, phoneNumber) => {
  try {
    // Invite a guardian
    var requestOptions = {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        "phoneNumber": phoneNumber,
        "countryCode": countryCode,
        "federationId": invite
      })
    };
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "invite", requestOptions);
    
    // TODO: Check res code
    if (res && res.status === 201) {
      // let federation = await res.json();
      console.log("GUARDIAN INVITED");
      
      dispatch(setGuardianInvited(index));

      return true;
    } else return false;

  } catch (e) {
    // TODO: Proper error handling
    console.error("inviteGuardian error", e);
    return false;
  }
}

