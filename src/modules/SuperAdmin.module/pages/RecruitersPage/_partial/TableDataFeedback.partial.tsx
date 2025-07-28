import Badge from '../../../../../components/ui/Badge';

const TableDataFeedbackPartial = ({ percentage }: { percentage: number }) => {
	const badgeColor = (() => {
		if (percentage >= 80) {
			return 'emerald'; // Green for 80-100%
		} else if (percentage >= 60) {
			return 'blue'; // Blue for 60-79%
		} else if (percentage >= 40) {
			return 'amber'; // Amber for 40-59%
		} else if (percentage >= 20) {
			return 'red'; // Orange for 20-39%
		} else {
			return 'red'; // Red for 0-19%
		}
	})();

	const clampedPercentage = Math.max(0, Math.min(100, percentage)); // Ensure percentage is within 0-100

	return (
		<div className='mx-auto w-fit'>
			<Badge variant='outline' borderWidth='border-0' color={badgeColor}>
				{clampedPercentage}%
			</Badge>
		</div>
	);
};

export default TableDataFeedbackPartial;
