import { Link } from 'react-router-dom';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { textValidationCheck } from '../../../utils/validationCheck';

const TableDataActionsPartial = (props: any) => {
	return (
		<div className='flex justify-center'>
			<Button>Edit CV</Button>
			<Link to='/candidates/profile/12'>
				<Button>View CV</Button>
			</Link>
			<Button>Remove Candidate</Button>
		</div>
	);
};

export default TableDataActionsPartial;
