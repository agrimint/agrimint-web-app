import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  lastStep: 5,
  mintName: "",
  mintLocation: "",
  invitationCode: "",
  guardians: [
    {
      id: 0,
      name: "",
      countryCode: "",
      phoneNumber: ""
    },
    {
      id: 1,
      name: "",
      countryCode: "",
      phoneNumber: ""
    },
    {
      id: 2,
      name: "",
      countryCode: "",
      phoneNumber: ""
    },
    {
      id: 3,
      name: "",
      countryCode: "",
      phoneNumber: ""
    }
  ],
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      if (state.step > state.lastStep) state.step = state.lastStep;
    },
    previousStep: (state) => {
      state.step -= 1;
      if (state.step < 1) state.step = 1;
    },
    clearOnboardingData: (state) => {
      // console.log("Clear onboarding data");
      state = initialState;
    },
    setMintName: (state, action) => {
      state.mintName = action.payload;
    },
    setMintLocation: (state, action) => {
      state.mintLocation = action.payload;
    },
    setInvitationCode: (state, action) => {
      state.invitationCode = action.payload;
    },
    setGuardianName: (state, action) => {
      if (action.payload.index <= (state.guardians.length - 1)) state.guardians[action.payload.index].name = action.payload.name;
    },
    setGuardianCountryCode: (state, action) => {
      if (action.payload.index <= (state.guardians.length - 1)) state.guardians[action.payload.index].countryCode = action.payload.countryCode;
    },
    setGuardianPhoneNumber: (state, action) => {
      if (action.payload.index <= (state.guardians.length - 1)) state.guardians[action.payload.index].phoneNumber = action.payload.phoneNumber;
    },
  }
});

export const { 
  nextStep,
  previousStep,
  clearOnboardingData,
  setMintName,
  setMintLocation,
  setInvitationCode,
  setGuardianName,
  setGuardianCountryCode,
  setGuardianPhoneNumber,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;