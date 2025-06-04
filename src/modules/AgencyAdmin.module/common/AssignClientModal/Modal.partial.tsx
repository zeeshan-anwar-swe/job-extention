import { useEffect } from 'react';
import Search from '../Search.partial';
import Button from '../../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import Pagination from '../../../../components/ui/Pagination';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { AssignClientModalListItemPartial } from './ModalListItem.partial';
import { getPaginatedTeamlist } from '../../../../store/slices/Team.slice';
import {
	getPaginatedAgencyClientsList,
	setClientSearch,
} from '../../../../store/slices/Agency/Client.slice';
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
	assignToModule,
	clientAssignAction,
}: {
	assignToModule: 'candidate' | 'client' | 'teamMember';
	title?: string;
	modal: boolean;
	setModal: any;
	clientAssignAction: any;
	assignTo: string;
}) => {
	const { clientsList, pageLoading, error, paginationCount, search } = useSelector(
		(state: RootState) => state.clients,
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (modal) {
			dispatch(getPaginatedAgencyClientsList({ limit: 10, page: 1 }));
		}
	}, [modal]);

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
				<PageLoader data={clientsList} loading={pageLoading} error={error}>
					{clientsList.map((team: any) => (
						<AssignClientModalListItemPartial
							assignToModule={assignToModule}
							jobAssignAction={clientAssignAction}
							assignTo={assignTo}
							team={team}
							key={team.id}
						/>
					))}
				</PageLoader>
			</ModalBody>
			<ModalFooter className='flex-col !items-end'>
				<ModalFooterChild>
					<Pagination
						count={paginationCount}
						limit={10}
						search={search}
						getListAction={getPaginatedTeamlist}
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
