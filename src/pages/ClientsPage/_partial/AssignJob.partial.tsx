import Button from '../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import AssignJobModalListItemPartial from './AssignJobModalListItem.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { JobDetailsType } from '../../../types/slices.type/jobs.slice.type';
import { ClientListItemType } from '../../../types/slices.type/clients.slice.type';

const AssignJobModalPartial = ({
	modal,
	setModal,
	client,
}: {
	modal: boolean;
	setModal: any;
	client: ClientListItemType;
}) => {
	const { locallySearchedJobs } = useSelector((state: RootState) => state.jobsSlice);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign Job</ModalHeader>
			<div className='p-4'>
				<SearchPartial />
			</div>

			<ModalBody className='flex w-full flex-col gap-4'>
				{locallySearchedJobs.map((job: JobDetailsType) => (
					<AssignJobModalListItemPartial client={client} job={job} key={job.id} />
				))}
			</ModalBody>
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

export default AssignJobModalPartial;
