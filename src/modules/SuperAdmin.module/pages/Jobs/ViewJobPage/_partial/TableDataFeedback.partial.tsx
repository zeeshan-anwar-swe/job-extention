import Badge from '../../../../../../components/ui/Badge';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const TableDataFeedbackPartial = ({
	title,
	className = '',
}: {
	title?: string;
	className?: string;
}) => {
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
		<div className={'mx-auto flex w-fit items-center gap-2 ' + className}>
			<Badge variant='outline' borderWidth='border-0' color={badgeColor}>
				{textValidationCheck(title)}
			</Badge>
		</div>
	);
};

export default TableDataFeedbackPartial;
