import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  countryCode: "",
  phoneNumber: "",
  signedIn: false,
  userDataFetched: false,
  federations: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUserSignedIn: (state, action) => {
      state.name = action.payload.name;
      state.countryCode = action.payload.countryCode;
      state.phoneNumber = action.payload.phoneNumber;
      state.signedIn = true; 
    },
    clearUserData: (state) => {
      console.log("Cleared user data");
      window.localStorage.removeItem("persist:root");
      return initialState;
    },
    setUserDataFetched: (state, action) => {
      state.userDataFetched = action.payload;
    },
    setFederations: (state, action) => {
      state.federations = action.payload;
    },
    setGuardians: (state, action) => {
      state.federations[action.payload.index].guardians = action.payload.guardians;
    },
  }

});

export const { 
  setName,
  setCountryCode,
  setPhoneNumber,
  setUserSignedIn,
  setUserDataFetched,
  clearUserData,
  setFederations,
  setGuardians,
} = userSlice.actions;

export default userSlice.reducer;