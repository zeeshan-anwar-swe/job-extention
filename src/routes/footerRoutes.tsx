import { RouteProps } from 'react-router-dom';
import DefaultFooterTemplate from '../templates/layouts/Footers/DefaultFooter.template';
import { appPages, authPages } from '../config/pages.config';

const footerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.signupPage.to, element: null },
	{ path: appPages.Team.chatPage.to, element: null },
	{ path: "/test", element: null },
	{ path: '*', element: <DefaultFooterTemplate /> },
];

export default footerRoutes;
