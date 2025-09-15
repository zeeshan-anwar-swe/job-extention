import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { TaskBoardInitialStateType } from '../../../types/slices.type/agency/taskboard.slice.type';
import { JobStatus } from '../../../types/enums/jobStatus.enum';

const initialState: TaskBoardInitialStateType = {
	search: '',
	error: null,
	backlogJobs: { loading: false, error: null, count: 0, rows: [] },
	inProgressJobs: { loading: false, error: null, count: 0, rows: [] },
	inReviewJobs: { loading: false, error: null, count: 0, rows: [] },
	completedJobs: { loading: false, error: null, count: 0, rows: [] },
	modalJobs: { loading: false, error: null, count: 0, rows: [], search: '' },
	pageLoading: false,
	modalLoading: false,
	componentLoading: false,
};

interface ApiParamsType {
	limit: number;
	page: number;
	startDate?: string;
	endDate?: string;
	isTeamModule?: boolean;
}

export const getTaskBoardBackLogJobs = createAsyncThunk(
	'taskBoard/getTaskBoardBackLogJobs',
	async ({ limit, page, startDate, endDate, isTeamModule }: ApiParamsType, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/${isTeamModule ? 'team' : 'agency'}/taskboard?page=${page}&limit=${limit}&status=${JobStatus.BACKLOG}${`&startDate=${startDate ?? ''}`}${`&endDate=${endDate ?? ''}`}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getTaskBoardInProgressJobs = createAsyncThunk(
	'taskBoard/getTaskBoardInProgressJobs',
	async ({ limit, page, startDate, endDate, isTeamModule }: ApiParamsType, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/${isTeamModule ? 'team' : 'agency'}/taskboard?page=${page}&limit=${limit}&status=${JobStatus.IN_PROGRESS}${`&startDate=${startDate ?? ''}`}${`&endDate=${endDate ?? ''}`}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getTaskBoardInReviewJobs = createAsyncThunk(
	'taskBoard/getTaskBoardInReviewJobs',
	async ({ limit, page, startDate, endDate, isTeamModule }: ApiParamsType, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/${isTeamModule ? 'team' : 'agency'}/taskboard?page=${page}&limit=${limit}&status=${JobStatus.IN_REVIEW}${`&startDate=${startDate ?? ''}`}${`&endDate=${endDate ?? ''}`}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getTaskBoardCompletedJobs = createAsyncThunk(
	'taskBoard/getTaskBoardCompletedJobs',
	async ({ limit, page, startDate, endDate, isTeamModule }: ApiParamsType, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/${isTeamModule ? 'team' : 'agency'}/taskboard?page=${page}&limit=${limit}&status=${JobStatus.COMPLETED}${`&startDate=${startDate ?? ''}`}${`&endDate=${endDate ?? ''}`}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getJobsListExceptStatus = createAsyncThunk(
	'jobs/getJobsListExceptStatus',
	async (
		{
			exceptStatus,
			page,
			limit,
			search = '',
		}: {
			page: number;
			limit: number;
			search?: string;
			searchBy?: string;
			startDate?: string;
			exceptStatus: JobStatus;
			endDate?: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/agency/taskboard-status?page=${page}&limit=${limit}&status=${exceptStatus}&isRequired=true&search=${search}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const changeMultipleJobsStatus = createAsyncThunk(
	'taskBoard/changeMultipleJobsStatus',
	async ({ jobIds, status }: { jobIds: string[]; status: JobStatus }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`/job/bulk-status-update`, {
				jobIds,
				status,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const taskBoardSlice = createSlice({
	name: 'taskBoard',
	initialState,
	reducers: {
		setTaskboardJobsSearch: (state, action) => {
			state.modalJobs.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTaskBoardBackLogJobs.pending, (state) => {
				state.backlogJobs.loading = true;
				state.backlogJobs.error = null;
			})
			.addCase(getTaskBoardBackLogJobs.fulfilled, (state, action) => {
				state.backlogJobs.rows = action.payload.rows;
				state.backlogJobs.count = action.payload.count;
				state.backlogJobs.loading = false;
			})
			.addCase(getTaskBoardBackLogJobs.rejected, (state, action: any) => {
				state.backlogJobs.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.backlogJobs.loading = false;
			});

		builder
			.addCase(getTaskBoardInProgressJobs.pending, (state) => {
				state.inProgressJobs.loading = true;
				state.inProgressJobs.error = null;
			})
			.addCase(getTaskBoardInProgressJobs.fulfilled, (state, action) => {
				state.inProgressJobs.rows = action.payload.rows;
				state.inProgressJobs.count = action.payload.count;
				state.inProgressJobs.loading = false;
			})
			.addCase(getTaskBoardInProgressJobs.rejected, (state, action: any) => {
				state.inProgressJobs.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.inProgressJobs.loading = false;
			});

		builder
			.addCase(getTaskBoardInReviewJobs.pending, (state) => {
				state.inReviewJobs.loading = true;
				state.backlogJobs.error = null;
			})
			.addCase(getTaskBoardInReviewJobs.fulfilled, (state, action) => {
				state.inReviewJobs.rows = action.payload.rows;
				state.inReviewJobs.count = action.payload.count;
				state.inReviewJobs.loading = false;
			})
			.addCase(getTaskBoardInReviewJobs.rejected, (state, action: any) => {
				state.inReviewJobs.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.inReviewJobs.loading = false;
			});

		builder
			.addCase(getTaskBoardCompletedJobs.pending, (state) => {
				state.completedJobs.loading = true;
				state.completedJobs.error = null;
			})
			.addCase(getTaskBoardCompletedJobs.fulfilled, (state, action) => {
				state.completedJobs.rows = action.payload.rows;
				state.completedJobs.count = action.payload.count;
				state.completedJobs.loading = false;
			})
			.addCase(getTaskBoardCompletedJobs.rejected, (state, action: any) => {
				state.completedJobs.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.completedJobs.loading = false;
			});

		builder
			.addCase(getJobsListExceptStatus.pending, (state) => {
				state.modalJobs.loading = true;
				state.modalJobs.error = null;
			})
			.addCase(getJobsListExceptStatus.fulfilled, (state, action) => {
				state.modalJobs.rows = action.payload.rows;
				state.modalJobs.count = action.payload.count;
				state.modalJobs.loading = false;
			})
			.addCase(getJobsListExceptStatus.rejected, (state, action: any) => {
				state.modalJobs.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.modalJobs.loading = false;
			});
	},
});

export default taskBoardSlice.reducer;

export const { setTaskboardJobsSearch } = taskBoardSlice.actions;
