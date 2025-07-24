import { configureStore } from '@reduxjs/toolkit';
import chat from './slices/Chat.slice';
import user from './slices/User.slice';
import team from './slices/Team.slice';
import jobsSlice from './slices/Jobs.slice';
import candidates from './slices/Candiates.slice';
import clients from './slices/Agency/Client.slice';
import teamJobs from './slices/Team/TeamJobs.slice';
import teamChat from './slices/Team/TeamChat.slice';
import subscription from './slices/Subcription.slice';
import taskBoard from './slices/Agency/Taskboard.slice';
import recruiters from './slices/Agency/Recruiter.slice';
import agencyStatics from './slices/Agency/Statics.slice';
import teamCandidates from './slices/Team/Candidates.slice';
import teamDashboard from './slices/Team/TeamDashboard.slice';
import forgotPasswordSlice from './slices/ForgotPassword.slice';
import reportsAndAnalytics from './slices/Agency/ReportsAndAnalytics.slice';

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
		teamDashboard,
		forgotPasswordSlice,
		reportsAndAnalytics,
		teamCandidates,
		teamJobs,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
