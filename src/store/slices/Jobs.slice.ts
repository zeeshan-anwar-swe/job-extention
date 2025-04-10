import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { addOrRemoveObject, findObjectById } from '../../utils/helper';

interface InitialStateType {
	jobsList: any[];
	pageLoading: boolean;
	error: null | any;
	assignedCandidatesWhileCreatingJob: any[];
	assignedClientWhileCreatingJob: any | null;
	jobDetails: any | null;
}

const initialState: InitialStateType = {
	jobsList: [],
	assignedCandidatesWhileCreatingJob: [],
	assignedClientWhileCreatingJob: null,
	jobDetails: null,
	pageLoading: false,
	error: null,
};

export const getJobsList = createAsyncThunk('jobs/getJobsList', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get('/job/recruiter/list');
		return response.data.data.rows;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Failed to change password');
	}
});

export const getJobDetails = createAsyncThunk(
	'jobs/getJobDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/job/detail/' + id);
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
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
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

export const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		setAssignedCandidatesWhileCreatingJob: (state, action: PayloadAction<any[]>) => {
			state.assignedCandidatesWhileCreatingJob = action.payload;
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

		setJobDetailsById: (state, action: PayloadAction<string>) => {
			state.jobDetails = findObjectById(state.jobsList, action.payload);
		},

		setJobDetails: (state, action: PayloadAction<any>) => {
			state.assignedCandidatesWhileCreatingJob = action.payload;
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
				state.jobsList = action.payload;
			})
			.addCase(getJobsList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
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
			.addCase(getJobDetails.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
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
			.addCase(createJobs.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
				toast.error(action.error.message as string);
			});
	},
});

export const {
	setAssignedCandidatesWhileCreatingJob,
	assignCandidateWhileCreatingJob,
	setClientWhileCreatingJob,
	setJobDetailsById,
	setJobDetails,
} = jobsSlice.actions;
export default jobsSlice.reducer;
