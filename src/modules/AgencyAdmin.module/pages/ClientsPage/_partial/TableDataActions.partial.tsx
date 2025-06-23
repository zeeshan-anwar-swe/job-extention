import { useState } from 'react';
import Button from '../../../../../components/ui/Button';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';
import { AssignJobModalPartial } from '../../../common/AssignJobModal/Modal.partial';
import { assignJobToClient, unAssignJobToClient } from '../../../../../store/slices/Agency/Client.slice';
import { AssignTeamModalPartial } from '../../../common/AssignTeamModal/Modal.partial';
import { Link } from 'react-router-dom';

const TableDataActionsPartial = ({ client }: { client: ClientListItemType }) => {
	const [modal, setModal] = useState<boolean>(false);
	const [teamModal, setTeamModal] = useState<boolean>(false);
	return (
		<div className='flex no-scrollbar overflow-x-scroll text-nowrap justify-center break-all max-lg:flex-col'>
			<Link to={`/clients/jobs`} state={client}>
				<Button color='blue'>View Jobs</Button>
			</Link>
			<Link to={`/chat/${client?.userId}`} state={{userName: client?.name, userId: client?.userId}}>
				<Button color='blue'>Message</Button>
			</Link>
			<Button onClick={() => setModal(true)}>Assign A job</Button>
			<Button onClick={() => setTeamModal(true)}>Assign to a Team Member</Button>
			<Button>Remove Client</Button>
			<AssignJobModalPartial
				title={`Assign Jobs to a client: ${client?.name ?? ''}`}
				assignToModule='client'
				modal={modal}
				setModal={setModal}
				assignTo={client.id}
				jobAssignAction={assignJobToClient}
				unAssignAction={unAssignJobToClient}
			/>
			<AssignTeamModalPartial
				modal={teamModal}
				assignTo={client.id}
				assignToModule='client'
				setModal={setTeamModal}
				jobAssignAction={assignJobToClient}
			/>
		</div>
	);
};

export default TableDataActionsPartial;
