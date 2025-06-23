import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import { AssignJobModalPartial } from '../../../common/AssignJobModal/Modal.partial';
import { assignJobToTeamMember, unAssignJobToTeamMember } from '../../../../../store/slices/Team.slice';

const TableDataActionsPartial = ({ teamMember }: { teamMember: any }) => {
	const [modal, setModal] = useState<boolean>(false);
	const navigateTo = useNavigate();
	console.log({teamMember});
	
	return (
		<div className='flex justify-center'>
			<Button onClick={() => navigateTo(`/chat/${teamMember.user.id}`, { state: {userName: teamMember.user.name, userId: teamMember.user.id} })}>
				Message
			</Button>
			<Button onClick={() => setModal(true)}>Assign Job</Button>
			<Button>Remove Member</Button>
			<AssignJobModalPartial
				title={`Assign Jobs to a team member: ${teamMember?.user.name ?? ''}`}
				assignToModule='teamMember'
				modal={modal}
				unAssignAction={unAssignJobToTeamMember}
				setModal={setModal}
				assignTo={teamMember.id}
				jobAssignAction={assignJobToTeamMember}
			/>
		</div>
	);
};

export default TableDataActionsPartial;
