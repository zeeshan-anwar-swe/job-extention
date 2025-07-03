import Button from '../../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import AssignJobModalListItemPartial from './AssignJobModalListItem.partial';

const AssignJobModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign Job</ModalHeader>
			<div className='p-4'>
				<SearchPartial />
			</div>

			<ModalBody>
				<div className='flex w-full flex-col gap-4'>
					<AssignJobModalListItemPartial />
					<AssignJobModalListItemPartial />
					<AssignJobModalListItemPartial />
					<AssignJobModalListItemPartial />
				</div>
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
