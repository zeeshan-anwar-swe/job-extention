import React, { ReactNode } from 'react';
import Loader from '../../../components/ui/Loader';
import Error from '../../../components/ui/Error';
import EmptyData from '../../../components/ui/EmptyData';
import ShimmerEffectPageLoader from '../../../components/layouts/PageLoader/ShimmerEffectPageLoader';

interface WrapperProps {
	children: ReactNode;
	loading: boolean;
	error: Error | null;
	data: any;
}

const PageLoader: React.FC<WrapperProps> = ({
	children,
	loading = true,
	error = null,
	data = null,
}) => {
	if (loading) {
		return <ShimmerEffectPageLoader />;
	} else if (error) {
		return <Error color='red' size='text-5xl' message={error.message} />;
	} else if (!data) {
		return <EmptyData size='text-5xl' message='No data found' />;
	} else {
		return <>{children}</>;
	}
};

export default PageLoader;
