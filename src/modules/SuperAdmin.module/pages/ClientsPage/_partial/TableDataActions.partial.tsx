import { useState } from 'react';
import Button from '../../../../../components/ui/Button';
import {
	ClientListItemTypeSuperAdmin,
} from '../../../../../types/slices.type/clients.slice.type';

import { Link } from 'react-router-dom';

const TableDataActionsPartial = ({ client }: { client: ClientListItemTypeSuperAdmin }) => {
	const [modal, setModal] = useState<boolean>(false);
	const [teamModal, setTeamModal] = useState<boolean>(false);
	return (
		<div className='no-scrollbar flex font-medium justify-center text-nowrap'>
			<Button>Remove Client</Button>
			<Link to={`/dashboard/clients/profile`} state={client}>
				<Button color='blue'>View Profile</Button>
			</Link>
			{/* <Link to={`/chat/${client.id}`} state={{userName: client?.clientUser.firstName, userId: client?.id}}>
				<Button color='blue'>Message</Button>
				</Link>
				<Button onClick={() => setModal(true)}>Assign A job</Button>
				<Button onClick={() => setTeamModal(true)}>Assign to a Team Member</Button> */}
			{/* <AssignJobModalPartial
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
			/> */}
		</div>
	);
};

export default TableDataActionsPartial;
