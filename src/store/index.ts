import { configureStore } from '@reduxjs/toolkit';

import chat from './slices/Chat.slice';
import user from './slices/User.slice';
import team from './slices/Team.slice';
import jobsSlice from './slices/Jobs.slice';
import candidates from './slices/Candiates.slice';
import clients from './slices/Agency/Client.slice';
import teamJobs from './slices/Team/TeamJobs.slice';
import teamChat from './slices/Team/TeamChat.slice';
import customCV from './slices/Agency/CustomCV.slice';
import subscription from './slices/Subcription.slice';
import taskBoard from './slices/Agency/Taskboard.slice';
import recruiters from './slices/Agency/Recruiter.slice';
import AdminSlice from './slices/SuperAdmin/Admin.slice';
import agencyStatics from './slices/Agency/Statics.slice';
import teamCandidates from './slices/Team/Candidates.slice';
import teamDashboard from './slices/Team/TeamDashboard.slice';
import forgotPasswordSlice from './slices/ForgotPassword.slice';
import adminStatics from './slices/SuperAdmin/Dashboard.slice';
import recruitersAdmin from './slices/SuperAdmin/Recruiter.slice';
import reportsAndAnalytics from './slices/Agency/ReportsAndAnalytics.slice';
import blog from './slices/LandingPage/Blog.slice';
import SuperAdminClients from './slices/SuperAdmin/SuperAdminClients.slice';

export const store = configureStore({
	reducer: {
		chat,
		blog,
		user,
		team,
		clients,
		teamChat,
		teamJobs,
		customCV,
		jobsSlice,
		taskBoard,
		recruiters,
		AdminSlice,
		candidates,
		adminStatics,
		subscription,
		agencyStatics,
		teamDashboard,
		teamCandidates,
		recruitersAdmin,
		SuperAdminClients,
		forgotPasswordSlice,
		reportsAndAnalytics,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
