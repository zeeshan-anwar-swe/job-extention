import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';

const TableDataActionsPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<div className='flex justify-center'>
			<Link to='/manage-team/chat'>
				<Button>Message</Button>
			</Link>

			<Button onClick={() => setModal(true)}>Assign Job</Button>
			<Button>Remove Member</Button>
			<AssignJobModalPartial modal={modal} setModal={setModal} />
		</div>
	);
};

export default TableDataActionsPartial;
