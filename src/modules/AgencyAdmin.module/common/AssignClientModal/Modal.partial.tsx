import { useEffect } from 'react';
import Search from '../Search.partial';
import Button from '../../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import Pagination from '../../../../components/ui/Pagination';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { AssignClientModalListItemPartial } from './ModalListItem.partial';
import {
	getAgencyClientsWithJobs,
	getPaginatedAgencyClientsList,
	setClientSearch,
} from '../../../../store/slices/Client.slice';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';

export const AssignClientModalPartial = ({
	modal,
	setModal,
	title = 'Assign Client to Candiate',
	assignTo,
}: {
	title?: string;
	modal: boolean;
	setModal: any;
	assignTo: string;
}) => {
	const { count, loading, error, rows } = useSelector(
		(state: RootState) => state.clients.clientsWithJobs,
	);

	

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>{title}</ModalHeader>
			<div className='p-4'>
				<Search
					searchLimit={10}
					setSearchActionForPagination={setClientSearch}
					searchListAction={getPaginatedAgencyClientsList}
					placeholder='Search Client...'
				/>
			</div>
			<ModalBody className='flex h-96 w-full flex-col gap-4 overflow-y-scroll'>
				<PageLoader data={rows} loading={loading} error={error}>
					{rows.map((client: any) => (
						<AssignClientModalListItemPartial
							assignTo={assignTo}
							client={client}
							key={client.id}
						/>
					))}
				</PageLoader>
			</ModalBody>
			<ModalFooter className='flex-col !items-end'>
				<ModalFooterChild>
					<Pagination
						count={count}
						limit={10}
						getListAction={getAgencyClientsWithJobs}
					/>
				</ModalFooterChild>
				<ModalFooterChild className='w-full'>
					<Button
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						color='zinc'>
						Cancel
					</Button>
					<Button onClick={() => setModal(false)} className='w-full' variant='solid'>
						Done
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};
