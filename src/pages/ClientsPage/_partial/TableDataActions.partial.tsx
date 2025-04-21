import { useState } from 'react';
import Button from '../../../components/ui/Button';
import AssignJobModalPartial from './AssignJob.partial';
import { ClientListItemType } from '../../../types/slices.type/clients.slice.type';

const TableDataActionsPartial = ({ client }: { client: ClientListItemType }) => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<div className='flex justify-center break-all max-lg:flex-col'>
			<Button color='blue'>View Jobs</Button>
			<Button onClick={() => setModal(true)}>Assign A job</Button>
			<Button onClick={() => setModal(true)}>Assign to a Team Member</Button>
			<Button>Remove Client</Button>
			<AssignJobModalPartial client={client} modal={modal} setModal={setModal} />
		</div>
	);
};

export default TableDataActionsPartial;
