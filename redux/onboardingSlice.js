import { createSlice } from '@reduxjs/toolkit';

const last = 5;

const initialState = {
  step: 1,
  mintName: '',
  mintLocation: '',
  guardians: [
    {
      id: 0,

    },
    {
      id: 1,

    },
    {
      id: 2,

    },
    {
      id: 3,

    }
  ],
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      if (state.step > last) state.step = last;
    },
    previousStep: (state) => {
      state.step -= 1;
      if (state.step < 1) state.step = 1;
    }
  }
});

export const { 
  nextStep,
  previousStep,

} = onboardingSlice.actions;

export default onboardingSlice.reducer;