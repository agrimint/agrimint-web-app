import { configureStore/*, applyMiddleware*/ } from '@reduxjs/toolkit';
import onboardingSlice from './onboardingSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice,
    user: userSlice
  }
});