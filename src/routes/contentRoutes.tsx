import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/Login.page';
import SignupPage from '../pages/Signup.page';
import NotFoundPage from '../pages/NotFound.page';
import { appPages, authPages } from '../config/pages.config';
import CandidatesProfilePage from '../pages/CandidatesPage/CandidateProfile/CandidatesProfile.page';
import CandidateCVEditPage from '../pages/CandidatesPage/CandidateCVEdit/CandidateCVEdit.page';
import JobsViewCandidatesPage from '../pages/Jobs/JobsViewCadidates/JobsViewCandidates.page';
import JobsCreateNewJobPage from '../pages/Jobs/JobsCreateNewJob/JobsCreateNewJob.page';
import ClientsPage from '../pages/ClientsPage/Clients.page';
import ClientProfilePage from '../pages/ClientsPage/ClientProfile/ClientProfile.page';
import TaskboardPage from '../pages/TaskboardPages/Taskboard.page';
import KoolabyteAssistantPage from '../pages/KoolabyteAssistantPage/KoolabyteAssistant.page';
import ReportAndAnalyticsPage from '../pages/ReportAndAnalyticsPage/ReportAndAnalytics.page';
import ManageTeamPage from '../pages/ManageTeamPage/ManageTeam.page';
import TeammateProfilePage from '../pages/ManageTeamPage/TeammateProfilePage/TeammateProfile.page';
import ChatPage from '../pages/ManageTeamPage/ChatPage/Chat.page';
import ApexChartsPage from '../pages/ApexChartsPage/ApexCharts.page';
import SettingPage from '../pages/SettingPage/Setting.page';
import ConnectCRMPage from '../pages/SettingPage/ConnectCRMPage/ConnectCRM.page';
import SubcriptionPage from '../pages/SettingPage/SubcriptionPage/Subcription.page';
import PaymentPage from '../pages/PaymentPage/Payment.page';

const DashboardPage = lazy(() => import('../pages/DashboardPage/Dashboard.page'));
const CandidatesPage = lazy(() => import('../pages/CandidatesPage/Candidates.page'));
const JobsPage = lazy(() => import('../pages/Jobs/Jobs.page'));

const ProjectDashboardPage = lazy(
	() => import('../pages/project/ProjectDashboardPage/ProjectDashboard.page'),
);
const ProjectBoardPage = lazy(() => import('../pages/project/ProjectBoardPage/ProjectBoard.page'));

const contentRoutes: RouteProps[] = [
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
		path: `charts`,
		element: <ApexChartsPage />,
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

	{
		path: appPages.AgencyAdmin.projectAppPages.subPages.projectDashboardPage.to,
		element: <ProjectDashboardPage />,
	},
	{
		path: `${appPages.AgencyAdmin.projectAppPages.subPages.projectBoardPageLink.to}/:id`,
		element: <ProjectBoardPage />,
	},

	{ path: authPages.loginPage.to, element: <LoginPage /> },
	{ path: authPages.signupPage.to, element: <SignupPage /> },

	{ path: '*', element: <NotFoundPage /> },
];

export default contentRoutes;
