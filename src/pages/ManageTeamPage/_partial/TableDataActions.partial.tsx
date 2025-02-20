import { Link } from 'react-router-dom';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const TableDataActionsPartial = () => {
	return (
		<div className='flex justify-center'>
			<Button>Message</Button>
			<Button>Assign Job</Button>
			<Button>Remove Member</Button>
		</div>
	);
};

export default TableDataActionsPartial;
