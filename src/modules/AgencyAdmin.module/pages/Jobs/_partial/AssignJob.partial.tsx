import Button from '../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import AssignJobModalListItemPartial from './AssignJobModalListItem.partial';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';

const AssignJobModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const { candidatesList } = useSelector((state: RootState) => state.candidates);
	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign Job “Product Designer” to a Client</ModalHeader>
			<div className='p-4'>
				<SearchPartial />
			</div>

			<ModalBody className='!flex !w-full !flex-col !gap-4'>
				{candidatesList.map((candidate) => (
					<AssignJobModalListItemPartial candidate={candidate} key={candidate.id} />
				))}
			</ModalBody>
			<ModalFooter>
				<ModalFooterChild className='w-full pt-4 max-md:!flex-col'>
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
					<Button onClick={() => setModal(false)} className='w-full' variant='solid'>
						Invite As Client
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default AssignJobModalPartial;
