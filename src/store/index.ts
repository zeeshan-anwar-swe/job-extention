import { configureStore } from '@reduxjs/toolkit';
import user from './slices/User.slice';
import jobsSlice from './slices/Jobs.slice';
import forgotPasswordSlice from './slices/ForgotPassword.slice';

export const store = configureStore({
	reducer: {
		user,
		jobsSlice,
		forgotPasswordSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
