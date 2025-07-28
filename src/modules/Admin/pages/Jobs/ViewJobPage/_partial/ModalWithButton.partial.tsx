import { useState } from 'react';
import Button from '../../../../../../components/ui/Button';
import AssignJobModalPartial from './AssignJob.partial';

const ModalWithButtonPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<Button
				onClick={() => setModal(true)}
				size='xl'
				variant='solid'
				rightIcon='HeroChevronDown'>
				Message Recruiter
			</Button>
			<AssignJobModalPartial modal={modal} setModal={setModal} />
		</>
	);
};

export default ModalWithButtonPartial;
