import { Link } from 'react-router-dom';
import Badge from '../../../components/ui/Badge';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../utils/validationCheck';

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
		<Link to='/manage-team/profile' className='flex items-center justify-center gap-x-6'>
			<img
				className='aspect-square w-14 rounded-full'
				src={profileImageUrlValidationCheck(imageUrl)}
				alt='cadidate-image'
			/>
			<div>
				<h5>{textValidationCheck(title)}</h5>
				<p className='break-all'>{textValidationCheck(subTitle)}</p>
			</div>
		</Link>
	);
};

export default TableDataProfilePartial;
