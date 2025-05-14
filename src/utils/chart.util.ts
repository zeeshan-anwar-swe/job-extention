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



export const transformRAChartData = (
	data: {
		label: string;
		jobsApplied: number;
		pendingJobs: number;
		rejectedJobs: number;
		totalHirings: number;
	}[],
): { name: string; data: number[] }[] => {
	return [
		{
			name: 'Jobs Applied',
			data: data.map((item) => item.jobsApplied),
		},
		{
			name: 'Total Hirings',
			data: data.map((item) => item.totalHirings),
		},
		{
			name: 'Pending Jobs',
			data: data.map((item) => item.pendingJobs),
		},
		{
			name: 'Rejected Jobs',
			data: data.map((item) => item.rejectedJobs),
		},
	];
};
