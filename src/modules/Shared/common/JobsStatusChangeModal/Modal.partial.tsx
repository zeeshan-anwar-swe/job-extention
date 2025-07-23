import Search from '../Search.partial';
import Button from '../../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import Pagination from '../../../../components/ui/Pagination';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import {  JobsStatusChangeModalListItem } from './ModalListItem.partial';
import {
	getAgencyClientsWithJobs,
	getPaginatedAgencyClientsList,
	setClientSearch,
} from '../../../../store/slices/Agency/Client.slice';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import { JobStatus } from '../../../../types/enums/jobStatus.enum';

export const JobStatusChangeModalPartial = ({
	modal,
	setModal,
	title = 'Change Job Status',
	changeStatusTo,
}: {
	title?: string;
	modal: boolean;
	setModal: any;
	changeStatusTo: JobStatus;
}) => {
	const { jobsList, pageLoading,  error } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	const handleDone = () => {
		setModal(false);
	};

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>{title}</ModalHeader>
			{/* <NavSeparator /> */}
			<div className='p-4'>
				<Search
					searchLimit={10}
					setSearchActionForPagination={setClientSearch}
					searchListAction={getPaginatedAgencyClientsList}
					placeholder='Search Client...'
				/>
			</div>
			<NavSeparator />

			<ModalBody className='flex h-96 w-full flex-col gap-4 overflow-y-scroll'>
				<PageLoader data={jobsList} loading={pageLoading} error={error}>
					<JobsStatusChangeModalListItem/>
				</PageLoader>
			</ModalBody>
			<NavSeparator />

			<ModalFooter className='flex-col !items-end'>
				{/* <ModalFooterChild>
					<Pagination
						count={count}
						limit={10}
						getListAction={getAgencyClientsWithJobs}
					/>
				</ModalFooterChild> */}
				<ModalFooterChild className='w-full'>
					<Button
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						color='zinc'>
						Cancel
					</Button>
					<Button onClick={handleDone} className='w-full' variant='solid'>
						Done
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};
