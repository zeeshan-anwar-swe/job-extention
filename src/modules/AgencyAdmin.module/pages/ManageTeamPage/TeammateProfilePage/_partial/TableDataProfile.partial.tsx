import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	image,
	title,
	subTitle,
	className,
}: {
	image?: string;
	title?: string;
	subTitle?: string;
	className?: string;
}) => {
	const { loading, imageUrl } = useImageValidation(image);

	return (
		<div className={'flex items-center justify-center gap-x-6 ' + className}>
			<ImageLoaderWraper loading={loading} height='h-14'>
				<img
					className='aspect-square w-14 rounded-full object-cover'
					src={imageUrl}
					alt='cadidate-image'
				/>
			</ImageLoaderWraper>
			<div>
				<h5>{textValidationCheck(title)}</h5>
				<p>{textValidationCheck(subTitle)}</p>
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
