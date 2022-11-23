import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  countryCode: "",
  phoneNumber: "",
  signedIn: false,
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
      state.name = action.payload;
      state.signedIn = true; 
    },
    clearUserData: (state) => {
      state = initialState;
      console.log("Cleared user data");
    },
    setFederations: (state, action) => {
      state.federations = action.payload;
    }
  }

});

export const { 
  setName,
  setCountryCode,
  setPhoneNumber,
  setUserSignedIn,
  clearUserData,
  setFederations,
} = userSlice.actions;

export default userSlice.reducer;