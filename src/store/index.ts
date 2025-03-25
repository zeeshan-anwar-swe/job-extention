import { configureStore } from '@reduxjs/toolkit';
import user from './slices/User.slice';
import jobsSlice from './slices/Jobs.slice';
import forgotPasswordSlice from './slices/ForgotPassword.slice';
import candidates from './slices/Candiates.slice';
import team from './slices/Team.slice';
import clients from './slices/Agency/Client.slice';

export const store = configureStore({
	reducer: {
		user,
		candidates,
		jobsSlice,
		forgotPasswordSlice,
		team,
		clients,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
