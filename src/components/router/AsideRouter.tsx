import React from 'react';
import { Route, Routes } from 'react-router-dom';
import asideRoutes from '../../routes/asideRoutes';
import { useAuth } from '../../context/authContext';

const AsideRouter = () => {
	const {userStorage} = useAuth();

	return (
		<Routes>
			{asideRoutes[userStorage.role].map((routeProps) => (
				<Route key={routeProps.path} {...routeProps} />
			))}
		</Routes>
	);
};

export default AsideRouter;
