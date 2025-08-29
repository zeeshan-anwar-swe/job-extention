import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../../../hooks/useImageValidation';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	image,
	title,
	subTitle,
}: {
	image?: string;
	title?: string;
	subTitle?: string;
}) => {
	const { imageUrl, loading } = useImageValidation(image);
	return (
		<div className='w-fit flex items-center gap-x-6 max-lg:justify-center'>
			<ImageLoaderWraper loading={loading} height='h-14'>
				<img
					className='aspect-square w-14 rounded-full'
					src={imageUrl}
					alt='cadidate-image'
				/>
			</ImageLoaderWraper>
			<div>
				<h5 className='break-all'>{textValidationCheck(title)}</h5>
				<p className='break-all'>{textValidationCheck(subTitle)}</p>
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
