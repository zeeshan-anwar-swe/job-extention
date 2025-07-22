import Button from '../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import SearchPartial from '../Search.partial';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AssignCandidatesModalListItemPartial } from './AssignCandidatesModalList';
import {
	assignManyCandidatesToJob,
	setAssignedCandidatesWhileUpdatingJob,
} from '../../../../store/slices/Jobs.slice';
import { useEffect } from 'react';
import {
	getAllCandidatesList,
	setCandidatesSearch,
} from '../../../../store/slices/Candiates.slice';
import Pagination from '../../../../components/ui/Pagination';

const AssignCandidatesModalPartial = ({
	jobId,
	modal,
	setModal,
	jobTitle,
}: {
	modal: boolean;
	jobId: string;
	setModal: any;
	jobTitle?: string;
}) => {
	const { allCadidateList, paginationCount, pageLoading } = useSelector(
		(state: RootState) => state.candidates,
	);

	const dispatch: AppDispatch = useDispatch();

	const { assignedCandidatesWhileUpdatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	const assignManyCandidates = async () => {
		if (assignedCandidatesWhileUpdatingJob.length > 0) {
			await dispatch(
				assignManyCandidatesToJob({
					candidateIds: assignedCandidatesWhileUpdatingJob,
					jobId,
				}),
			);
		}
		setModal(false);
		await dispatch(setAssignedCandidatesWhileUpdatingJob([]));
	};

	useEffect(() => {
		dispatch(getAllCandidatesList({ page: 1, limit: 10 }));
	}, []);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign candidates to job: “{jobTitle ?? ''}” </ModalHeader>
			<div className='p-4'>
				<SearchPartial
					placeholder='Search candidates...'
					searchListAction={getAllCandidatesList}
					setSearchActionForPagination={setCandidatesSearch}
				/>
			</div>

			

			<ModalBody className='!flex max-h-96 !w-full !flex-col !gap-4'>
				{allCadidateList.map((candidate) => (
					<AssignCandidatesModalListItemPartial
						candidate={candidate}
						key={candidate.id}
					/>
				))}
			</ModalBody>
			<ModalFooter className='!block'>
				<ModalFooterChild>
					<Pagination
						count={paginationCount}
						limit={10}
						getListAction={getAllCandidatesList}
					/>
				</ModalFooterChild>
				<ModalFooterChild className='w-full pt-4 max-md:!flex-col'>
					<Button
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						color='zinc'>
						Cancel
					</Button>
					<Button
						onClick={() => assignManyCandidates()}
						className='w-full'
						variant='solid'>
						Done
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default AssignCandidatesModalPartial;
