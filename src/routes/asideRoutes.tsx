import { RouteProps } from 'react-router-dom';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';
import { appPages, authPages, LandingPages } from '../config/pages.config';
import { Roles } from '../constants/role.enums';
import { TeamAsideTemplate } from '../templates/layouts/Asides/TeamAside.template';
import SuperAdminAsideTemplate from '../templates/layouts/Asides/SuperAdminAside.template';
import HEADER from '../modules/Landing.module/pages/_partial/HEADER';

const leadingPagesRoutes = Object.values(LandingPages).map(({ to }) => ({
	path: to,
	element: <HEADER/>,
}));

const AgencyRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: 'signin', element: null },
	{ path: authPages.ssoWaitingPage.to, element: null },
	{ path: authPages.signupPage.to + '/*', element: null },
	{ path: authPages.userVerify.to + '/*', element: null },
	{ path: authPages.userPasswrodSet.to + '/*', element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	{ path: '*', element: <DefaultAsideTemplate /> },
	...leadingPagesRoutes,
];

const TeamRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: 'signin', element: null },
	{ path: authPages.ssoWaitingPage.to, element: null },
	{ path: authPages.userVerify.to + '/*', element: null },
	{ path: authPages.signupPage.to + '/*', element: null },
	{ path: authPages.userPasswrodSet.to + '/*', element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	{ path: '*', element: <TeamAsideTemplate /> },
	...leadingPagesRoutes,
];

const SuperAdminRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: 'signin', element: null },
	{ path: authPages.ssoWaitingPage.to, element: null },
	{ path: authPages.signupPage.to + '/*', element: null },
	{ path: authPages.userVerify.to + '/*', element: null },
	{ path: authPages.userPasswrodSet.to + '/*', element: null },
	{ path: appPages.AgencyAdmin.pamentAppPages.to, element: null },
	{ path: '*', element: <SuperAdminAsideTemplate /> },
	...leadingPagesRoutes,
];

const asideRoutes = {
	[Roles.TEAM]: TeamRoutes,
	[Roles.ADMIN]: AgencyRoutes,
	[Roles.CLIENT]: AgencyRoutes,
	[Roles.AGENCY_ADMIN]: AgencyRoutes,
	[Roles.SUPER_ADMIN]: SuperAdminRoutes,
};

export default asideRoutes;
