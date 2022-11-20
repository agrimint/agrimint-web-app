import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  countryCode: '',
  phoneNumber: '',
  otp: '',
  // secret: '',
  // secret2: '',
};

export const userSlice = createSlice({
  name: 'user',
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
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    // setSecret: (state, action) => {
    //   state.secret = action.payload;
    // },
    // setSecret2: (state, action) => {
    //   state.secret2 = action.payload;
    // },
    signIn: (state, action) => {
      // TODO:
      state.name = action.payload.name;
    }
  }

});

export const { 
  setName,
  setCountryCode,
  setPhoneNumber,
  setOtp,
  // setSecret,
  // setSecret2,
  signIn
} = userSlice.actions;

export default userSlice.reducer;