import { useState } from 'react';
import Card from '../../../../../../components/ui/Card';
import Badge from '../../../../../../components/ui/Badge';
import Button from '../../../../../../components/ui/Button';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import { ClientDetailsType } from '../../../../../../types/slices.type/clients.slice.type';
import { AssignJobModalPartial } from '../../../../common/AssignJobModal/Modal.partial';
import { assignJobToClient, getClientDetails } from '../../../../../../store/slices/Client.slice';
import { AppDispatch } from '../../../../../../store';
import { useDispatch } from 'react-redux';

const HeaderPartial = ({
	clientDetails,
	state,
}: {
	clientDetails: ClientDetailsType;
	state: any;
}) => {
	const [modal, setModal] = useState<boolean>(false);
	const { loading, imageUrl } = useImageValidation(clientDetails?.clientUser.image);

	const dispatch: AppDispatch = useDispatch();
	const refreshData = () => {
		dispatch(getClientDetails(state?.id));
	};

	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<div className={'flex items-center justify-center gap-x-6 '}>
					<ImageLoaderWraper loading={loading} height='h-14'>
						<img
							alt='profile image'
							className='aspect-square w-14 rounded-full object-cover'
							src={imageUrl}
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
						{Number(state?.hiringRate)}% Hiring Percentage
					</Badge>
					<Button
						onClick={() => setModal(true)}
						className='h-fit max-sm:w-full'
						variant='solid'>
						Assign a job
					</Button>
				</div>
			</div>
			<AssignJobModalPartial
				title={`Assign Jobs to client: ${clientDetails?.clientUser?.firstName ?? ''}`}
				assignToModule='client'
				refreshData={refreshData}
				modal={modal}
				setModal={setModal}
				assignTo={clientDetails?.id}
				jobAssignAction={assignJobToClient}
			/>
		</Card>
	);
};

export default HeaderPartial;
