import Badge from '../../../../../components/ui/Badge';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../../../hooks/useImageValidation';

const TableDataPartial = ({
	imageUrl,
	title,
	subTitle,
	status,
}: {
	imageUrl?: string;
	title?: string;
	subTitle?: string;
	status?: string;
}) => {
	const { loading, imageUrl: image } = useImageValidation(imageUrl);

	return (
		<div className='flex items-center gap-x-6'>
			{imageUrl && (
				<ImageLoaderWraper loading={loading} height='h-14'>
					<img
						className='aspect-square w-14 rounded-full'
						src={image}
						alt='cadidate-image'
					/>
				</ImageLoaderWraper>
			)}
			<div>
				{title && <h5>{title}</h5>}
				{subTitle && <p>{subTitle}</p>}
				{status && (
					<Badge variant='solid' color='amber' colorIntensity='100'>
						{status}
					</Badge>
				)}
			</div>
		</div>
	);
};

export default TableDataPartial;
