import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  countryCode: '',
  phoneNumber: '',
  signedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      console.log('REDUX setName')
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
      console.log('REDUX signInUser')
    },
    signOutUser: (state) => {
      state.name = '';
      state.countryCode = '';
      state.phoneNumber = '';
      state.signedIn = false;
      console.log('REDUX signOutUser')
    },
  }

});

export const { 
  setName,
  setCountryCode,
  setPhoneNumber,
  signInUser,
  signOutUser,
} = userSlice.actions;

export default userSlice.reducer;