import Button from '../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../components/ui/Modal';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import FieldWrap from '../../../components/form/FieldWrap';
import Input from '../../../components/form/Input';
import Label from '../../../components/form/Label';

const InviteModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Invite a Team Member</ModalHeader>
			<NavSeparator />

			<ModalBody className='!flex !w-full !flex-col gap-4'>
				<div>
					<Label htmlFor='clientName'>Team Member Name*</Label>
					<FieldWrap>
						<Input
							id='clientName'
							name='clientName'
							placeholder='Enter your team member name'
							className='rounded-full'
						/>
					</FieldWrap>
				</div>
				<div>
					<Label htmlFor='clientEmail'>Team Member's Email*</Label>
					<FieldWrap>
						<Input
							id='clientEmail'
							name='clientEmail'
							placeholder='Enter your team member email'
							className='rounded-full'
						/>
					</FieldWrap>
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

					<Button
						rightIcon='HeroPaperAirplane'
						onClick={() => setModal(false)}
						className='w-full'
						variant='solid'>
						Send Invitation
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default InviteModalPartial;
