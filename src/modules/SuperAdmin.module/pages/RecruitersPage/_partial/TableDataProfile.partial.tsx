import useImageValidation from '../../../../../hooks/useImageValidation';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	imageUrl,
	title,
	subTitle,
}: {
	imageUrl?: string| null;
	title?: string;
	subTitle?: string;
}) => {
	const {imageUrl: image} = useImageValidation(imageUrl);
	return (
		<div className='flex items-center gap-x-6'>
			<img
				className='aspect-square w-14 rounded-full'
				src={image}
				alt='cadidate-image'
			/>
			<div>
				<h5>{textValidationCheck(title)}</h5>
				<p className='truncate'>{textValidationCheck(subTitle)}</p>
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
