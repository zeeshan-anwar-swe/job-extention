import Badge from '../../../../../components/ui/Badge';
import Button from '../../../../../components/ui/Button';
import Tooltip from '../../../../../components/ui/Tooltip';
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
		<div className='mx-auto flex w-fit items-center gap-2'>
			<Badge variant='outline' borderWidth='border-0' color={badgeColor}>
				{textValidationCheck(status)}
			</Badge>
			<Tooltip text='This candidate somewhat looks fair to me.'>
				<Button
					className='rounded-bl-sm'
					variant='outline'
					size='sm'
					borderWidth='border'
					color='zinc'
					icon='HeroChatBubbleBottomCenterText'></Button>
			</Tooltip>
		</div>
	);
};

export default TableDataStatuskPartial;
