import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import Card from '../../../../../../components/ui/Card';
import Badge from '../../../../../../components/ui/Badge';
import Button from '../../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { AssignJobModalPartial } from '../../../../common/AssignJobModal/Modal.partial';
import { assignJobToTeamMember, unAssignJobToTeamMember } from '../../../../../../store/slices/Team.slice';

const HeaderPartial = ({ state }: any) => {
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
			<AssignJobModalPartial
				title={`Assign Jobs to team member: ${teamMemberProfile?.team?.firstName ?? ''}`}
				assignToModule='teamMember'
				jobAssignAction={assignJobToTeamMember}
				unAssignAction={unAssignJobToTeamMember}
				assignTo={state.id}
				setModal={setModal}
				modal={modal}
			/>
		</Card>
	);
};

export default HeaderPartial;
