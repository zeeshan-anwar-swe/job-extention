import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<Button onClick={() => setModal(true)} variant='solid' rightIcon='HeroPlus'>
				Create a new job
			</Button>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</>
	);
};

export default HeaderPartial;
