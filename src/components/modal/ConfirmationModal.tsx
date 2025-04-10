import React from 'react';
import { CardTitle } from '../ui/Card';
import Modal, { ModalBody, ModalHeader } from '../ui/Modal';

interface ModalComponentProps {
	title: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

const ConfirmationModal: React.FC<ModalComponentProps> = ({
	isOpen,
	setIsOpen,
	title,
	children,
}) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<CardTitle>{title}</CardTitle>
			</ModalHeader>
			<ModalBody>{children}</ModalBody>
		</Modal>
	);
};

export default ConfirmationModal;
