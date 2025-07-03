import Button from '../../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../../components/ui/Modal';
import AssignJobToClientModalListItemPartial from './AssignJobToClientModalListItem.partial';

const AssignJobToClientModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign Job to a Client</ModalHeader>
			<div className='p-4'>
			</div>

			<ModalBody>
				<div className='flex w-full flex-col gap-4'>
					<AssignJobToClientModalListItemPartial />
					<AssignJobToClientModalListItemPartial />
					<AssignJobToClientModalListItemPartial />
					<AssignJobToClientModalListItemPartial />
				</div>
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

export default AssignJobToClientModalPartial;
