export interface ClientMetricsType {
	id: string;
	userId: string;
	name: string;
	image: string;
	hiringRate: string;
}

export interface TeamPerformanceType {
  teamUser: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: null | string;
    createdAt: string;
  };
  jobsClosed: number;
}

export interface JobStatsChartType {
  label: string;
  jobsApplied: number;
  totalHirings: number;
  rejectedJobs: number;
  pendingJobs: number;
}

export interface RAJobDataType {
	change: string;
	value: number;
}

export interface JobsStatusType {
  jobsApplied: RAJobDataType;
  totalHirings: RAJobDataType;
  rejectedJobs: RAJobDataType;
  pendingJobs: RAJobDataType;
}

export interface ClientMetricsStateType {
	loading: boolean;
	rows: ClientMetricsType[]
	count: number;
	error: null | any;
}

export interface TeamPerformanceStateType {
	loading: boolean;
	rows: TeamPerformanceType[]
	count: number;
	error: null | any;
}

export interface ChartDataStateType {
	loading: boolean;
	data: JobStatsChartType[]
	chartCategories: string[]
	error: null | any;
}

export interface StaticsStateType {
	loading: boolean;
	data: JobsStatusType
	error: null | any;
}



export interface reportsAndAnalyticsInitialStateType {
	clientMetrics: ClientMetricsStateType;
	teamPerformance: ClientMetricsStateType;
	chartData: ChartDataStateType
	statics: StaticsStateType
}
