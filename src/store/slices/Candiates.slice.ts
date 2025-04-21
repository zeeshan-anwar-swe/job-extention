import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';

interface InitialStateType {
	candidatesList: any[];
	allCadidateList: any[];
	pageLoading: boolean;
	paginationCount: number;
	error: null | Error | any;
	componentLoading: boolean;
	cadnidateProfile: any | null;
}

const initialState: InitialStateType = {
	allCadidateList: [],
	pageLoading: false,
	componentLoading: false,
	paginationCount: 0,
	cadnidateProfile: null,
	candidatesList: [],
	error: null,
};

export const getAgencyCandidatesList = createAsyncThunk(
	'candidates/getAgencyCandidatesList',
	async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/agency/candidates?page=${page}&limit=${limit}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getFilteredCandidates = createAsyncThunk(
	'candidates/getFilteredCandidates',
	async (
		{
			location = '',
			experiences = [],
			skills = [],
		}: { location?: string; experiences?: number[]; skills?: string[] },
		{ rejectWithValue },
	) => {
		try {
			const url = '/candidate/list';
			const response = await axiosInstance.post('/candidate/list', {
				location,
				experiences,
				skills,
			});
			if (response.data.data.rows.length < 1) {
				toast.error('No candidates found');
				return [];
			} else {
				return response.data.data;
			}
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getAllCandidatesList = createAsyncThunk(
	'candidates/getAllCandidatesList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`/candidate/list`);
			return response.data.data.rows;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const assignJobToCandidate = createAsyncThunk(
	'candidates/assignJobToCandidate',
	async ({ jobId, candidateId }: { jobId: string; candidateId: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/candidate/assign-job', {
				jobId,
				candidateId,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getCandidateProfile = createAsyncThunk(
	'candidates/getCandidateProfile',
	async ({ candidateId, id }: { candidateId: string; id: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`candidate/profile?id=${id}&candidateId=${candidateId}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const updateCandidateProfile = createAsyncThunk(
	'candidates/updateCandidateProfile',
	async (
		{ candidateId, payload }: { candidateId: string; payload: any },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.put(
				'candidate/profile/edit/' + candidateId,
				payload,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const candidatesSlice = createSlice({
	name: 'candidates',
	initialState,
	reducers: {
		setCandidateProfile: (state, action: PayloadAction<any>) => {
			state.cadnidateProfile = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAgencyCandidatesList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAgencyCandidatesList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.candidatesList = action.payload.rows;
				state.paginationCount = action.payload.count;
			})
			.addCase(getAgencyCandidatesList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
			})

			.addCase(getFilteredCandidates.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getFilteredCandidates.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.candidatesList = action.payload;
			})
			.addCase(getFilteredCandidates.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
			})

			.addCase(getAllCandidatesList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAllCandidatesList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.allCadidateList = action.payload;
			})
			.addCase(getAllCandidatesList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
			})

			.addCase(getCandidateProfile.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getCandidateProfile.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.cadnidateProfile = action.payload;
			})
			.addCase(getCandidateProfile.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
			})

			.addCase(updateCandidateProfile.pending, (state) => {
				state.componentLoading = true;
				state.error = null;
			})
			.addCase(updateCandidateProfile.fulfilled, (state) => {
				state.componentLoading = false;
				toast.success('Profile updated successfully');
			})
			.addCase(updateCandidateProfile.rejected, (state, action) => {
				state.componentLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
			})

			.addCase(assignJobToCandidate.pending, (state) => {
				state.error = null;
			})
			.addCase(assignJobToCandidate.fulfilled, () => {
				toast.success('Job is assigned successfully');
			})
			.addCase(assignJobToCandidate.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(
					(action.payload.message as string) ||
						'Unknown error occurred while inviting client',
				);
			});
	},
});

export const { setCandidateProfile } = candidatesSlice.actions;
export default candidatesSlice.reducer;
