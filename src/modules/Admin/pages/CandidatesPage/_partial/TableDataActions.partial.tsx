import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';

const TableDataActionsPartial = () => {
	return (
		<div className='flex justify-center'>
			<Button>Remove</Button>
			<Link to='/candidates/profile/12'>
				<Button>View Profile</Button>
			</Link>
		</div>
	);
};

export default TableDataActionsPartial;
