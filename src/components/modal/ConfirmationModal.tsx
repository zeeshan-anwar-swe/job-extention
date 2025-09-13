import Button from '../ui/Button';
import Modal, { ModalBody, ModalFooter, ModalFooterChild, ModalHeader } from '../ui//Modal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { CardSubTitle } from '../ui/Card';
import { useEffect, useState } from 'react';

const ConfirmationModal = ({
	modal,
	setModal,
	title = 'Assign Job',
	action,
	onCloseAction,
}: {
	title: string;
	modal: boolean;
	setModal: any;
	action: any;
	onCloseAction?: any;
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();

	const handleConfirmation = async () => {
		setLoading(true);
		await dispatch(action);
		if(onCloseAction){
			await dispatch(onCloseAction);
		}
		setLoading(false);
		setModal(false);
	};



	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Confirmation!</ModalHeader>

			<ModalBody className='flex w-full flex-col gap-4'>
				<CardSubTitle>Are you sure to {title}</CardSubTitle>
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
						isLoading={loading}
						onClick={handleConfirmation}
						className='w-full'
						variant='solid'>
						Confirm
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default ConfirmationModal;
