import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { appPages, authPages, LandingPages } from '../config/pages.config';

// --- Lazy Loaded Components ---
const NotFoundPage = lazy(() => import('../modules/AgencyAdmin.module/pages/NotFound.page'));
const CandidatesProfilePage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/CandidatesPage/CandidateProfile/CandidatesProfile.page'
		),
);
const CandidateCVEditPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/CandidatesPage/CandidateCVEdit/CandidateCVEdit.page'
		),
);
const JobsViewCandidatesPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/Jobs/JobsViewCadidates/JobsViewCandidates.page'
		),
);
const JobsCreateNewJobPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/Jobs/JobsCreateNewJob/JobsCreateNewJob.page'
		),
);
const ClientsPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/ClientsPage/Clients.page'),
);
const ClientProfilePage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/ClientsPage/ClientProfile/ClientProfile.page'
		),
);
const TaskboardPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/TaskboardPages/Taskboard.page'),
);
const KoolabyteAssistantPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/KoolabyteAssistantPage/KoolabyteAssistant.page'
		),
);
const ReportAndAnalyticsPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/ReportAndAnalyticsPage/ReportAndAnalytics.page'
		),
);
const ManageTeamPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/ManageTeamPage/ManageTeam.page'),
);
const TeammateProfilePage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/ManageTeamPage/TeammateProfilePage/TeammateProfile.page'
		),
);
const ChatPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/ManageTeamPage/ChatPage/Chat.page'),
);
const SettingPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/SettingPage/Setting.page'),
);
const ConnectCRMPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/SettingPage/ConnectCRMPage/ConnectCRM.page'
		),
);
const SubcriptionPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/SettingPage/SubcriptionPage/Subcription.page'
		),
);
const PaymentPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/PaymentPage/Payment.page'),
);
const SSOWaitingPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/SSOWaiting/SSOWaiting.page'),
);
const ChatWithRecruiterPage = lazy(() => import('../modules/Team.module/pages/ChatPage/Chat.page'));
const ClientJobsPage = lazy(
	() =>
		import(
			'../modules/AgencyAdmin.module/pages/ClientsPage/ClientJobs/ClientJobs.page'
		),
);
const ChatMain = lazy(() => import('../modules/Shared/pages/ChatPage2/ChatMain'));
const TeamDashboardPage = lazy(
	() => import('../modules/Team.module/pages/DashboardPage/Dashboard.page'),
);
const TeamCandidatesPage = lazy(
	() => import('../modules/Team.module/pages/CandidatesPage/Candidates.page'),
);
const TeamCandidatesProfilePage = lazy(
	() =>
		import(
			'../modules/Team.module/pages/CandidatesPage/CandidateProfile/CandidatesProfile.page'
		),
);
const TeamJobsPage = lazy(() => import('../modules/Team.module/pages/Jobs/Jobs.page'));
const SuperAdminDashboardPage = lazy(
	() => import('../modules/SuperAdmin.module/pages/DashboardPage/Dashboard.page'),
);
const SuperAdminRecruitersPage = lazy(
	() => import('../modules/SuperAdmin.module/pages/RecruitersPage/Recruiters.page'),
);
const AdminPage = lazy(() => import('../modules/SuperAdmin.module/pages/AdminPage/Admin.page'));
const SuperAdminCandidatesPage = lazy(
	() => import('../modules/SuperAdmin.module/pages/CandidatesPage/Candidates.page'),
);
const SuperAdminJobsPage = lazy(() => import('../modules/SuperAdmin.module/pages/Jobs/Jobs.page'));
const SuperAdminClientsPage = lazy(
	() => import('../modules/SuperAdmin.module/pages/ClientsPage/Clients.page'),
);
const SuperAdminAiInterviewPage = lazy(
	() => import('../modules/SuperAdmin.module/pages/AiInterview/AiInterview.page'),
);
const SuperAdminKoolabyteAssistantPage = lazy(
	() =>
		import(
			'../modules/SuperAdmin.module/pages/KoolabyteAssistantPage/KoolabyteAssistant.page'
		),
);
const SuperAdminSettingPage = lazy(
	() => import('../modules/Shared/pages/SettingPage/Setting.page'),
);
const SuperAdminRecruiterProfilePage = lazy(
	() =>
		import(
			'../modules/SuperAdmin.module/pages/RecruitersPage/RecruiterProfilePage/RecruiterProfile.page'
		),
);
const SuperAdminCandidatesProfilePage = lazy(
	() =>
		import(
			'../modules/SuperAdmin.module/pages/CandidatesPage/CandidateProfile/CandidatesProfile.page'
		),
);
const SuperAdminViewJobPage = lazy(
	() =>
		import(
			'../modules/SuperAdmin.module/pages/Jobs/JobsViewCadidates/JobsViewCandidates.page'
		),
);
const SuperAdminClientProfilePage = lazy(
	() =>
		import(
			'../modules/SuperAdmin.module/pages/ClientsPage/ClientProfile/ClientProfile.page'
		),
);
const SuperAdminSubcriptionPage = lazy(
	() =>
		import(
			'../modules/SuperAdmin.module/pages/SettingPage/SubcriptionPage/Subcription.page'
		),
);
import LoginPage from '../modules/Shared/pages/LoginPage/Login.page';
import SignupPage from '../modules/Shared/pages/SignupPage/Signup.page';
// const LoginPage = lazy(
//   () => import("../modules/Shared/pages/LoginPage/Login.page")
// );
const ConfirmtionPage = lazy(() => import('../modules/Shared/pages/SignupPage/Confirmation.page'));
// const SignupPage = lazy(() => import('../modules/Shared/pages/SignupPage/Signup.page'));
const SetUserPassword = lazy(() => import('../modules/Shared/pages/user/SetUserPassword.page'));

import { UserVerificationPage } from '../modules/Shared/pages/user/UserVerify.page';

const TeamSettingPage = lazy(() => import('../modules/Team.module/pages/SettingPage/Setting.page'));
const CustomCVPage = lazy(() => import('../modules/AgencyAdmin.module/pages/CustomCVPage/page'));
const CreateCustomCVPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/CustomCVPage/CreateCustomCVPage/page'),
);
const ViewCustomCVPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/CustomCVPage/ViewCustomCVPage/page'),
);
import LandingPage from '../modules/Landing.module/pages/Home/page';
import CONTACT from '../modules/Landing.module/pages/Contact/page';
import BLOG from '../modules/Landing.module/pages/Blogs/page';
import PRICING from '../modules/Landing.module/pages/Pricing/page';
import BLOGPOST from '../modules/Landing.module/pages/BlogPosts/page';

const TeamClientsPage = lazy(() => import('../modules/Team.module/pages/ClientsPage/Clients.page'));
const TeamJobsCreatePage = lazy(
	() => import('../modules/Team.module/pages/Jobs/JobsCreateNewJob/JobsCreateNewJob.page'),
);
const TeamJobDelatils = lazy(
	() =>
		import(
			'../modules/Team.module/pages/Jobs/JobsViewCadidates/JobsViewCandidates.page'
		),
);
const TeamTaskboardPage = lazy(
	() => import('../modules/Team.module/pages/TaskboardPages/Taskboard.page'),
);
const TeamClientProfilePage = lazy(
	() => import('../modules/Team.module/pages/ClientsPage/ClientProfile/ClientProfile.page'),
);
const TeamCandidateCVEditPage = lazy(
	() =>
		import(
			'../modules/Team.module/pages/CandidatesPage/CandidateCVEdit/CandidateCVEdit.page'
		),
);

const DashboardPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/DashboardPage/Dashboard.page'),
);
const CandidatesPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/CandidatesPage/Candidates.page'),
);
const JobsPage = lazy(() => import('../modules/AgencyAdmin.module/pages/Jobs/Jobs.page'));

// --- All other code remains the same ---
const landingPagesRoutes = [
	{
		path: LandingPages.home.to,
		element: <LandingPage />,
	},
	{
		path: LandingPages.contact.to,
		element: <CONTACT />,
	},

	{
		path: LandingPages.blogs.to,
		element: <BLOG />,
	},
	{
		path: LandingPages.blogPosts.to,
		element: <BLOGPOST />,
	},
	{
		path: LandingPages.pricing.to,
		element: <PRICING />,
	},
];

interface ContentRoutesType {
	Admin: RouteProps[];
	SuperAdmin: RouteProps[];
	AgencyAdmin: RouteProps[];
	Client: RouteProps[];
	Team: RouteProps[];
	default: RouteProps[];
}

const contentRoutes: ContentRoutesType = {
	AgencyAdmin: [
		...landingPagesRoutes,
		{
			path: appPages.AgencyAdmin.chatAppPages.to + '/*',
			element: <ChatMain />,
		},

		{
			path: appPages.AgencyAdmin.dashboardAppPages.to,
			element: <DashboardPage />,
		},

		{
			path: appPages.AgencyAdmin.pamentAppPages.to,
			element: <PaymentPage />,
		},

		{
			path: appPages.AgencyAdmin.candidatesAppPages.to,
			element: <CandidatesPage />,
		},

		{
			path: `${appPages.AgencyAdmin.candidatesAppPages.subPages.cadidateProfileAppPage.to}`,
			element: <CandidatesProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.candidatesAppPages.subPages
				.candidateCVEditAppPage.to,
			element: <CandidateCVEditPage />,
		},

		{
			path: appPages.AgencyAdmin.jobsAppPages.to,
			element: <JobsPage />,
		},

		{
			path: `${appPages.AgencyAdmin.jobsAppPages.subPages.viewCadidatesAppPages.to}`,
			element: <JobsViewCandidatesPage />,
		},

		{
			path: `${appPages.AgencyAdmin.jobsAppPages.subPages.editJobAppPages.to}`,
			element: <JobsViewCandidatesPage />,
		},

		{
			path: appPages.AgencyAdmin.jobsAppPages.subPages.createJobsAppPages
				.to,
			element: <JobsCreateNewJobPage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.to,
			element: <ClientsPage />,
		},

		{
			path: `${appPages.AgencyAdmin.clientsAppPages.subPages.clientProfileAppPages.to}/:id`,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.subPages
				.clientProfileAppPages.to,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.subPages.clientJobsAppPages
				.to,
			element: <ClientJobsPage />,
		},

		{
			path: appPages.AgencyAdmin.taskBoardAppPages.to,
			element: <TaskboardPage />,
		},

		{
			path: appPages.AgencyAdmin.settingAppPages.to,
			element: <SettingPage />,
		},

		{
			path: appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages
				.to,
			element: <ConnectCRMPage />,
		},
		{
			path: appPages.AgencyAdmin.settingAppPages.subPages
				.subcriptionAppPages.to,
			element: <SubcriptionPage />,
		},

		{
			path: appPages.AgencyAdmin.reportAndAnalyticsAppPages.to,
			element: <ReportAndAnalyticsPage />,
		},

		{
			path: appPages.AgencyAdmin.KoalaByteAssistantAppPages.to,
			element: <KoolabyteAssistantPage />,
		},

		{
			path: appPages.AgencyAdmin.manageTeamAppPages.to,
			element: <ManageTeamPage />,
		},

		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.teammateProfileAppPages.to}/:id`,
			element: <TeammateProfilePage />,
		},
		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.teammateProfileAppPages.to}`,
			element: <TeammateProfilePage />,
		},

		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.chatAppPage.to}/*`,
			element: <ChatPage />,
		},

		{
			path: `${appPages.AgencyAdmin.customCVAppPages.to}`,
			element: <CustomCVPage />,
		},

		{
			path: `${appPages.AgencyAdmin.customCVAppPages.subsPages.createCVPages.to}`,
			element: <CreateCustomCVPage />,
		},

		{
			path: `${appPages.AgencyAdmin.customCVAppPages.subsPages.editCVPages.to}`,
			element: <CreateCustomCVPage />,
		},

		{
			path: `${appPages.AgencyAdmin.customCVAppPages.subsPages.viewCVPages.to}`,
			element: <ViewCustomCVPage />,
		},

		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.ssoWaitingPage.to, element: <SSOWaitingPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userPasswrodSet.to, element: <SetUserPassword /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },
		{
			path: authPages.signupPage.subPages.confirmationPage.to,
			element: <ConfirmtionPage />,
		},

		{ path: '*', element: <NotFoundPage /> },
	],
	Client: [
		...landingPagesRoutes,
		{
			path: appPages.AgencyAdmin.dashboardAppPages.to,
			element: <DashboardPage />,
		},

		{
			path: appPages.AgencyAdmin.pamentAppPages.to,
			element: <PaymentPage />,
		},

		{
			path: appPages.AgencyAdmin.candidatesAppPages.to,
			element: <CandidatesPage />,
		},

		{
			path: `${appPages.AgencyAdmin.candidatesAppPages.subPages.cadidateProfileAppPage.to}`,
			element: <CandidatesProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.candidatesAppPages.subPages
				.candidateCVEditAppPage.to,
			element: <CandidateCVEditPage />,
		},

		{
			path: appPages.AgencyAdmin.jobsAppPages.to,
			element: <JobsPage />,
		},

		{
			path: `${appPages.AgencyAdmin.jobsAppPages.subPages.viewCadidatesAppPages.to}`,
			element: <JobsViewCandidatesPage />,
		},

		{
			path: appPages.AgencyAdmin.jobsAppPages.subPages.createJobsAppPages
				.to,
			element: <JobsCreateNewJobPage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.to,
			element: <ClientsPage />,
		},

		{
			path: `${appPages.AgencyAdmin.clientsAppPages.subPages.clientProfileAppPages.to}/:id`,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.subPages
				.clientProfileAppPages.to,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.taskBoardAppPages.to,
			element: <TaskboardPage />,
		},

		{
			path: appPages.AgencyAdmin.settingAppPages.to,
			element: <SettingPage />,
		},

		{
			path: appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages
				.to,
			element: <ConnectCRMPage />,
		},
		{
			path: appPages.AgencyAdmin.settingAppPages.subPages
				.subcriptionAppPages.to,
			element: <SubcriptionPage />,
		},

		{
			path: appPages.AgencyAdmin.reportAndAnalyticsAppPages.to,
			element: <ReportAndAnalyticsPage />,
		},

		{
			path: appPages.AgencyAdmin.KoalaByteAssistantAppPages.to,
			element: <KoolabyteAssistantPage />,
		},

		{
			path: appPages.AgencyAdmin.manageTeamAppPages.to,
			element: <ManageTeamPage />,
		},

		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.teammateProfileAppPages.to}/:id`,
			element: <TeammateProfilePage />,
		},
		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.teammateProfileAppPages.to}`,
			element: <TeammateProfilePage />,
		},

		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.chatAppPage.to}/*`,
			element: <ChatPage />,
		},

		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.ssoWaitingPage.to, element: <SSOWaitingPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{
			path: authPages.signupPage.subPages.confirmationPage.to,
			element: <ConfirmtionPage />,
		},
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },

		{ path: '*', element: <NotFoundPage /> },
	],
	Team: [
		...landingPagesRoutes,
		{
			path: appPages.Team.dashboardAppPages.to,
			element: <TeamDashboardPage />,
		},

		{
			path: appPages.Team.jobsPages.to,
			element: <TeamJobsPage />,
		},

		{
			path: appPages.Team.jobsPages.subPages.viewCadidatesAppPages.to,
			element: <TeamJobDelatils />,
		},

		{
			path: appPages.Team.jobsPages.subPages.createJobsAppPages.to,
			element: <TeamJobsCreatePage />,
		},

		{
			path: appPages.Team.candidatesPage.to,
			element: <TeamCandidatesPage />,
		},

		{
			path: appPages.Team.candidatesPage.subPages.cadidateProfileAppPage.to,
			element: <TeamCandidatesProfilePage />,
		},

		{
			path: appPages.Team.candidatesPage.subPages.candidateCVEditAppPage.to,
			element: <TeamCandidateCVEditPage />,
		},

		{
			path: appPages.Team.clientsAppPages.to,
			element: <TeamClientsPage />,
		},

		{
			path: appPages.Team.clientsAppPages.subPages.clientProfileAppPages.to,
			element: <TeamClientProfilePage />,
		},

		{
			path: `${appPages.Team.customCVAppPages.to}`,
			element: <CustomCVPage />,
		},

		{
			path: `${appPages.Team.customCVAppPages.subsPages.createCVPages.to}`,
			element: <CreateCustomCVPage />,
		},

		{
			path: `${appPages.Team.customCVAppPages.subsPages.editCVPages.to}`,
			element: <CreateCustomCVPage />,
		},

		{
			path: `${appPages.Team.customCVAppPages.subsPages.viewCVPages.to}`,
			element: <ViewCustomCVPage />,
		},

		{
			path: appPages.Team.chatAppPages.to + '/*',
			element: <ChatMain />,
		},

		// {
		// 	path: appPages.Team.recruiterAppPages.to,
		// 	element: <RecruitersPage />,
		// },

		{
			path: appPages.Team.settingAppPages.subPages.settingPage.to,
			element: <TeamSettingPage />,
		},

		{
			path: appPages.Team.taskBoardAppPages.to,
			element: <TeamTaskboardPage />,
		},

		{
			path: appPages.Team.chatPage.to,
			element: <ChatWithRecruiterPage />,
		},

		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.ssoWaitingPage.to, element: <SSOWaitingPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },
		{
			path: authPages.signupPage.subPages.confirmationPage.to,
			element: <ConfirmtionPage />,
		},

		{ path: '*', element: <NotFoundPage /> },
	],
	Admin: [
		...landingPagesRoutes,
		{
			path: appPages.AgencyAdmin.dashboardAppPages.to,
			element: <DashboardPage />,
		},

		{
			path: appPages.AgencyAdmin.pamentAppPages.to,
			element: <PaymentPage />,
		},

		{
			path: appPages.AgencyAdmin.candidatesAppPages.to,
			element: <CandidatesPage />,
		},

		{
			path: `${appPages.AgencyAdmin.candidatesAppPages.subPages.cadidateProfileAppPage.to}`,
			element: <CandidatesProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.candidatesAppPages.subPages
				.candidateCVEditAppPage.to,
			element: <CandidateCVEditPage />,
		},

		{
			path: appPages.AgencyAdmin.jobsAppPages.to,
			element: <JobsPage />,
		},

		{
			path: `${appPages.AgencyAdmin.jobsAppPages.subPages.viewCadidatesAppPages.to}`,
			element: <JobsViewCandidatesPage />,
		},

		{
			path: appPages.AgencyAdmin.jobsAppPages.subPages.createJobsAppPages
				.to,
			element: <JobsCreateNewJobPage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.to,
			element: <ClientsPage />,
		},

		{
			path: `${appPages.AgencyAdmin.clientsAppPages.subPages.clientProfileAppPages.to}/:id`,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.subPages
				.clientProfileAppPages.to,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.taskBoardAppPages.to,
			element: <TaskboardPage />,
		},

		{
			path: appPages.AgencyAdmin.settingAppPages.to,
			element: <SettingPage />,
		},

		{
			path: appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages
				.to,
			element: <ConnectCRMPage />,
		},
		{
			path: appPages.AgencyAdmin.settingAppPages.subPages
				.subcriptionAppPages.to,
			element: <SubcriptionPage />,
		},

		{
			path: appPages.AgencyAdmin.reportAndAnalyticsAppPages.to,
			element: <ReportAndAnalyticsPage />,
		},

		{
			path: appPages.AgencyAdmin.KoalaByteAssistantAppPages.to,
			element: <KoolabyteAssistantPage />,
		},

		{
			path: appPages.AgencyAdmin.manageTeamAppPages.to,
			element: <ManageTeamPage />,
		},

		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.teammateProfileAppPages.to}/:id`,
			element: <TeammateProfilePage />,
		},
		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.teammateProfileAppPages.to}`,
			element: <TeammateProfilePage />,
		},

		{
			path: `${appPages.AgencyAdmin.manageTeamAppPages.subPages.chatAppPage.to}/*`,
			element: <ChatPage />,
		},

		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.ssoWaitingPage.to, element: <SSOWaitingPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userPasswrodSet.to, element: <SetUserPassword /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },
		{
			path: authPages.signupPage.subPages.confirmationPage.to,
			element: <ConfirmtionPage />,
		},

		{ path: '*', element: <NotFoundPage /> },
	],
	SuperAdmin: [
		...landingPagesRoutes,
		{
			path: appPages.SuperAdmin.dashboardAppPages.to,
			element: <SuperAdminDashboardPage />,
		},
		{
			path: '/',
			element: <LandingPage />,
		},

		{
			path: appPages.SuperAdmin.recruiterAppPages.to,
			element: <SuperAdminRecruitersPage />,
		},

		{
			path: appPages.SuperAdmin.recruiterAppPages.subPages
				.recruiterProfilePage.to,
			element: <SuperAdminRecruiterProfilePage />,
		},

		{
			path: appPages.SuperAdmin.candidatesAppPages.to,
			element: <SuperAdminCandidatesPage />,
		},

		{
			path: appPages.SuperAdmin.candidatesAppPages.subPages
				.cadidateProfileAppPage.to,
			element: <SuperAdminCandidatesProfilePage />,
		},

		{
			path: appPages.SuperAdmin.jobsAppPages.to,
			element: <SuperAdminJobsPage />,
		},

		{
			path: appPages.SuperAdmin.jobsAppPages.subPages.viewJobAppPages.to,
			element: <SuperAdminViewJobPage />,
		},

		{
			path: appPages.SuperAdmin.clientsAppPages.to,
			element: <SuperAdminClientsPage />,
		},

		{
			path: appPages.SuperAdmin.clientsAppPages.subPages
				.clientProfileAppPages.to,
			element: <SuperAdminClientProfilePage />,
		},

		{
			path: appPages.SuperAdmin.adminAppPages.to,
			element: <AdminPage />,
		},

		{
			path: appPages.SuperAdmin.aiInterviewAppPages.to,
			element: <SuperAdminAiInterviewPage />,
		},

		{
			path: appPages.SuperAdmin.KoalaByteAssistantAppPages.to,
			element: <SuperAdminKoolabyteAssistantPage />,
		},

		{
			path: appPages.SuperAdmin.settingAppPages.to,
			element: <SuperAdminSettingPage />,
		},

		{
			path: appPages.SuperAdmin.settingAppPages.subPages.subcriptionAppPages
				.to,
			element: <SuperAdminSubcriptionPage />,
		},

		{
			path: appPages.SuperAdmin.settingAppPages.to,
			element: <SuperAdminSettingPage />,
		},
		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userPasswrodSet.to, element: <SetUserPassword /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },
		{
			path: authPages.signupPage.subPages.confirmationPage.to,
			element: <ConfirmtionPage />,
		},
		{ path: '*', element: <NotFoundPage /> },
	],

	default: [
		...landingPagesRoutes,
		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userPasswrodSet.to, element: <SetUserPassword /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },
		{
			path: authPages.signupPage.subPages.confirmationPage.to,
			element: <ConfirmtionPage />,
		},
		{ path: '*', element: <NotFoundPage /> },
	],
};
export default contentRoutes;
