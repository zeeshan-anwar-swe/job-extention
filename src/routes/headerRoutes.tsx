import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultHeaderTemplate from '../templates/layouts/Headers/DefaultHeader.template';
import { appPages, authPages, componentsPages } from '../config/pages.config';
import ComponentAndTemplateHeaderTemplate from '../templates/layouts/Headers/ComponentAndTemplateHeader.template';

const headerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.signupPage.to, element: null },
	{
		path: `${componentsPages.uiPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: `${appPages.candidatesAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.settingAppPages.to}`,
		element: null,
	},
	{
		path: `${appPages.jobsAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.clientsAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.taskBoardAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.reportAndAnalyticsAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.aiInterviewAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.manageTeamAppPages.to}/*`,
		element: null,
	},
	{
		path: `${appPages.KoalaByteAssistantAppPages.to}/*`,
		element: null,
	},
	{
		path: `${componentsPages.formPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: `${componentsPages.integratedPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: appPages.projectAppPages.subPages.projectDashboardPage.to,
		element: null,
	},
	{
		path: '',
		element: null,
	},
	{ path: '*', element: null },
	{ path: appPages.pamentAppPages.to, element: null },
];

export default headerRoutes;
