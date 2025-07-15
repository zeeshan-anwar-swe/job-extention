import { CardHeader } from '../../../../../../components/ui/Card';
import Button from '../../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../../components/ui/Modal';
import AssignJobModalListItemPartial from './AssignJobModalListItem.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { useEffect } from 'react';
import {
	getPaginatedAgencyClientsList,
	setClientSearch,
} from '../../../../../../store/slices/Agency/Client.slice';
import PageLoader from '../../../../../../templates/layouts/main/PageLoader';
// import SearchPartial from '../../../../common/Search.partial';
import Pagination from '../../../../../../components/ui/Pagination';

const AssignClientModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const {
		paginatedClients: clientsList,
		pageLoading,
		error,
		paginationCount,
		clentSearch,
	} = useSelector((state: RootState) => state.clients);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>
				<CardHeader>Assign a client</CardHeader>
			</ModalHeader>
			{/* <div className='p-4'>
				<SearchPartial
					searchLimit={10}
					searchListAction={getPaginatedAgencyClientsList}
					setSearchActionForPagination={setClientSearch}
				/>
			</div> */}

			<ModalBody className='h-96 overflow-y-scroll'>
				<PageLoader data={clientsList} loading={pageLoading} error={error}>
					<div className='flex w-full flex-col gap-4'>
						{clientsList.map((client: any) => (
							<AssignJobModalListItemPartial client={client} key={client.id} />
						))}
					</div>
				</PageLoader>
			</ModalBody>
			<ModalFooter className='flex flex-col items-end'>
				<ModalFooterChild>
					<Pagination
						count={paginationCount}
						search={clentSearch}
						limit={10}
						getListAction={getPaginatedAgencyClientsList}
					/>
				</ModalFooterChild>
				<ModalFooterChild className='w-full'>
					<Button
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						borderWidth='border'
						color='zinc'>
						Cancel
					</Button>

					<Button onClick={() => setModal(false)} className='w-full' variant='solid'>
						Done
					</Button>
					<Button
						rightIcon='HeroPaperAirplane'
						onClick={() => setModal(false)}
						className='w-full'
						variant='solid'>
						Invite as client
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default AssignClientModalPartial;
