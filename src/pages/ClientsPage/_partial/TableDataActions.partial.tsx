import { useState } from 'react';
import Button from '../../../components/ui/Button';
import AssignJobModalPartial from './AssignJob.partial';

const TableDataActionsPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<div className='flex justify-center'>
			<Button color='blue'>View Jobs</Button>
			<Button onClick={() => setModal(true)}>Assign A job</Button>
			<Button onClick={() => setModal(true)}>Assign to a Team Member</Button>
			<Button>Remove Client</Button>
			<AssignJobModalPartial modal={modal} setModal={setModal} />
		</div>
	);
};

export default TableDataActionsPartial;
