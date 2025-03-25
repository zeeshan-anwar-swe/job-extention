import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useState } from 'react';
import AssignJobToClientModalPartial from './AssignJobToClientModal.partial';

const TableDataActionsPartial = ({ candidate }: { candidate: any }) => {
	const [clientModal, selectedDate] = useState<boolean>(false);
	return (
		<>
			<div className='flex justify-center'>
				<Button onClick={() => selectedDate(true)}>Assign to Client</Button>
				<Link to={`/candidates/cv-edit/${candidate.id}`}>
					<Button>Edit CV</Button>
				</Link>
				<Link to={`/candidates/profile/${candidate.id}`}>
					<Button>View CV</Button>
				</Link>
				<Button>Remove Candidate</Button>
			</div>
			<AssignJobToClientModalPartial modal={clientModal} setModal={selectedDate} />
		</>
	);
};

export default TableDataActionsPartial;
