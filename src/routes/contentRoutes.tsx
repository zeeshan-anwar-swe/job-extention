import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import LoginPage from '../modules/AgencyAdmin.module/pages/LoginPage/Login.page';
import SignupPage from '../modules/AgencyAdmin.module/pages/Signup.page';
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
import RecruitersPage from '../modules/Team.module/pages/Recruiter/Recruiter.page';
import ChatWithRecruiterPage from '../modules/Team.module/pages/ChatPage/Chat.page';
import TestPage from '../modules/Shared/pages/TestPage/Test.page';

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
}

const contentRoutes: ContentRoutesType = {
	AgencyAdmin: [
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
		{path:'test', element: <TestPage />},

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

		{ path: '*', element: <NotFoundPage /> },
	],
	Team: [
		{
			path: appPages.Team.dashboardAppPages.to,
			element: <h1>Team Dashboard</h1>,
		},

		{
			path: appPages.Team.recruiterAppPages.to,
			element: <RecruitersPage />,
		},

		{
			path: appPages.Team.chatPage.to,
			element: <ChatWithRecruiterPage />,
		},

		
		{ path: authPages.loginPage.to, element: <LoginPage /> },
		{ path: authPages.ssoWaitingPage.to, element: <SSOWaitingPage /> },

		{ path: authPages.signupPage.to, element: <SignupPage /> },

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

		{ path: '*', element: <NotFoundPage /> },
	],
	SuperAdmin: [
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

		{ path: '*', element: <NotFoundPage /> },
	],
};
export default contentRoutes;
