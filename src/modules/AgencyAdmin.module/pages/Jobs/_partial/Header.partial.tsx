import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';
import { Link } from 'react-router-dom';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);

	return (
		<Link to='/jobs/create-job'>
			<Button variant='solid' rightIcon='HeroPlus'>
				Create a new job
			</Button>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Link>
	);
};

export default HeaderPartial;
