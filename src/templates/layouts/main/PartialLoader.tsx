import React, { ReactNode } from 'react';
import Error from '../../../components/ui/Error';
import EmptyData from '../../../components/ui/EmptyData';
import CircleLoader from '../../../components/layouts/PageLoader/CircleLoader';

interface WrapperProps {
	data: any;
	loading: boolean;
	messageForEmptyData?: string;
	children: ReactNode;
	error: Error | null;
}

const PartialLoader: React.FC<WrapperProps> = ({
	children,
	messageForEmptyData,
	loading = true,
	error = null,
	data = null,
}) => {
	if (loading) {
		return  <CircleLoader />;
	} else if (error) {
		return <Error color='red' size='text-5xl' message={error.message} />;
	} else if (!data || data.length === 0) {
		return <EmptyData size='text-5xl' message={messageForEmptyData} />;
	} else {
		return <>{children}</>;
	}
};

export default PartialLoader;
