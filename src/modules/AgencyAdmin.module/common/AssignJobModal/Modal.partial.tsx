import Button from '../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import ModalListItem from './ModalListItem.partial';
import { JobDetailsType2 } from '../../../../types/slices.type/jobs.slice.type';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getJobsList, setJobSearch } from '../../../../store/slices/Jobs.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Search from '../Search.partial';
import Pagination from '../../../../components/ui/Pagination';

export const AssignJobModalPartial = ({
	modal,
	setModal,
	title = 'Assign Job',
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
		(state: RootState) => state.jobsSlice,
	);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (modal) {
			dispatch(getJobsList({ limit: 10, page: 1 }));
		}
	}, [modal]);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>{title}</ModalHeader>
			<div className='p-4'>
				<Search
					searchLimit={10}
					setSearchActionForPagination={setJobSearch}
					searchListAction={getJobsList}
					placeholder='Search Jobs...'
				/>
			</div>
			<ModalBody className='flex h-96 w-full flex-col gap-4 overflow-y-scroll'>
				<PageLoader data={paginatedList} loading={pageLoading} error={error}>
					{paginatedList.map((job: JobDetailsType2) => (
						<ModalListItem
							assignToModule={assignToModule}
							jobAssignAction={jobAssignAction}
							assignTo={assignTo}
							job={job}
							key={job.id}
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
						getListAction={getJobsList}
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
