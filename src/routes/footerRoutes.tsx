import { RouteProps } from 'react-router-dom';
import DefaultFooterTemplate from '../templates/layouts/Footers/DefaultFooter.template';
import { appPages, authPages, LandingPages } from '../config/pages.config';
import FOOTER from '../modules/Landing.module/pages/_partial/FOOTER';

const landingPagesRoutes = Object.values(LandingPages).map(({ to }) => ({
	path: to,
	element: <FOOTER/>,
}));

const footerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.signupPage.to, element: null },
	{ path: appPages.Team.chatPage.to, element: null },
	...landingPagesRoutes,
	{ path: '*', element: <DefaultFooterTemplate /> },
];

export default footerRoutes;
