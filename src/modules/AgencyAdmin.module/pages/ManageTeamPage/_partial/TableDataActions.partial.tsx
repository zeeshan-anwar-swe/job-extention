import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import { AssignJobModalPartial } from '../../../common/AssignJobModal/Modal.partial';
import { assignJobToTeamMember } from '../../../../../store/slices/Team.slice';

const TableDataActionsPartial = ({ teamMember }: { teamMember: any }) => {
	const [modal, setModal] = useState<boolean>(false);
	const navigateTo = useNavigate();
	return (
		<div className='flex justify-center'>
			<Button onClick={() => navigateTo(`/manage-team/chat`, { state: teamMember })}>
				Message
			</Button>
			<Button onClick={() => setModal(true)}>Assign Job</Button>
			<Button>Remove Member</Button>
			<AssignJobModalPartial
				title={`Assign Jobs to a team member: ${teamMember?.user.name ?? ''}`}
				assignToModule='teamMember'
				modal={modal}
				setModal={setModal}
				assignTo={teamMember.id}
				jobAssignAction={assignJobToTeamMember}
			/>
		</div>
	);
};

export default TableDataActionsPartial;
