import Button from '../../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../../components/ui/Modal';
import { useState } from 'react';
import Alert from '../../../../../../components/ui/Alert';
import { createPortalSession } from '../../../../../../services/stripe-subscriptions';

const SubscriptionModalPartial = () => {
	const [modal, setModal] = useState<boolean>(false);

	const handleManageOrCancelOrUpdatePlan = async () => {
		const url = await createPortalSession();
		if (url) {
			window.location.href = url;
		}
	};

	return (
		<>
			<Button
				className='max-md:w-full'
				onClick={() => setModal(true)}
				rightIcon='HeroExclamationCircle'
				variant='outline'
				color='red'
				borderWidth='border'>
				Cancel membership
			</Button>
			<Modal size='sm' isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
				<ModalHeader noCloseButton={true}>
					<Alert variant='outline' color='red' icon='HeroExclamationCircle' />
				</ModalHeader>

				<ModalBody className='flex flex-col items-center gap-2 px-10 text-center'>
					<h3>Cancel Membership</h3>
					<p>
						You have 23 days left on your membership. You can continue to enjoy all
						premium KoalaByte features until October 6, 2025.
					</p>
					<p className='text-red-600'>This process cannot be undone.</p>
				</ModalBody>
				<ModalFooter className='!flex-col'>
					<ModalFooterChild className='w-full pt-4'>
						<Button
							onClick={handleManageOrCancelOrUpdatePlan}
							className='w-full'
							variant='solid'
							color='red'>
							Cancel Membership
						</Button>
					</ModalFooterChild>
					<ModalFooterChild className='w-full pt-4'>
						<Button
							onClick={() => setModal(false)}
							className='w-full'
							variant='outline'
							color='zinc'
							borderWidth='border'>
							Stay subscribed
						</Button>
					</ModalFooterChild>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default SubscriptionModalPartial;
