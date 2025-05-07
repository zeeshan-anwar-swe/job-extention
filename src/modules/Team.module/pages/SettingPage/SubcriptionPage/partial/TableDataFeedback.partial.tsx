import Icon from '../../../../../../components/icon/Icon';
import Badge from '../../../../../../components/ui/Badge';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const TableDataFeedbackPartial = ({ title }: { title?: string }) => {
	const badgeColor = (() => {
		switch (title) {
			case 'Paid':
				return 'emerald';
			case 'Un paid':
				return 'red';

			default:
				return 'zinc';
		}
	})();
	return (
		<div className='flex items-center justify-center gap-2'>
			<Icon color={badgeColor} icon={badgeColor === 'emerald' ? 'HeroCheck' : 'HeroXMark'} />
			<Badge variant='outline' borderWidth='border' color={badgeColor}>
				{textValidationCheck(title)}
			</Badge>
		</div>
	);
};

export default TableDataFeedbackPartial;
