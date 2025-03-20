import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { authPages } from '../../../config/pages.config';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import toast from 'react-hot-toast';

interface IPageWrapperProps {
	children: ReactNode;
	className?: string;
	isProtectedRoute?: boolean;
	title?: string;
	name?: string;
}
const PageWrapper: FC<IPageWrapperProps> = (props) => {
	const { children, className, isProtectedRoute, title, name, ...rest } = props;

	useDocumentTitle({ title, name });

	const { userTokenStorage } = useAuth();
	if (isProtectedRoute && !userTokenStorage) {
		// user is not authenticated
		return <Navigate to={authPages.loginPage.to} />;
	}
	return (
		<main
			data-component-name='PageWrapper'
			className={classNames('flex shrink-0 grow flex-col', className)}
			{...rest}>
			{children}
		</main>
	);
};
PageWrapper.defaultProps = {
	className: undefined,
	isProtectedRoute: true,
	title: undefined,
	name: undefined,
};

export default PageWrapper;
