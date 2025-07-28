import Badge from '../../../../../../components/ui/Badge';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const CustomBadgePartial = ({ title }: { title?: string }) => {
	const badgeColor = (() => {
		switch (title) {
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
		<Badge variant='outline' borderWidth='border-0' color={badgeColor}>
			{textValidationCheck(title)}
		</Badge>
	);
};

export default CustomBadgePartial;
