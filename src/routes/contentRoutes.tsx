import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import NotFoundPage from '../modules/AgencyAdmin.module/pages/NotFound.page';
import { appPages, authPages } from '../config/pages.config';
import CandidatesProfilePage from '../modules/AgencyAdmin.module/pages/CandidatesPage/CandidateProfile/CandidatesProfile.page';
import CandidateCVEditPage from '../modules/AgencyAdmin.module/pages/CandidatesPage/CandidateCVEdit/CandidateCVEdit.page';
import JobsViewCandidatesPage from '../modules/AgencyAdmin.module/pages/Jobs/JobsViewCadidates/JobsViewCandidates.page';
import JobsCreateNewJobPage from '../modules/AgencyAdmin.module/pages/Jobs/JobsCreateNewJob/JobsCreateNewJob.page';
import ClientsPage from '../modules/AgencyAdmin.module/pages/ClientsPage/Clients.page';
import ClientProfilePage from '../modules/AgencyAdmin.module/pages/ClientsPage/ClientProfile/ClientProfile.page';
import TaskboardPage from '../modules/AgencyAdmin.module/pages/TaskboardPages/Taskboard.page';
import KoolabyteAssistantPage from '../modules/AgencyAdmin.module/pages/KoolabyteAssistantPage/KoolabyteAssistant.page';
import ReportAndAnalyticsPage from '../modules/AgencyAdmin.module/pages/ReportAndAnalyticsPage/ReportAndAnalytics.page';
import ManageTeamPage from '../modules/AgencyAdmin.module/pages/ManageTeamPage/ManageTeam.page';
import TeammateProfilePage from '../modules/AgencyAdmin.module/pages/ManageTeamPage/TeammateProfilePage/TeammateProfile.page';
import ChatPage from '../modules/AgencyAdmin.module/pages/ManageTeamPage/ChatPage/Chat.page';
import SettingPage from '../modules/AgencyAdmin.module/pages/SettingPage/Setting.page';
import ConnectCRMPage from '../modules/AgencyAdmin.module/pages/SettingPage/ConnectCRMPage/ConnectCRM.page';
import SubcriptionPage from '../modules/AgencyAdmin.module/pages/SettingPage/SubcriptionPage/Subcription.page';
import PaymentPage from '../modules/AgencyAdmin.module/pages/PaymentPage/Payment.page';
import SSOWaitingPage from '../modules/AgencyAdmin.module/pages/SSOWaiting/SSOWaiting.page';
import RecruitersPage from '../modules/Team.module/pages/TeamMembers/Recruiter.page';
import ChatWithRecruiterPage from '../modules/Team.module/pages/ChatPage/Chat.page';
import ClientJobsPage from '../modules/AgencyAdmin.module/pages/ClientsPage/ClientJobs/ClientJobs.page';
import ChatMain from '../modules/Shared/pages/ChatPage2/ChatMain';
import TeamDashboardPage from '../modules/Team.module/pages/DashboardPage/Dashboard.page';
import TeamCandidatesPage from '../modules/Team.module/pages/CandidatesPage/Candidates.page';
import TeamCandidatesProfilePage from '../modules/Team.module/pages/CandidatesPage/CandidateProfile/CandidatesProfile.page';
import TeamJobsPage from '../modules/Team.module/pages/Jobs/Jobs.page';
import TeamJobDetailsPage from '../modules/Team.module/pages/Jobs/JobsViewCadidates/TeamJobDetails.page';
import SuperAdminDashboardPage from '../modules/SuperAdmin.module/pages/DashboardPage/Dashboard.page';
import SuperAdminRecruitersPage from '../modules/SuperAdmin.module/pages/RecruitersPage/Recruiters.page';
import AdminPage from '../modules/SuperAdmin.module/pages/AdminPage/Admin.page';
import SuperAdminCandidatesPage from '../modules/SuperAdmin.module/pages/CandidatesPage/Candidates.page';
import SuperAdminJobsPage from '../modules/SuperAdmin.module/pages/Jobs/Jobs.page';
import SuperAdminClientsPage from '../modules/SuperAdmin.module/pages/ClientsPage/Clients.page';
import SuperAdminAiInterviewPage from '../modules/SuperAdmin.module/pages/AiInterview/AiInterview.page';
import SuperAdminKoolabyteAssistantPage from '../modules/SuperAdmin.module/pages/KoolabyteAssistantPage/KoolabyteAssistant.page';
import SuperAdminSettingPage from '../modules/Shared/pages/SettingPage/Setting.page';
import SuperAdminRecruiterProfilePage from '../modules/SuperAdmin.module/pages/RecruitersPage/RecruiterProfilePage/RecruiterProfile.page';
import SuperAdminCandidatesProfilePage from '../modules/SuperAdmin.module/pages/CandidatesPage/CandidateProfile/CandidatesProfile.page';
import SuperAdminViewJobPage from '../modules/SuperAdmin.module/pages/Jobs/JobsViewCadidates/JobsViewCandidates.page';
import SuperAdminClientProfilePage from '../modules/SuperAdmin.module/pages/ClientsPage/ClientProfile/ClientProfile.page';
import SuperAdminSubcriptionPage from '../modules/SuperAdmin.module/pages/SettingPage/SubcriptionPage/Subcription.page';
import LoginPage from '../modules/Shared/pages/LoginPage/Login.page';
import ConfirmtionPage from '../modules/Shared/pages/SignupPage/Confirmation.page';
import SignupPage from '../modules/Shared/pages/SignupPage/Signup.page';
import SetUserPassword from '../modules/Shared/pages/user/SetUserPassword.page';
import { UserVerificationPage } from '../modules/Shared/pages/user/UserVerify.page';
import TeamSettingPage from '../modules/Team.module/pages/SettingPage/Setting.page';

const DashboardPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/DashboardPage/Dashboard.page'),
);
const CandidatesPage = lazy(
	() => import('../modules/AgencyAdmin.module/pages/CandidatesPage/Candidates.page'),
);
const JobsPage = lazy(() => import('../modules/AgencyAdmin.module/pages/Jobs/Jobs.page'));

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
			path: appPages.AgencyAdmin.candidatesAppPages.subPages.candidateCVEditAppPage.to,
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
			path: appPages.AgencyAdmin.jobsAppPages.subPages.createJobsAppPages.to,
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
			path: appPages.AgencyAdmin.clientsAppPages.subPages.clientProfileAppPages.to,
			element: <ClientProfilePage />,
		},

		{
			path: appPages.AgencyAdmin.clientsAppPages.subPages.clientJobsAppPages.to,
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
			path: appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages.to,
			element: <ConnectCRMPage />,
		},
		{
			path: appPages.AgencyAdmin.settingAppPages.subPages.subcriptionAppPages.to,
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

		
		{ path: '*', element: <NotFoundPage /> },
	],
	Client: [
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
			path: appPages.AgencyAdmin.candidatesAppPages.subPages.candidateCVEditAppPage.to,
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
			path: appPages.AgencyAdmin.jobsAppPages.subPages.createJobsAppPages.to,
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
			path: appPages.AgencyAdmin.clientsAppPages.subPages.clientProfileAppPages.to,
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
			path: appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages.to,
			element: <ConnectCRMPage />,
		},
		{
			path: appPages.AgencyAdmin.settingAppPages.subPages.subcriptionAppPages.to,
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
		
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },

		{ path: '*', element: <NotFoundPage /> },
	],
	Team: [
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
			element: <TeamJobDetailsPage />,
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
			path: appPages.Team.chatAppPages.to + '/*',
			element: <ChatMain />,
		},

		{
			path: appPages.Team.recruiterAppPages.to,
			element: <RecruitersPage />,
		},

		{
			path: appPages.Team.settingAppPages.subPages.settingPage.to,
			element: <TeamSettingPage />,
		},

		{
			path: appPages.Team.chatPage.to,
			element: <ChatWithRecruiterPage />,
		},

		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.ssoWaitingPage.to, element: <SSOWaitingPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },

		{ path: '*', element: <NotFoundPage /> },
	],
	Admin: [
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
			path: appPages.AgencyAdmin.candidatesAppPages.subPages.candidateCVEditAppPage.to,
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
			path: appPages.AgencyAdmin.jobsAppPages.subPages.createJobsAppPages.to,
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
			path: appPages.AgencyAdmin.clientsAppPages.subPages.clientProfileAppPages.to,
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
			path: appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages.to,
			element: <ConnectCRMPage />,
		},
		{
			path: appPages.AgencyAdmin.settingAppPages.subPages.subcriptionAppPages.to,
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
		{ path: '*', element: <NotFoundPage /> },
	],
	SuperAdmin: [
		{
			path: appPages.SuperAdmin.dashboardAppPages.to,
			element: <SuperAdminDashboardPage />,
		},

		{
			path: appPages.SuperAdmin.recruiterAppPages.to,
			element: <SuperAdminRecruitersPage />,
		},

		{
			path: appPages.SuperAdmin.recruiterAppPages.subPages.recruiterProfilePage.to,
			element: <SuperAdminRecruiterProfilePage />,
		},

		{
			path: appPages.SuperAdmin.candidatesAppPages.to,
			element: <SuperAdminCandidatesPage />,
		},

		{
			path: appPages.SuperAdmin.candidatesAppPages.subPages.cadidateProfileAppPage.to,
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
			path: appPages.SuperAdmin.clientsAppPages.subPages.clientProfileAppPages.to,
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
			path: appPages.SuperAdmin.settingAppPages.subPages.subcriptionAppPages.to,
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
		
		{ path: '*', element: <NotFoundPage /> },
	],

	default: [
		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.signupPage.to, element: <SignupPage /> },
		{ path: authPages.userPasswrodSet.to, element: <SetUserPassword /> },
		{ path: authPages.userVerify.to, element: <UserVerificationPage /> },

		{ path: '*', element: <NotFoundPage /> },
	],

	
};
export default contentRoutes;
