import { useState } from 'react';
import Button from '../../../../../components/ui/Button';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';
import { AssignJobModalPartial } from '../../../common/AssignJobModal/Modal.partial';
import { assignJobToClient } from '../../../../../store/slices/Agency/Client.slice';

const TableDataActionsPartial = ({ client }: { client: ClientListItemType }) => {
	console.log('client', client);
	
	const [modal, setModal] = useState<boolean>(false);
	return (
		<div className='flex justify-center break-all max-lg:flex-col'>
			<Button color='blue'>View Jobs</Button>
			<Button onClick={() => setModal(true)}>Assign A job</Button>
			<Button onClick={() => setModal(true)}>Assign to a Team Member</Button>
			<Button>Remove Client</Button>
			<AssignJobModalPartial
				title={`Assign Jobs to a client: ${client?.name ?? ''}`}
				assignToModule='client'
				modal={modal}
				setModal={setModal}
				assignTo={client.id}
				jobAssignAction={assignJobToClient}
			/>
		</div>
	);
};

export default TableDataActionsPartial;
