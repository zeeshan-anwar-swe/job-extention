import { useState } from 'react';
import Button from '../../../../../components/ui/Button';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';
import { AssignJobModalPartial } from '../../../common/AssignJobModal/Modal.partial';
import {
	assignJobToClient,
	deleteClientClient,
	getPaginatedAgencyClientsList,
	unAssignJobToClient,
} from '../../../../../store/slices/Agency/Client.slice';
import { AssignTeamModalPartial } from '../../../common/AssignTeamModal/Modal.partial';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { ConfirmationModal } from '../../../../Shared/components/CustomModal/confirmationModal';

const TableDataActionsPartial = ({ client }: { client: ClientListItemType }) => {
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [teamModal, setTeamModal] = useState<boolean>(false);
	const [modal, setModal] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	const refreshData = async () => {
		await dispatch(getPaginatedAgencyClientsList({ limit: 10, page: 1 }));
	};
	return (
		<div className='no-scrollbar flex overflow-x-scroll text-nowrap'>
			
			<Link to={`/clients/jobs`} state={client}>
				<Button color='blue'>View Jobs</Button>
			</Link>

			<Link
				to={`/chat/${client?.userId}`}
				state={{ userName: client?.name, userId: client?.userId }}>
				<Button color='blue'>Message</Button>
			</Link>

			<Button onClick={() => setModal(true)}>Assign A job</Button>
			<Button onClick={() => setTeamModal(true)}>Assign to a Team Member</Button>
			<Button onClick={()=>setDeleteModal(true)}>Remove Client</Button>

			<AssignJobModalPartial
				modal={modal}
				setModal={setModal}
				assignTo={client.id}
				assignToModule='client'
				refreshData={refreshData}
				jobAssignAction={assignJobToClient}
				unAssignAction={unAssignJobToClient}
				title={`Assign Jobs to a client: ${client?.name ?? ''}`}
			/>
			<AssignTeamModalPartial
				modal={teamModal}
				assignTo={client.id}
				assignToModule='client'
				setModal={setTeamModal}
				jobAssignAction={assignJobToClient}
			/>

			<ConfirmationModal
				modal={deleteModal}
				title='remove client'
				setModal={setDeleteModal}
				action={deleteClientClient(client.id)}
				onClose={getPaginatedAgencyClientsList({ limit: 10, page: 1 })}
				/>
		</div>
	);
};

export default TableDataActionsPartial;
