import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';
import Badge from '../../../../components/ui/Badge';
import { ClientDetailsType } from '../../../../types/slices.type/clients.slice.type';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';
import useImageValidation from '../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../components/ui/ImageLoaderWraper';

const HeaderPartial = ({ clientDetails }: { clientDetails: ClientDetailsType | null }) => {
	console.log({ clientDetails });
	const [modal, setModal] = useState<boolean>(false);
	const { loading, imageUrl } = useImageValidation(clientDetails?.clientUser.image);

	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<div className={'flex items-center justify-center gap-x-6 '}>
					<ImageLoaderWraper loading={loading} height='h-14'>
						<img
							alt='profile image'
							className='aspect-square w-14 rounded-full object-cover'
							src={imageUrl}
							alt='cadidate-image'
						/>
					</ImageLoaderWraper>
					<div>
						<h5>{textValidationCheck(clientDetails?.clientUser.firstName)}</h5>
						<p>{textValidationCheck(clientDetails?.clientUser.email)}</p>
					</div>
				</div>
				<div className='flex flex-wrap justify-end gap-x-4 max-md:gap-2 max-sm:w-full'>
					<Badge
						variant='solid'
						color='amber'
						colorIntensity='300'
						className='!text-amber-950 max-md:p-2  max-sm:w-full'>
						53% Hiring Percentage
					</Badge>
					<Button
						onClick={() => setModal(true)}
						className='h-fit max-sm:w-full'
						variant='solid'>
						Assign a job
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Card>
	);
};

export default HeaderPartial;
