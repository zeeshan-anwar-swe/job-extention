import { useState } from 'react';
import Button from '../../../../../components/ui/Button';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';
import {
	assignJobToClient,
	deleteClientClient,
	getPaginatedAgencyClientsList,
	unAssignJobToClient,
} from '../../../../../store/slices/Client.slice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { ConfirmationModal } from '../../../../Shared/components/CustomModal/confirmationModal';

const TableDataActionsPartial = ({ client }: { client: ClientListItemType }) => {
	const [deleteModal, setDeleteModal] = useState<boolean>(false);


	return (
		<div className='no-scrollbar flex overflow-x-scroll text-nowrap'>
			
			<Link to={`/dashboard/clients/jobs`} state={client}>
				<Button color='blue'>View Jobs</Button>
			</Link>

			<Link
				to={`/dashboard/chat/${client?.userId}`}
				state={{ userName: client?.name, userId: client?.userId }}>
				<Button color='blue'>Message</Button>
			</Link>



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
