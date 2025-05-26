import Button from '../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import {AssignTeamModalListItemPartial} from './ModalListItem.partial';
import { JobDetailsType2 } from '../../../../types/slices.type/jobs.slice.type';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getJobsList, setJobSearch } from '../../../../store/slices/Jobs.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Search from '../Search.partial';
import Pagination from '../../../../components/ui/Pagination';
import { getPaginatedTeamlist } from '../../../../store/slices/Team.slice';

export const AssignTeamModalPartial = ({
	modal,
	setModal,
	title = 'Assign to Team',
	assignTo,
	assignToModule,
	jobAssignAction,
}: {
	assignToModule: 'candidate' | 'client' | 'teamMember';
	title?: string;
	modal: boolean;
	setModal: any;
	jobAssignAction: any;
	assignTo: string;
}) => {
	const { paginatedList, pageLoading, error, paginationCount, search } = useSelector(
		(state: RootState) => state.team,
	);
	console.log({error});
	
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (modal) {
			dispatch(getPaginatedTeamlist({ limit: 10, page: 1 }));
		}
	}, [modal]);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>{title}</ModalHeader>
			<div className='p-4'>
				<Search
					searchLimit={10}
					setSearchActionForPagination={setJobSearch}
					searchListAction={getPaginatedTeamlist}
					placeholder='Search Team...'
				/>
			</div>
			<ModalBody className='flex h-96 w-full flex-col gap-4 overflow-y-scroll'>
				<PageLoader data={paginatedList} loading={pageLoading} error={error}>
					{paginatedList.map((team: any) => (
						<AssignTeamModalListItemPartial
							assignToModule={assignToModule}
							jobAssignAction={jobAssignAction}
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
