import { useState } from 'react';
import Button from '../../../../../../components/ui/Button';
import AssignJobModalPartial from './AssignJob.partial';

const ModalWithButtonPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<Button onClick={() => setModal(true)} variant='solid'>
				Assign to a Recruiter
			</Button>
			<AssignJobModalPartial modal={modal} setModal={setModal} />
		</>
	);
};

export default ModalWithButtonPartial;
