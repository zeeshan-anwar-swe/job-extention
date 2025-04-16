import { useSelector } from 'react-redux';
import Button from '../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../components/ui/Modal';
import { AssignClientToCandidateModalListItemPartial } from './AssignJobToClientModalListItem.partial';
import { ClientSearchPartial } from './ClientSearch.partial';
import { RootState } from '../../../store';

export const AssignClientToCandidateModalPartial = ({
	modal,
	setModal,
}: {
	modal: boolean;
	setModal: any;
}) => {
	const { locallySearchedClients } = useSelector((state: RootState) => state.clients);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign client to candidate</ModalHeader>
			<div className='p-4'>
				<ClientSearchPartial />
			</div>

			<ModalBody className='!flex max-h-72 !w-full !flex-col !gap-4'>
				{locallySearchedClients.map((client: any) => (
					<AssignClientToCandidateModalListItemPartial key={client.id} client={client} />
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
