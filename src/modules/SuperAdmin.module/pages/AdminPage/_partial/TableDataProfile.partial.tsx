import { CardSubTitle, CardTitle } from '../../../../../components/ui/Card';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	imageUrl,
	title,
	subTitle,
}: {
	imageUrl?: string;
	title?: string;
	subTitle?: string;
}) => {
	return (
		<div className='flex items-center justify-center gap-x-4'>
			<img
				className='aspect-square w-12 rounded-full'
				src={profileImageUrlValidationCheck(imageUrl)}
				alt='cadidate-image'
			/>

			<div>
				<CardTitle className='text-base font-medium'>
					{textValidationCheck(title)}
				</CardTitle>
				{subTitle && <CardSubTitle>{textValidationCheck(subTitle)}</CardSubTitle>}
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
