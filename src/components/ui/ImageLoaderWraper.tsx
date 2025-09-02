import React from 'react';
import Button from './Button';
import { cn } from '../../utils/cn';
import { TRounded } from '../../types/rounded.type';

const ImageLoaderWraper = ({
	children,
	loading,
	height,
	className,
	rounded,
}: {
	children: React.ReactNode;
	loading: boolean;
	className?: string;
	rounded?: TRounded;
	height: string;
}) => {
	return loading ? (
		<Button
			color='zinc'
			variant='outline'
			className={cn(
				`!flex  !${height}  !w${height.slice(1)} !items-center !justify-center`,
				className,
			)}
			isLoading={loading}
			rounded={rounded || 'rounded-full'}></Button>
	) : (
		<>{children}</>
	);
};

export default ImageLoaderWraper;
