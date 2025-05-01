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

export interface TaskBoardDataType {
	backlogJobs: TaskBoardJobType[];
	inProgressJobs: TaskBoardJobType[];
	inReviewJobs: TaskBoardJobType[];
	completedJobs: TaskBoardJobType[];
}

export interface TaskBoardInitialStateType {
	error: null | Error;
	taskBoardData: TaskBoardDataType;
	pageLoading: boolean;
	modalLoading: boolean;
	componentLoading: boolean;
}
