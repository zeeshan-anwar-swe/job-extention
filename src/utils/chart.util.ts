export const transLineChartData = (
	data: {
		label: string;
		jobs: number;
		hired: number;
		shortlisted: number;
		interview: number;
	}[],
): { name: string; data: number[] }[] => {
	return [
		{
			name: 'Jobs',
			data: data.map((item) => item.jobs),
		},
		{
			name: 'Hired',
			data: data.map((item) => item.hired),
		},
		{
			name: 'Shortlisted',
			data: data.map((item) => item.shortlisted),
		},
		{
			name: 'Interview',
			data: data.map((item) => item.interview),
		},
	];
};
