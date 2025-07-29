import { Link } from 'react-router-dom';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import {  ClientListItemTypeSuperAdmin } from '../../../../../types/slices.type/clients.slice.type';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import { cn } from '../../../../../utils/cn';

const TableDataProfilePartial = ({ client, inviteBy }: { client?: ClientListItemTypeSuperAdmin; inviteBy?: ClientListItemTypeSuperAdmin }) => {
	const { loading, imageUrl } = useImageValidation(inviteBy? inviteBy.invitedBy.image : client?.clientUser.image);
	return (
		<div
			className={cn('flex items-center gap-x-6 max-lg:flex-col', inviteBy ? 'justify-center' : 'justify-start')}>
			<ImageLoaderWraper height='h-14' loading={loading}>
				<img
					className='aspect-square w-14 rounded-full object-cover'
					src={imageUrl}
					alt='cadidate-image'
				/>
			</ImageLoaderWraper>
			<div>
				<h5 className='break-all'>{textValidationCheck(inviteBy? inviteBy.invitedBy.firstName +" "+inviteBy.invitedBy.lastName  : client?.clientUser?.firstName +" "+client?.clientUser?.lastName)}</h5>
				{!inviteBy &&<p className='break-all'>{textValidationCheck(client?.clientUser.email)}</p>}
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
