import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatRelativeTime(date: string | Date): string {
	const raw = dayjs().to(dayjs(date), true).trim();

	if (raw === 'a few seconds') return 'just now';

	const replacements: Record<string, string> = {
		second: 's',
		seconds: 's',
		minute: 'm',
		minutes: 'm',
		hour: 'hr',
		hours: 'hr',
		day: 'd',
		days: 'd',
		week: 'w',
		weeks: 'w',
		month: 'mo',
		months: 'mo',
		year: 'y',
		years: 'y',
	};

	// Handle "a minute", "an hour", etc.
	const specialCases: Record<string, string> = {
		'a second': '1s',
		'a minute': '1m',
		'an hour': '1hr',
		'a day': '1d',
		'a week': '1w',
		'a month': '1mo',
		'a year': '1y',
	};

	if (specialCases[raw]) return specialCases[raw];

	const [num, unit] = raw.split(' ');
	const mappedUnit = replacements[unit] || unit;

	return `${num}${mappedUnit}`;
}
