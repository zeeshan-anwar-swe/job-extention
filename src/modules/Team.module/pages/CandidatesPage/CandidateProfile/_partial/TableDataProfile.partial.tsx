import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
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
	const { loading, imageUrl: image } = useImageValidation(imageUrl);
	return (
		<div className={'flex items-center justify-center gap-x-6 ' + className}>
			<ImageLoaderWraper loading={loading} height='h-14'>
				<img
					className='aspect-square w-14 rounded-full'
					src={image}
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
