import Button from '../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import AssignJobModalListItemPartial from './AssignJobModalListItem.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const AssignJobModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const { locallySearchedJobs, jobsList } = useSelector((state: RootState) => state.jobsSlice);

	console.log({ locallySearchedJobs, jobsList });

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign Job</ModalHeader>
			<div className='p-4'>
				<SearchPartial />
			</div>

			<ModalBody className='flex w-full flex-col gap-4'>
				{locallySearchedJobs.map((job: any) => (
					<AssignJobModalListItemPartial key={job.id} />
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
