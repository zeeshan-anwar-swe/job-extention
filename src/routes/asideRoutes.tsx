import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';
import { appPages, authPages } from '../config/pages.config';

const asideRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.signupPage.to, element: null },
	{ path: appPages.pamentAppPages.to, element: null },
	{ path: '*', element: <DefaultAsideTemplate /> },
];

export default asideRoutes;
