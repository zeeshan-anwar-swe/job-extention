import { RouteProps } from 'react-router-dom';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';
import { appPages, authPages } from '../config/pages.config';
import { Roles } from '../constants/role.enums';
import { TeamAsideTemplate } from '../templates/layouts/Asides/TeamAside.template';
import SuperAdminAsideTemplate from '../templates/layouts/Asides/SuperAdminAside.template';

const AgencyRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: 'signin', element: null },
	{ path: authPages.ssoWaitingPage.to, element: null },
	{ path: authPages.signupPage.to+"/*", element: null },
	{ path: authPages.userVerify.to+"/*", element: null },
	{ path: authPages.userPasswrodSet.to+"/*", element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	{ path: '*', element: <DefaultAsideTemplate /> },
];

const TeamRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: 'signin', element: null },
	{ path: authPages.ssoWaitingPage.to, element: null },
	{ path: authPages.userVerify.to+"/*", element: null },
	{ path: authPages.signupPage.to+"/*", element: null },
	{ path: authPages.userPasswrodSet.to+"/*", element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	{ path: '*', element: <TeamAsideTemplate /> },
];

const SuperAdminRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: 'signin', element: null },
	{ path: "/test", element: null },

	{ path: authPages.ssoWaitingPage.to, element: null },
	{ path: authPages.signupPage.to+"/*", element: null },
	{ path: authPages.userVerify.to+"/*", element: null },
	{ path: authPages.userPasswrodSet.to+"/*", element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	{ path: '*', element: <SuperAdminAsideTemplate /> },
];

const asideRoutes = {
	[Roles.TEAM]: TeamRoutes,
	[Roles.ADMIN]: AgencyRoutes,
	[Roles.CLIENT]: AgencyRoutes,
	[Roles.AGENCY_ADMIN]: AgencyRoutes,
	[Roles.SUPER_ADMIN]: SuperAdminRoutes,
};

export default asideRoutes;
