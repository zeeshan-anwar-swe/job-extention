import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { withAsyncThunkErrorHandler } from "../../../utils/withAsyncThunkErrorHandler";
import { TeamJobsInitialStateType } from "../../../types/slices.type/team/jobs.slice.type";
import { updateJobStatusByResponse } from "../../../utils/rtkHelper/jobs.slice.helper";

const initialState: TeamJobsInitialStateType = {
  jobList: { loading: false, error: null, rows: [], count: 0, search: "" },
};

export const getTeamJobs = createAsyncThunk(
  "teamJobs/getTeamJobs",
  async (
    {
      page,
      limit,
      search = "",
      searchBy = "",
    }: { page: number; limit: number; search?: string; searchBy?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `/job/team-member/list?page=${page}&limit=${limit}&search=${search}${searchBy && `&searchBy=${searchBy}`}`,
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const changeTeamJobStatus = createAsyncThunk(
  "teamJobs/changeJobStatus",
  async (
    { jobId, status }: { jobId: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put("/job/status/" + jobId, {
        status,
      });
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

const teamJobsSlice = createSlice({
  name: "teamJobs",
  initialState,
  reducers: {
    setTeamJobsSearch(state, action: PayloadAction<string>) {
      state.jobList.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamJobs.pending, (state) => {
        state.jobList.loading = true;
        state.jobList.error = null;
      })
      .addCase(getTeamJobs.fulfilled, (state, action) => {
        state.jobList.rows = action.payload.rows;
        state.jobList.count = action.payload.count;
        state.jobList.loading = false;
      })
      .addCase(getTeamJobs.rejected, (state, action: any) => {
        state.jobList.error = action.payload || {
          message: "Unknown error occurred ",
        };
        toast.error(
          (action.payload.message as string) || "Unknown error occurred ",
        );
        state.jobList.loading = false;
      });

    builder
      .addCase(changeTeamJobStatus.pending, (state) => {
        state.jobList.error = null;
      })
      .addCase(changeTeamJobStatus.fulfilled, (state, action) => {
        state.jobList.rows = updateJobStatusByResponse(
          state.jobList.rows,
          action.payload,
        );
        toast.success("JobStatus is updated to " + action.payload.status);
      })
      .addCase(changeTeamJobStatus.rejected, (state, action: any) => {
        state.jobList.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
        toast.error(action.payload.message);
      });
  },
});

export const { setTeamJobsSearch } = teamJobsSlice.actions;
export default teamJobsSlice.reducer;
