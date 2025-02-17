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
/**
 * SALES
 */
const SalesDashboardPage = lazy(
	() => import('../pages/sales/SalesDashboardPage/SalesDashboard.page'),
);

const CandidatesPage = lazy(() => import('../pages/CandidatesPage/Candidates.page'));

const ProductListPage = lazy(
	() => import('../pages/sales/products/ProductListPage/ProductList.page'),
);
const ProductPage = lazy(() => import('../pages/sales/products/ProductPage/Product.page'));
const CategoryListPage = lazy(
	() => import('../pages/sales/categories/CategoryListPage/CategoryList.page'),
);
const CategoryPage = lazy(() => import('../pages/sales/categories/CategoryPage/Category.page'));

/**
 * Project
 */
const ProjectDashboardPage = lazy(
	() => import('../pages/project/ProjectDashboardPage/ProjectDashboard.page'),
);
const ProjectBoardPage = lazy(() => import('../pages/project/ProjectBoardPage/ProjectBoard.page'));

const contentRoutes: RouteProps[] = [
	/**
	 * SALES::BEGIN
	 */
	{
		path: appPages.salesAppPages.subPages.salesDashboardPage.to,
		element: <SalesDashboardPage />,
	},
	{
		path: appPages.salesAppPages.subPages.productPage.subPages.listPage.to,
		element: <ProductListPage />,
	},
	{
		path: `${appPages.salesAppPages.subPages.productPage.subPages.editPageLink.to}/:id`,
		element: <ProductPage />,
	},
	{
		path: appPages.salesAppPages.subPages.categoryPage.subPages.listPage.to,
		element: <CategoryListPage />,
	},
	{
		path: `${appPages.salesAppPages.subPages.categoryPage.subPages.editPageLink.to}/:id`,
		element: <CategoryPage />,
	},
	/**
	 * SALES::END
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
