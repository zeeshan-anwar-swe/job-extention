import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import contentRoutes from '../../routes/contentRoutes';
import PageWrapper from '../layouts/PageWrapper/PageWrapper';
import Container from '../layouts/Container/Container';
import Subheader, { SubheaderLeft, SubheaderRight } from '../layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../layouts/Header/Header';
import Card from '../ui/Card';
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
