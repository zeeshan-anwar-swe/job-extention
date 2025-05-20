type TPeriodKEY = 'DAY' | 'WEEK' | 'MONTH' | 'RANGE';
type TPeriodText = 'Day' | 'Week' | 'Month' | 'Range';

export type TPeriod = {
	text: TPeriodText;
};
export type TPeriods = {
	[key in TPeriodKEY]: TPeriod;
};

const PERIOD: TPeriods = {
	DAY: { text: 'Day' },
	WEEK: { text: 'Week' },
	MONTH: { text: 'Month' },
	RANGE: { text: 'Range' },
};

export default PERIOD;
