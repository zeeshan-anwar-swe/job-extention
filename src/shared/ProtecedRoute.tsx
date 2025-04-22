import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { Roles } from '../constants/role.enums';

interface ProtectedRouteProps {
	allowedRoles: Roles[];
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
	const { userStorage } = useAuth();
	const location = useLocation();

	if (!userStorage) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	if (!allowedRoles.includes(userStorage.role as Roles)) {
		return <Navigate to='/unauthorized' replace />;
	}

	return children;
};

export default ProtectedRoute;
