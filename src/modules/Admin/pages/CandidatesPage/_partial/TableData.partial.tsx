import Badge from '../../../../../components/ui/Badge';
import { profileImageUrlValidationCheck } from '../../../../../utils/validationCheck';

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
		<div className='flex items-center gap-x-6  text-start'>
			{imageUrl && (
				<img
					className='aspect-square w-12 rounded-full max-2xl:w-8 '
					src={profileImageUrlValidationCheck(imageUrl)}
					alt='cadidate-image'
				/>
			)}
			<div>
				{title && <h5 className='break-all font-medium'>{title}</h5>}
				{subTitle && <p className='break-all'>{subTitle}</p>}
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
