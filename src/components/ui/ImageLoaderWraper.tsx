import React from 'react';
import Button from './Button';

const ImageLoaderWraper = ({
	children,
	loading,
	height,
}: {
	children: React.ReactNode;
	loading: boolean;
	height: string;
}) => {
	return loading ? (
		<Button
			color='zinc'
			variant='outline'
			className={`!flex !aspect-square !items-center !justify-center !${height} !w${height.slice(1)}`}
			isLoading={loading}
			rounded='rounded-full'></Button>
	) : (
		<>{children}</>
	);
};

export default ImageLoaderWraper;
