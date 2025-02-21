import Badge from '../../../components/ui/Badge';

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
	return (
		<div className='flex items-center justify-center gap-x-6'>
			{imageUrl && (
				<img
					className='aspect-square w-14 rounded-full'
					src={imageUrl}
					alt='cadidate-image'
				/>
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
