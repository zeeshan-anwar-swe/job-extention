import { Link } from 'react-router-dom';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { textValidationCheck } from '../../../utils/validationCheck';

const TableDataActionsPartial = () => {
	return (
		<div className='flex justify-center'>
			<Link to='/candidates/cv-edit/12'>
				<Button>Edit CV</Button>
			</Link>
			<Link to='/candidates/profile/12'>
				<Button>View CV</Button>
			</Link>
			<Button>Remove Candidate</Button>
		</div>
	);
};

export default TableDataActionsPartial;
