import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import LoginPage from '../pages/Login.page';
import SignupPage from '../pages/Signup.page';
// import NotFoundPage from '../pages/NotFound.page';
import { appPages, authPages } from '../config/pages.config';
import CandidatesProfilePage from '../pages/CandidatesPage/CandidateProfile/CandidatesProfile.page';
import CandidateCVEditPage from '../pages/CandidatesPage/CandidateCVEdit/CandidateCVEdit.page';
import JobsPage from '../pages/Jobs/Jobs.page';
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
/**
 * SALES
 */
const DashboardPage = lazy(() => import('../pages/DashboardPage/Dashboard.page'));

const CandidatesPage = lazy(() => import('../pages/CandidatesPage/Candidates.page'));

/**
 * Project
 */
const ProjectDashboardPage = lazy(
	() => import('../pages/project/ProjectDashboardPage/ProjectDashboard.page'),
);
const ProjectBoardPage = lazy(() => import('../pages/project/ProjectBoardPage/ProjectBoard.page'));

const contentRoutes: RouteProps[] = [
	/**
	 * Dashboard::BEGIN
	 */
	{
		path: appPages.salesAppPages.subPages.salesDashboardPage.to,
		element: <DashboardPage />,
	},

	/**
	 * Dashboard::END
	 */

	/**
	 * Candidates::BEGIN
	 */
	{
		path: appPages.candidatesAppPages.to,
		element: <CandidatesPage />,
	},

	{
		path: `${appPages.candidatesAppPages.subPages.cadidateProfileAppPage.to}/:id`,
		element: <CandidatesProfilePage />,
	},

	{
		path: `charts`,
		element: <ApexChartsPage />,
	},

	{
		path: `${appPages.candidatesAppPages.subPages.candidateCVEditAppPage.to}/:id`,
		element: <CandidateCVEditPage />,
	},

	/**
	 * Candidates::END
	 */

	/**
	 * Jobs::BEGIN
	 */

	{
		path: appPages.jobsAppPages.to,
		element: <JobsPage />,
	},

	{
		path: `${appPages.jobsAppPages.subPages.viewCadidatesAppPages.to}/:id`,
		element: <JobsViewCandidatesPage />,
	},

	{
		path: appPages.jobsAppPages.subPages.createJobsAppPages.to,
		element: <JobsCreateNewJobPage />,
	},

	/**
	 * Jobs::END
	 */

	/**
	 * Clients::BEGIN
	 */

	{
		path: appPages.clientsAppPages.to,
		element: <ClientsPage />,
	},

	{
		path: `${appPages.clientsAppPages.subPages.clientProfileAppPages.to}/:id`,
		element: <ClientProfilePage />,
	},

	{
		path: appPages.clientsAppPages.subPages.clientProfileAppPages.to,
		element: <ClientProfilePage />,
	},

	/**
	 * Clients::END
	 */

	/**
	 * Taskboard::BEGIN
	 */

	{
		path: appPages.taskBoardAppPages.to,
		element: <TaskboardPage />,
	},

	/**
	 * Taskboard::END
	 */

	/**
	 * SettingPage::BEGIN
	 */

	{
		path: appPages.settingAppPages.to,
		element: <SettingPage />,
	},

	/**
	 * SettingPage::END
	 */

	/**
	 * ReportAndAnalytics::BEGIN
	 */

	{
		path: appPages.reportAndAnalyticsAppPages.to,
		element: <ReportAndAnalyticsPage />,
	},

	/**
	 * ReportAndAnalytics::END
	 */

	/**
	 * KoolabyteAssistan::BEGIN
	 */

	{
		path: appPages.KoalaByteAssistantAppPages.to,
		element: <KoolabyteAssistantPage />,
	},

	/**
	 * KoolabyteAssistan::END
	 */

	/**
	 * ManageTeamPage::BEGIN
	 */

	{
		path: appPages.manageTeamAppPages.to,
		element: <ManageTeamPage />,
	},

	{
		path: `${appPages.manageTeamAppPages.subPages.teammateProfileAppPages.to}/:id`,
		element: <TeammateProfilePage />,
	},
	{
		path: `${appPages.manageTeamAppPages.subPages.teammateProfileAppPages.to}`,
		element: <TeammateProfilePage />,
	},
	// {
	// 	path: `${appPages.manageTeamAppPages.subPages.chatAppPage.to}/:id`,
	// 	element: <ChatPage />,
	// },
	{
		path: `${appPages.manageTeamAppPages.subPages.chatAppPage.to}`,
		element: <ChatPage />,
	},

	/**
	 * ManageTeamPage::END
	 */

	/**
	 * Project::BEGIN
	 */
	{
		path: appPages.projectAppPages.subPages.projectDashboardPage.to,
		element: <ProjectDashboardPage />,
	},
	{
		path: `${appPages.projectAppPages.subPages.projectBoardPageLink.to}/:id`,
		element: <ProjectBoardPage />,
	},
	/**
	 * Project::END
	 */

	{ path: authPages.loginPage.to, element: <LoginPage /> },
	{ path: authPages.signupPage.to, element: <SignupPage /> },
];

export default contentRoutes;
