import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import contentRoutes from '../../routes/contentRoutes';
import ShimmerEffectPageLoader from '../layouts/PageLoader/ShimmerEffectPageLoader';
import { useAuth } from '../../context/authContext';
import { Roles } from '../../constants/role.enums';

const ContentRouter = () => {
	const { userStorage } = useAuth();
	return (
		<Suspense fallback={<ShimmerEffectPageLoader />}>
			<Routes>
				{contentRoutes[userStorage.role].map((routeProps) => (
					<Route key={routeProps.path} {...routeProps} />
				))}
			</Routes>
		</Suspense>
	);
};

export default ContentRouter;
