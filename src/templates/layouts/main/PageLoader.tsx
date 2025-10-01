import React, { ReactNode } from 'react';
import Loader from '../../../components/ui/Loader';
import Error from '../../../components/ui/Error';
import EmptyData from '../../../components/ui/EmptyData';
import ShimmerEffectPageLoader from '../../../components/layouts/PageLoader/ShimmerEffectPageLoader';
import CircleLoader from '../../../components/layouts/PageLoader/CircleLoader';
import ApexLineChartSkeleton from '../../../components/layouts/PageLoader/LineChartShimmer';
import { TIcons } from '../../../types/icons.type';

interface WrapperProps {
	data: any;
	loading: boolean;
	messageForEmptyData?: string;
	children: ReactNode;
	error: Error | null;
	shimmer?: boolean;
	emptyDataIcon?:TIcons
}

const PageLoader: React.FC<WrapperProps> = ({
	children,
	messageForEmptyData,
	shimmer = false,
	loading = true,
	error = null,
	data = null,
	emptyDataIcon
}) => {
	if (loading) {
		return shimmer ? <ApexLineChartSkeleton /> : <CircleLoader />;
	} else if (error) {
		return <Error color='red' size='text-5xl' message={error.message} />;
	} else if (!data || data.length === 0) {
		return <EmptyData icon={emptyDataIcon} size='text-5xl' message={messageForEmptyData} />;
	} else {
		return <>{children}</>;
	}
};

export default PageLoader;
