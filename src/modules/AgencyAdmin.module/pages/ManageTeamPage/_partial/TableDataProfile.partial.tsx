import { Link } from 'react-router-dom';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';

const TableDataProfilePartial = ({
	id,
	image,
	title,
	subTitle,
}: {
	id: string;
	image?: string;
	title?: string;
	subTitle?: string;
}) => {
	const { loading, imageUrl } = useImageValidation(image);

	return (
		<Link
			to='/manage-team/profile'
			state={{ id }}
			className='flex items-center justify-center gap-x-6'>
			<ImageLoaderWraper height='h-14' loading={loading}>
				<img
					className='aspect-square w-14 rounded-full object-cover'
					src={imageUrl}
					alt='cadidate-image'
				/>
			</ImageLoaderWraper>
			<div>
				<h5>{textValidationCheck(title)}</h5>
				<p className='break-all'>{textValidationCheck(subTitle)}</p>
			</div>
		</Link>
	);
};

export default TableDataProfilePartial;
