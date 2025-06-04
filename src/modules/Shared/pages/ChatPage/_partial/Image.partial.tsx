import React from 'react';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import { Image } from 'antd';
import { cn } from '../../../../../utils/cn';

export const ViewableImagePartial = ({
	url,
	height,
    className,
}: {
	url: string | undefined | null;
	height: string;
    className?: string
}) => {
	const { loading, imageUrl } = useImageValidation(url);

	return (
		<ImageLoaderWraper loading={loading} height={height}>
            <Image
                src={imageUrl}
                className={cn('object-cover', className)}
                />
		</ImageLoaderWraper>
	);
};
