import { Link } from 'react-router-dom';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';

const TableDataProfilePartial = ({ client }: { client: ClientListItemType }) => {
	const { loading, imageUrl } = useImageValidation(client?.image);
	return (
		<Link
			to='/clients/profile'
			state={client}
			className='flex items-center justify-start gap-x-6 max-lg:flex-col'>
			<ImageLoaderWraper height='h-14' loading={loading}>
				<img
					className='aspect-square w-14 rounded-full object-cover'
					src={imageUrl}
					alt='cadidate-image'
				/>
			</ImageLoaderWraper>
			<div>
				<h5 className='break-all'>{textValidationCheck(client?.name)}</h5>
				<p className='break-all'>{textValidationCheck(client?.email)}</p>
			</div>
		</Link>
	);
};

export default TableDataProfilePartial;
