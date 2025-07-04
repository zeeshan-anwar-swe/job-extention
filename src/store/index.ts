import { configureStore } from '@reduxjs/toolkit';
import user from './slices/User.slice';
import jobsSlice from './slices/Jobs.slice';
import forgotPasswordSlice from './slices/ForgotPassword.slice';
import candidates from './slices/Candiates.slice';
import team from './slices/Team.slice';
import clients from './slices/Agency/Client.slice';
import agencyStatics from './slices/Agency/Statics.slice';
import taskBoard from './slices/Agency/Taskboard.slice';
import recruiters from './slices/Agency/Recruiter.slice';
import teamChat from './slices/Team/TeamChat.slice';
import chat from './slices/Chat.slice';
import reportsAndAnalytics from './slices/Agency/ReportsAndAnalytics.slice';
import subscription from './slices/Subcription.slice';
import teamCandidates from './slices/Team/Candidates.slice';

export const store = configureStore({
	reducer: {
		chat,
		user,
		team,
		clients,
		teamChat,
		jobsSlice,
		taskBoard,
		recruiters,
		candidates,
		subscription,
		agencyStatics,
		forgotPasswordSlice,
		reportsAndAnalytics,
		teamCandidates,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
