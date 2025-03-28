import React, { ReactNode } from 'react';
import Loader from '../../../components/ui/Loader';
import Error from '../../../components/ui/Error';
import EmptyData from '../../../components/ui/EmptyData';

interface WrapperProps {
	children: ReactNode;
	loading: boolean;
	error: Error | null;
	data: any[];
}

const MainLoader: React.FC<WrapperProps> = ({
	children,
	loading = true,
	error = null,
	data = [],
}) => {
	if (loading) {
		return <Loader size='text-5xl' />;
	} else if (error) {
		return <Error color='red' size='text-5xl' message={error.message} />;
	} else if (data.length === 0) {
		return <EmptyData size='text-5xl' message='No data found' />;
	} else {
		return <>{children}</>;
	}
};

export default MainLoader;
