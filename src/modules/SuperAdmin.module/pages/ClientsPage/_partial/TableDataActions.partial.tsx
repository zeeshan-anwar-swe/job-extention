import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';

const TableDataActionsPartial = () => {
	return (
		<div className='flex justify-center'>
			<Button color='blue'>Remove</Button>
			<Link to={'/clients/profile'}>
				<Button>View Profile</Button>
			</Link>
		</div>
	);
};

export default TableDataActionsPartial;
