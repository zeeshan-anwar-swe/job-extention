import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { AssignJobToTeamMemberModalPartial } from '../../_partial/AssignJob.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	const { state } = useLocation();

	const { teamMemberProfile } = useSelector((state: RootState) => state.team);

	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<div className='flex items-center gap-x-8'>
					<TableDataProfilePartial
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
			<AssignJobToTeamMemberModalPartial
				teamMember={state}
				setModal={setModal}
				modal={modal}
			/>
		</Card>
	);
};

export default HeaderPartial;
