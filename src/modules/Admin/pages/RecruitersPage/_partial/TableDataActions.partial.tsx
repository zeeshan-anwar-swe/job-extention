import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
const TableDataActionsPartial = () => {
	const navigateTo = useNavigate();
	return (
		<div className='flex justify-center'>
			<Button>Remove </Button>
			<Button onClick={() => navigateTo('/recruiter/profile')}>View Profile</Button>
		</div>
	);
};

export default TableDataActionsPartial;
