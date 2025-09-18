import useImageValidation from '../../../../../../hooks/useImageValidation';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	imageUrl,
	title,
	subTitle,
	className,
}: {
	imageUrl?: string;
	title?: string;
	subTitle?: string;
	className?: string;
}) => {
		const {imageUrl:image} = useImageValidation(imageUrl);

	return (
		<div className={'flex items-center justify-center gap-x-6 ' + className}>
			<img
				className='aspect-square w-10 rounded-full'
				src={image}
				alt='cadidate-image'
			/>
			<div className='break-all'>
				<h5>{textValidationCheck(title)}</h5>
				<p>{textValidationCheck(subTitle)}</p>
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
