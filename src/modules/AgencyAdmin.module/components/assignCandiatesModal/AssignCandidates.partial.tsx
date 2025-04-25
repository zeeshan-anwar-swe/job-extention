import Button from '../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import { AssignCandidatesModalListItemPartial } from './AssignCandidatesModalListItem.partial';
import { JobDetailsType } from '../../../../types/slices.type/jobs.slice.type';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getJobsList } from '../../../../store/slices/Jobs.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';

export const AssignCandidatesModal = ({
	modal,
	setModal,
	title = 'Assign Job',
	assignTo,
}: {
	title: string;
	modal: boolean;
	setModal: any;
	assignTo: string;
}) => {
	const [assignedCandidates, setAssignedCadidates] = useState<any[]>([]);
	const { paginatedList, pageLoading, error } = useSelector(
		(state: RootState) => state.jobsSlice,
	);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (modal) {
			dispatch(getJobsList({ limit: 100, page: 1 }));
		}
	}, [modal]);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>{title}</ModalHeader>
			<div className='p-4'>
				<SearchPartial />
			</div>
			<PageLoader data={paginatedList} loading={pageLoading} error={error}>
				<ModalBody className='flex w-full flex-col gap-4'>
					{paginatedList.map((job: JobDetailsType) => (
						<AssignCandidatesModalListItemPartial assignTo={assignTo} job={job} key={job.id} />
					))}
				</ModalBody>
			</PageLoader>
			<ModalFooter>
				<ModalFooterChild className='w-full pt-4'>
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
