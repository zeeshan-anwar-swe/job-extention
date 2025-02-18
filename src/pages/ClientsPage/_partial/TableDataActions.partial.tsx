import { Link } from 'react-router-dom';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { textValidationCheck } from '../../../utils/validationCheck';

const TableDataActionsPartial = () => {
	return (
		<div className='flex justify-center'>
			<Button color='blue'>View Jobs</Button>
			<Button>Assign A Hob</Button>
			<Button>Assign to a Team Member</Button>
			<Button>Remove Client</Button>
		</div>
	);
};

export default TableDataActionsPartial;
