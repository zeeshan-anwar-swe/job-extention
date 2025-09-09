import { RouteProps } from 'react-router-dom';
import { appPages, authPages, LandingPages } from '../config/pages.config';

const leadingPagesRoutes = Object.values(LandingPages).map(({ to }) => ({
	path: to,
	element: null,
}));

const headerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.signupPage.to, element: null },
	{ path: authPages.ssoWaitingPage.to, element: null },



	{
		path: `${appPages.AgencyAdmin.candidatesAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.settingAppPages.to}`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.jobsAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.clientsAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.taskBoardAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.reportAndAnalyticsAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.aiInterviewAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.manageTeamAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.AgencyAdmin.KoalaByteAssistantAppPages.to}/*`,
		element: null,
	},

	{
		path: '',
		element: null,
	},
	{ path: '*', element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	...leadingPagesRoutes,
];

export default headerRoutes;
