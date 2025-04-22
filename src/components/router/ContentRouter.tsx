import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import contentRoutes from '../../routes/contentRoutes';
import ShimmerEffectPageLoader from '../layouts/PageLoader/ShimmerEffectPageLoader';

const ContentRouter = () => {
	return (
		<Suspense fallback={<ShimmerEffectPageLoader />}>
			<Routes>
				{contentRoutes.map((routeProps) => (
					<Route key={routeProps.path} {...routeProps} />
				))}
			</Routes>
		</Suspense>
	);
};

export default ContentRouter;
