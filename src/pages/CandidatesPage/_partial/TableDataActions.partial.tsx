import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { textValidationCheck } from '../../../utils/validationCheck';

const TableDataActionsPartial = (props: any) => {
	
	return (
		<div className='flex justify-center'>
			<Button>Edit CV</Button>
			<Button>View CV</Button>
			<Button>Remove Candidate</Button>
		</div>
	);
};

export default TableDataActionsPartial;
