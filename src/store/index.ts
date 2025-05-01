import { configureStore } from '@reduxjs/toolkit';
import user from './slices/User.slice';
import jobsSlice from './slices/Jobs.slice';
import forgotPasswordSlice from './slices/ForgotPassword.slice';
import candidates from './slices/Candiates.slice';
import team from './slices/Team.slice';
import clients from './slices/Agency/Client.slice';
import agencyStatics from './slices/Agency/Statics.slice';
import taskBoard from './slices/Agency/Taskboard.slice';

export const store = configureStore({
	reducer: {
		user,
		candidates,
		jobsSlice,
		forgotPasswordSlice,
		team,
		clients,
		agencyStatics,
		taskBoard,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
