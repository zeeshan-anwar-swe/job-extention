import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import {
	addOrRemoveObject,
	addOrRemoveObjectId,
	filterTeamMemberByName,
	findObjectById,
	searchObjectsByKeyAndValue,
	updateJobTeam,
} from '../../utils/helper';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';
import { updateJobStatusByResponse } from '../../utils/rtkHelper/jobs.slice.helper';
import { JobDetailsType } from '../../types/slices.type/jobs.slice.type';

interface InitialStateType {
	jobsList: any[];
	paginatedList: any[];
	componentLoading: boolean;
	pageLoading: boolean;
	error: null | string | any;
	searchedTeamListForJob: any[];
	teamListForJob: [];
	paginationCount: number;
	locallySearchedJobs: any[];
	assignedCandidatesWhileCreatingJob: any[];
	assignedCandidatesWhileUpdatingJob: any[];
	assignedClientWhileCreatingJob: any | null;
	jobDetails: JobDetailsType | null;
}

const initialState: InitialStateType = {
	jobsList: [],
	paginatedList: [],
	paginationCount: 0,
	teamListForJob: [],
	searchedTeamListForJob: [],
	locallySearchedJobs: [],
	assignedCandidatesWhileCreatingJob: [],
	assignedCandidatesWhileUpdatingJob: [],
	assignedClientWhileCreatingJob: null,
	jobDetails: null,
	pageLoading: false,
	componentLoading: false,
	error: null,
};

export const getJobsList = createAsyncThunk(
	'jobs/getJobsList',
	async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/job/recruiter/list?page=${page}&limit=${limit}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getAllJobsList = createAsyncThunk(
	'jobs/getAllJobsList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/job/recruiter/list`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getJobDetails = createAsyncThunk(
	'jobs/getJobDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/job/detail/' + id);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const createJobs = createAsyncThunk(
	'jobs/create',
	async (payload: { type: string; payload: void }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job', payload);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getTeamlistForJobs = createAsyncThunk(
	'team/getTeamlist',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/team/list');
			return response.data.data.rows;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const assignTeamMemberToJob = createAsyncThunk(
	'jobs/assignTeamMemberToJob',
	async ({ jobId, teamId }: { jobId: string; teamId: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job/assign-team', { jobId, teamId });
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const assignManyCandidatesToJob = createAsyncThunk(
	'jobs/assignManyCandidatesToJob',
	async (
		{ candidateIds, jobId }: { candidateIds: string[]; jobId?: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.post('/job/assign-job-candidates', {
				jobId,
				candidateIds,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const changeJobStatus = createAsyncThunk(
	'jobs/changeJobStatus',
	async ({ jobId, status }: { jobId: string; status: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put('/job/status/' + jobId, { status });
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		setSearchedTeamListForJob: (state, action: PayloadAction<string>) => {
			state.searchedTeamListForJob = filterTeamMemberByName(
				state.teamListForJob,
				action.payload,
			);
		},
		setAssignedCandidatesWhileCreatingJob: (state, action: PayloadAction<any[]>) => {
			state.assignedCandidatesWhileCreatingJob = action.payload;
		},

		setAssignedCandidatesWhileUpdatingJob: (state, action: PayloadAction<any[]>) => {
			state.assignedCandidatesWhileUpdatingJob = action.payload;
		},

		setClientWhileCreatingJob: (state, action: PayloadAction<any>) => {
			state.assignedClientWhileCreatingJob = action.payload;
		},

		assignCandidateWhileCreatingJob: (state, action: PayloadAction<any[]>) => {
			state.assignedCandidatesWhileCreatingJob = addOrRemoveObject(
				state.assignedCandidatesWhileCreatingJob,
				action.payload,
			);
		},

		assignCandidateWhileUpdatingJob: (state, action: PayloadAction<any[]>) => {
			state.assignedCandidatesWhileUpdatingJob = addOrRemoveObjectId(
				state.assignedCandidatesWhileUpdatingJob,
				action.payload,
			);
		},

		setJobDetailsById: (state, action: PayloadAction<string>) => {
			state.jobDetails = findObjectById(state.jobsList, action.payload);
		},

		setJobDetails: (state, action: PayloadAction<any>) => {
			state.assignedCandidatesWhileCreatingJob = action.payload;
		},

		searchStoredJobs: (state, action: PayloadAction<string>) => {
			state.locallySearchedJobs = searchObjectsByKeyAndValue({
				list: state.jobsList,
				key: 'title',
				value: action.payload,
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getJobsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getJobsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.paginatedList = action.payload.rows;
				state.paginationCount = action.payload.count;
			})
			.addCase(getJobsList.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			});

		builder
			.addCase(getAllJobsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAllJobsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.jobsList = action.payload.rows;
			})
			.addCase(getAllJobsList.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			});

		builder
			.addCase(getJobDetails.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getJobDetails.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.jobDetails = action.payload;
			})
			.addCase(getJobDetails.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			});

		builder
			.addCase(createJobs.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(createJobs.fulfilled, (state) => {
				state.pageLoading = false;
				toast.success('Job Created');
			})
			.addCase(createJobs.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			});

		builder
			.addCase(getTeamlistForJobs.pending, (state) => {
				state.error = null;
			})
			.addCase(getTeamlistForJobs.fulfilled, (state, action) => {
				state.teamListForJob = action.payload;
			})
			.addCase(getTeamlistForJobs.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			});

		builder
			.addCase(assignTeamMemberToJob.pending, (state) => {
				state.componentLoading = true;
				state.error = null;
			})
			.addCase(assignTeamMemberToJob.fulfilled, (state, action) => {
				toast.success('Team Member Assigned Successfully');
				const someVariable = action.payload.id;
				state.jobDetails && (state.jobDetails.team.id = someVariable);
				state.jobsList = updateJobTeam(
					state.teamListForJob,
					state.jobsList,
					action.payload,
				);
				state.componentLoading = false;
			})
			.addCase(assignTeamMemberToJob.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
				state.componentLoading = false;
			});

		builder
			.addCase(assignManyCandidatesToJob.pending, (state) => {
				state.componentLoading = true;
				state.error = null;
			})
			.addCase(assignManyCandidatesToJob.fulfilled, (state) => {
				toast.success('New candidate assigned Successfully');

				state.componentLoading = false;
			})
			.addCase(assignManyCandidatesToJob.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
				state.componentLoading = false;
			});

		builder
			.addCase(changeJobStatus.pending, (state) => {
				state.error = null;
			})
			.addCase(changeJobStatus.fulfilled, (state, action) => {
				state.jobDetails && (state.jobDetails.status = action.payload.status);
				state.paginatedList = updateJobStatusByResponse(
					state.paginatedList,
					action.payload,
				);
				toast.success('JobStatus is updated to ' + action.payload.status);
			})
			.addCase(changeJobStatus.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			});
	},
});

export const {
	setAssignedCandidatesWhileCreatingJob,
	setAssignedCandidatesWhileUpdatingJob,
	assignCandidateWhileUpdatingJob,
	assignCandidateWhileCreatingJob,
	setClientWhileCreatingJob,
	setSearchedTeamListForJob,
	setJobDetailsById,
	searchStoredJobs,
	setJobDetails,
} = jobsSlice.actions;
export default jobsSlice.reducer;
