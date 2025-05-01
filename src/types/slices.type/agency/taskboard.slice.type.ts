import { JobStatus } from '../../enums/jobStatus.enum';

export interface TaskBoardUserType {
	id: string;
	userId: string;
	name: string;
	image: string;
}

export interface TaskBoardJobType {
	id: string;
	title: string;
	status: JobStatus;
	client: TaskBoardUserType | null;
	team: TaskBoardUserType;
}

export interface TaskBoardListType {
	loading: boolean;
	count: number;
	rows: TaskBoardJobType[];
	error: null | any;
}

export interface TaskBoardInitialStateType {
	error: null | Error;
	backlogJobs: TaskBoardListType;
	inProgressJobs: TaskBoardListType;
	inReviewJobs: TaskBoardListType;
	completedJobs: TaskBoardListType;
	pageLoading: boolean;
	modalLoading: boolean;
	componentLoading: boolean;
}
