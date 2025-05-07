import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../../../../store';
import Card from '../../../../../../components/ui/Card';
import Badge from '../../../../../../components/ui/Badge';
import Button from '../../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);

	const { teamMemberProfile } = useSelector((state: RootState) => state.team);

	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<div className='flex items-center gap-x-8'>
					<TableDataProfilePartial
						image={teamMemberProfile?.team?.image}
						title={teamMemberProfile?.team?.firstName}
						subTitle={teamMemberProfile?.team?.email}
					/>

					<Badge
						variant='solid'
						color='amber'
						colorIntensity='300'
						className='p-2  !text-amber-950'>
						53% Job Success
					</Badge>
				</div>
				<div className='flex justify-end gap-x-4 max-md:flex-col max-md:gap-2'>
					<Button onClick={() => setModal(true)} className='h-fit' variant='solid'>
						Assign a job
					</Button>
					<Button className='h-fit' color='red' variant='solid'>
						Remove Member
					</Button>
				</div>
			</div>
			
		</Card>
	);
};

export default HeaderPartial;
