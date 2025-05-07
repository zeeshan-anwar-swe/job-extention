import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';

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
			
		</div>
	);
};

export default TableDataActionsPartial;
