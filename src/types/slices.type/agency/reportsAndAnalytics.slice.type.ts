export interface ClientMetricsType {
	id: string;
	userId: string;
	name: string;
	image: string;
	hiringRate: string;
}

interface TeamPerformanceType {
  teamUser: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: null;
    createdAt: string;
  };
  jobsClosed: number;
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




export interface reportsAndAnalyticsInitialStateType {
	clientMetrics: ClientMetricsStateType;
	teamPerformance: ClientMetricsStateType;
}
