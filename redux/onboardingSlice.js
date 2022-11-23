import { createSlice } from "@reduxjs/toolkit";

export const onboardingFlow = [
  {
    "step": 0,
    "stepName": "Welcome",
    "stepUrl": "/",
    "canGoBack": false,
    "goBackToUrl": "/",
    "goBackToStep": 0,
    "authenticated": false
  },
  {
    "step": 1,
    "stepName": "Create account - phone number",
    "stepUrl": "/onboarding/signup",
    "canGoBack": true,
    "goBackToUrl": "/",
    "goBackToStep": 0,
    "authenticated": false
  },
  {
    "step": 2,
    "stepName": "Create account - OTP",
    "stepUrl": "/onboarding/signup",
    "canGoBack": true,
    "goBackToUrl": "/",
    "goBackToStep": 0,
    "authenticated": false
  },
  {
    "step": 3,
    "stepName": "Create account - set PIN",
    "stepUrl": "/onboarding/signup",
    "canGoBack": true,
    "goBackToUrl": "/",
    "goBackToStep": 0,
    "authenticated": false
  },
  {
    "step": 4,
    "stepName": "Account created",
    "stepUrl": "/onboarding/",
    "canGoBack": false,
    "goBackUrl": "",
    "goBackToStep": 4,
    "authenticated": true
  },
  {
    "step": 5,
    "stepName": "Create a mint",
    "stepUrl": "/onboarding/new-mint",
    "canGoBack": true,
    "goBackUrl": "/",
    "goBackToStep": 4,
    "authenticated": true
  },
  {
    "step": 6,
    "stepName": "Guardian status",
    "stepUrl": "/onboarding/status",
    "canGoBack": false,
    "goBackUrl": "",
    "goBackToStep": 6,
    "authenticated": true
  }
];

const initialState = {
  step: 0,
  lastStep: onboardingFlow[onboardingFlow.length - 1].step,
  newUser: {
    name: "",
    countryCode: "",
    phoneNumber: "",
    otp: ""
  },
  mintName: "",
  // mintLocation: "",
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
      if (onboardingFlow[state.step].canGoBack) {
        console.log("Go back to step", onboardingFlow[state.step].goBackToStep);
        if (onboardingFlow[state.step].goBackToStep === 0) {
          console.log("Reset state");
          window.localStorage.removeItem("persist:root");
          return initialState;
        } else {
          state.step = onboardingFlow[state.step].goBackToStep;
        }
      }
    },
    clearOnboardingData: () => {
      storage.removeItem("persist:root");
      console.log("Cleared onboarding data");
      return initialState;
    },
    setNewUserName: (state, action) => {
      state.newUser.name = action.payload;
    },
    setNewUserCountryCode: (state, action) => {
      state.newUser.countryCode = action.payload;
    },
    setNewUserPhoneNumber: (state, action) => {
      state.newUser.phoneNumber = action.payload;
    },
    setNewUserOtp: (state, action) => {
      state.newUser.otp = action.payload;
    },
    setMintName: (state, action) => {
      state.mintName = action.payload;
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
  setNewUserName,
  setNewUserCountryCode,
  setNewUserPhoneNumber,
  setNewUserOtp,
  clearOnboardingData,
  setMintName,
  setInvitationCode,
  setGuardianName,
  setGuardianCountryCode,
  setGuardianPhoneNumber,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;