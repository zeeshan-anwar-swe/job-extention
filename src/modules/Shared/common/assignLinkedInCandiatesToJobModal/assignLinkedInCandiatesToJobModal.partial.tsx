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
import {
	assignManyCandidatesToJob,
	setAssignedCandidatesWhileCreatingJob,
	setAssignedCandidatesWhileUpdatingJob,
} from '../../../../store/slices/Jobs.slice';
import {
	getAllCandidatesList,
	setCandidatesSearch,
} from '../../../../store/slices/Candiates.slice';
import Pagination from '../../../../components/ui/Pagination';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { cn } from '../../../../utils/cn';
import { LinkedInCandidateCardPartial } from './linkedInCandidateCard.partial';
import { useState } from 'react';

export const AssignLinkedInCandiatesToJobModalPartial = ({
	jobId,
	modal,
	setModal,
	jobTitle,
	reFreshList,
}: {
	modal: boolean;
	jobId: string;
	setModal: any;
	jobTitle?: string;
	reFreshList?: any;
}) => {
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	const { allCadidateList, paginationCount, pageLoading, error } = useSelector(
		(state: RootState) => state.candidates,
	);

	const dispatch: AppDispatch = useDispatch();

	const { assignedCandidatesWhileCreatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	const assignManyCandidates = async () => {
		setSubmitLoading(true);
		if (assignedCandidatesWhileCreatingJob.length > 0) {

			const candidateIds = await assignedCandidatesWhileCreatingJob.map(
				(candidate) => candidate.id,
			);

			await dispatch(
				assignManyCandidatesToJob({
					candidateIds,
					jobId,
				}),
			);
		}
		setSubmitLoading(false)
		setModal(false);
		await dispatch(setAssignedCandidatesWhileUpdatingJob([]));
		await dispatch(setAssignedCandidatesWhileCreatingJob([]));
		reFreshList && reFreshList();
		
	};

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

			<ModalBody
				className={cn(
					'!flex !w-full !flex-col !gap-4',
					pageLoading || error || allCadidateList.length === 0
						? 'min-h-96 justify-center'
						: 'max-h-96',
				)}>
				<PageLoader data={allCadidateList} loading={pageLoading} error={error}>
					{allCadidateList.map((candidate) => (
						<LinkedInCandidateCardPartial candidate={candidate} key={candidate.id} />
					))}
				</PageLoader>
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
						isDisable={submitLoading}
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						color='zinc'>
						Cancel
					</Button>
					<Button
						isLoading={submitLoading}
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
