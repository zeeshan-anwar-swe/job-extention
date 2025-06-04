import { Link } from 'react-router-dom';
import Button from '../../../../../../components/ui/Button';

const TableDataActionsPartial = ({ candidate }: { candidate: any }) => {
	return (
		<div className='flex justify-center'>
			<Link to={'/candidates/cv-edit'} state={candidate}>
			<Button>Edit CV</Button>
			</Link>
			<Button>Remove Candidate</Button>
		</div>
	);
};

export default TableDataActionsPartial;
