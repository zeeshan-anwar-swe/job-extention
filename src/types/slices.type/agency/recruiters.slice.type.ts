

export interface RecruiterListType {
	loading: boolean;
	count: number;
	rows: any[];
	error: null | any;
}

export interface RecruiterProfileType {
	loading: boolean;
	data: any | null;
	error: null | any;
}

export interface RecruitersInitialStateType {
	recruiterProfilerecruitersList: RecruiterListType;
	recruiterProfile: RecruiterProfileType;
}
