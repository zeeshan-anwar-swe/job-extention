import Badge from '../../../../../components/ui/Badge';
import { textValidationCheck } from '../../../../../utils/validationCheck';

const TableDataStatuskPartial = ({ status }: { status?: string }) => {
	const badgeColor = (() => {
		switch (status) {
			case 'Fair':
				return 'amber';
			case 'Low Qualify':
				return 'red';
			case 'Over Qualify':
				return 'violet';
			case 'Hired':
				return 'emerald';
			case 'Rejected':
				return 'red';
			case 'In Review':
				return 'blue';
			default:
				return 'zinc';
		}
	})();
	return (
		<div className='mx-auto w-fit'>
			<Badge variant='outline' borderWidth='border-0' color={badgeColor}>
				{textValidationCheck(status)}
			</Badge>
		</div>
	);
};

export default TableDataStatuskPartial;
