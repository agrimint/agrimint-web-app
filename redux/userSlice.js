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
    signInUser: (state, action) => {
      state.name = action.payload.name;
      state.signedIn = true; 
    },
    signOutUser: (state) => {
      state.name = "";
      state.countryCode = "";
      state.phoneNumber = "";
      state.signedIn = false;
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
  signInUser,
  signOutUser,
  setFederations,
} = userSlice.actions;

export default userSlice.reducer;