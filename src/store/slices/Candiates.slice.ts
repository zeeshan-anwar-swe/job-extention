import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import axiosInstanceCustomToken from "../../utils/axiosInstanceCustomToken";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { withAsyncThunkErrorHandler } from "../../utils/withAsyncThunkErrorHandler";
import {
  GetAllCandidatesParamsType,
  GetMoreCandidatesParamsType,
  TCandidateListItem,
} from "../../types/slices.type/candidate.slice.type";

type UseType = "cursor" | "page";

export interface NextType {
  dbOffset: number;
  page: number;
  unipileCursor: string | null;
  use: UseType;
}

interface FilterOptionLocation {
  id: string;
  title: string;
}

interface FilterOptionTenure {
  min: number;
  max: number;
}

export interface FilterOptionsType {
  keywords?: string;
  skills?: string[];
  tenure?: FilterOptionTenure;
  location: FilterOptionLocation[];
}

export interface LocationTypeBase {
  title: string;
  object: string;
}

export type LocationType =
  | (LocationTypeBase & { id: string; locationId: never })
  | (LocationTypeBase & { locationId: string; id: never });

export interface LinkedInProfile {
  id: string;
  experience?: number;
  recordId: string;
  name: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  industry: string;
  profileUrl: string;
  publicProfileUrl: string;
  profilePictureUrl: string;
  profilePictureUrlLarge: string;
  connectionsCount: number;
  networkDistance: string;
  canSendInmail: boolean;
  recruiterCandidateId: string;
  hiddenCandidate: null;
  interestLikelihood: null;
  summary: string;
  privacySettings: null;
  skills: {
    name: string;
    endorsement_count: number;
  }[];
  languages: any[]; // Could be more specific if language structure is known
  projects: any[]; // Could be more specific if project structure is known
  certifications: {
    end: {
      year: number;
      month: number;
    };
    name: string;
    start: {
      year: number;
      month: number;
    };
    organization: string;
    organization_id: string;
    url?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  education: {
    id: string;
    linkedinId: string;
    degree: string;
    school: string;
    schoolId: string;
    fieldOfStudy: string;
    start: null | {
      year: number;
      month: number;
    };
    end: null | {
      year: number;
      month: number;
    };
    schoolDetails: {
      url: string;
      logo: string;
      name: string;
      location: string;
      description: string;
      employeeCount: number;
    };
    createdAt: string;
    updatedAt: string;
  }[];
  workExperience: {
    id: string;
    linkedinId: string;
    company: string;
    companyId: string | null;
    companyUrl: string | null;
    industry: string | null;
    location: string | null;
    role: string;
    start: {
      year: number;
      month: number;
    };
    end: {
      year: number;
      month: number;
    } | null;
    description: string | null;
    skills: {
      name: string;
      endorsement_count: number;
    }[];
    logo: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
}

export type TCandidateSource = "custom" | "linkedin";

interface InitialStateType {
  next: NextType | null;
  searchBy: string;
  search: string;
  filterOptions: FilterOptionsType;
  candidatesList: TCandidateListItem[];
  filteredCandidate: any[];
  csvData: any[];
  location: {
    loading: boolean;
    rows: LocationType[];
    count: number;
    error: null | Error | any;
  };
  candidateSource: TCandidateSource;
  allCadidateList: LinkedInProfile[];
  pageLoading: boolean;
  modalLoading: boolean;
  paginationCount: number;
  error: null | Error | any;
  componentLoading: boolean;
  cadnidateProfile: any | null;
}

const initialState: InitialStateType = {
  next: {
    dbOffset: 0,
    page: 1,
    unipileCursor: null,
    use: "page",
  },
  candidateSource: "linkedin",
  search: "",
  searchBy: "",

  filterOptions: {
    keywords: "",
    skills: [],
    location: [],
    tenure: { min: 0, max: 0 },
  },

  location: {
    rows: [],
    count: 0,
    error: null,
    loading: false,
  },
  allCadidateList: [],
  filteredCandidate: [],
  csvData: [],
  modalLoading: false,
  pageLoading: false,
  componentLoading: false,
  paginationCount: 0,
  cadnidateProfile: null,
  candidatesList: [],
  error: null,
};

export const getLocationForCandidates = createAsyncThunk(
  "candidates/getLocationForCandidates",
  async (
    {
      page,
      limit,
      keywords,
    }: { page: number; limit: number; keywords: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `/unipile-linkedin/location?page=${page}&limit=${limit}`,
        { keywords },
      );

      console.log("response.data.data", response.data.data);

      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getAgencyCandidatesList = createAsyncThunk(
  "candidates/getAgencyCandidatesList",
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
        `/agency/test/candidates?page=${page}&limit=${limit}&search=${search}${searchBy && `&searchBy=${searchBy}`}`,
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getSearchedAgencyCandidatesList = createAsyncThunk(
  "candidates/getSearchedAgencyCandidatesList",
  async (
    {
      page,
      limit,
      search = "",
    }: { page: number; limit: number; search?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `/agency/test/candidates?page=${page}&limit=${limit}&search=${search}`,
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getAgencyCandidatesCsvList = createAsyncThunk(
  "candidates/getAgencyCandidatesCsvList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/agency/candidates?fetchAll=true",
      );
      return response.data.data.rows;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getTeamCandidatesCsvList = createAsyncThunk(
  "candidates/getTeamCandidatesCsvList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/team/test/candidates?fetchAll=true",
      );
      return response.data.data.rows;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const assignJobToCandidate = createAsyncThunk(
  "candidates/assignJobToCandidate",
  async (
    { jobId, assignTo }: { jobId: string; assignTo: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/linkedin-candidate/assign-job",
        {
          jobId,
          candidateId: assignTo,
        },
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const unAssignJobToCandidate = createAsyncThunk(
  "candidates/unAssignJobToCandidate",
  async (
    { jobId, unAssignTo }: { jobId: string; unAssignTo: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/linkedin-candidate/unassign-job",
        {
          jobId,
          candidateId: unAssignTo,
        },
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const assignClientToCandidate = createAsyncThunk(
  "candidates/assignJobToCandidate",
  async (
    { clientId, assignTo }: { clientId: string; assignTo: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/linkedin-candidate/assign-job",
        {
          jobId: clientId,
          candidateId: assignTo,
        },
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getCandidateProfile = createAsyncThunk(
  "candidates/getCandidateProfile",
  async (
    { candidateId, id }: { candidateId: string; id: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `linkedin-candidate/profile?id=${id}&candidateId=${candidateId}`,
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const removeAgencyCandidate = createAsyncThunk(
  "candidates/removeAgencyCandidate",
  async (candidateId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        "linkedin-candidate/remove/" + candidateId,
      );
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const updateCandidateProfile = createAsyncThunk(
  "candidates/updateCandidateProfile",
  async ({ payload }: { payload: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "linkedin-candidate/profile/create-or-update/",
        payload,
      );

      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getAllCandidatesList = createAsyncThunk(
  "candidates/getAllCandidatesList",
  async (
    { page, limit, filterOptions }: GetAllCandidatesParamsType,
    { rejectWithValue },
  ) => {
    try {
      const url = `/unipile-linkedin/search?page=${page}&limit=${limit}`;
      const response = await axiosInstance.post(url, filterOptions);
      return response.data.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getMoreAllCandidatesList = createAsyncThunk(
  "candidates/getMoreAllCandidatesList",
  async (
    { page, limit, cursor, filterOptions }: GetMoreCandidatesParamsType,
    { rejectWithValue },
  ) => {
    try {
      const url = `/unipile-linkedin/search?page=${page}&limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`;
      const response = await axiosInstance.post(url, filterOptions);

      return response.data.data;
    } catch (error: any) {
      return withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const getCustomProfiles = createAsyncThunk(
  "candidates/getCustomProfiles",
  async (
    { page, limit, filterOptions }: GetAllCandidatesParamsType,
    { rejectWithValue },
  ) => {
    try {
      const newFilterOptions: {
        keywords: string;
        skills: string[];
        location: FilterOptionLocation[];
        tenure: FilterOptionTenure | null;
      } = {
        keywords: "",
        skills: [],
        location: [],
        tenure: { min: 0, max: 0 },
      };

      if (filterOptions) {
        newFilterOptions.keywords = filterOptions.keywords || "";
        newFilterOptions.skills = filterOptions.skills || [];
        newFilterOptions.location = filterOptions.location || [];
        if (filterOptions.tenure) {
          if (filterOptions.tenure?.min === 0) {
            newFilterOptions.tenure = null;
          } else {
            newFilterOptions.tenure = filterOptions.tenure;
          }
        }
      }

      const url = `/linkedin-candidate/custom-profile/list?page=${page}&limit=${limit}`;
      const response = await axiosInstance.post(
        url,
        filterOptions ? newFilterOptions : null,
      );
      return response.data.data;
    } catch (error: any) {
      return withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const inviteAndChangeCandidateStatus = createAsyncThunk(
  "candidates/inviteAndChangeCandidateStatus",
  async (
    {
      meetingLink,
      candidateId,
      status,
    }: { meetingLink: string; candidateId: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        `/linkedin-candidate/${candidateId}/status`,
        {
          status,
          meetingLink,
        },
      );
      return response.data;
    } catch (error: any) {
      return withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const assignManyCustomCanidatesToJob = createAsyncThunk(
  "candidates/assignManyCustomCanidatesToJob",
  async (
    { jobId, profileIds }: { jobId: string; profileIds: string[] },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/linkedin-candidate/assign-job/custom/many",
        {
          jobId,
          profileIds,
        },
      );
      return response.data;
    } catch (error: any) {
      return withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

// NEW Apis for showing/hiding candidate to client module
export const showSingleJobToClient = createAsyncThunk(
  "candidates/showSingleJobToClient",
  async (jobProfileId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/linkedin-candidate/${jobProfileId}/assign`,
      );
      toast.success("Candidate is shown to client for this job");
      return response.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const showAllJobToClient = createAsyncThunk(
  "candidates/showAllJobToClient",
  async (jobProfileId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/linkedin-candidate/${jobProfileId}/candidates/assign`,
      );
      toast.success("All jobs are shown to client");

      return response.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const hideSingleJobToClient = createAsyncThunk(
  "candidates/hideSingleJobToClient",
  async (jobProfileId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/linkedin-candidate/${jobProfileId}/unassign`,
      );
      toast.success("Job is hidden from client");

      return response.data;
    } catch (error: any) {
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);


export const uploadCandidateCV = createAsyncThunk(
  "candidates/uploadCandidateCV",
  async ({ formData, profileId }: { formData: FormData , profileId:string}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/linkedin-candidate/${profileId}/upload-cv`,
        formData,
      );

      return response.data.data;
    } catch (error: any) {
      toast.error("Error in uploading CV");
      return await withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);


// Candidate Slice

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setCandidateSource: (state, action: PayloadAction<TCandidateSource>) => {
      // state.pageLoading = true;
      state.candidateSource = action.payload;
    },
    setLoactionLoading: (state, action: PayloadAction<boolean>) => {
      state.location.loading = action.payload;
    },
    setCandidatesFilterOptions: (
      state,
      action: PayloadAction<FilterOptionsType>,
    ) => {
      state.filterOptions = action.payload;
    },
    setCandidateProfile: (state, action: PayloadAction<any>) => {
      state.cadnidateProfile = action.payload;
    },

    setCandidatesSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setCandidatesLocations: (state, action: PayloadAction<any[]>) => {
      state.location.rows = action.payload;
    },
    setAllCandidates: (state, action: PayloadAction<any[]>) => {
      state.allCadidateList = action.payload;
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
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(getLocationForCandidates.pending, (state) => {
        state.location.loading = true;
        state.location.error = null;
      })
      .addCase(getLocationForCandidates.fulfilled, (state, action) => {
        state.location.rows = action.payload.data;
        state.location.count = action.payload.count;
        state.location.loading = false;
      })
      .addCase(getLocationForCandidates.rejected, (state, action) => {
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
        state.location.loading = false;
      })

      .addCase(getSearchedAgencyCandidatesList.pending, (state) => {
        state.pageLoading = true;
        state.error = null;
      })
      .addCase(getSearchedAgencyCandidatesList.fulfilled, (state, action) => {
        state.candidatesList = action.payload.rows;
        state.paginationCount = action.payload.count;
        state.pageLoading = false;
      })
      .addCase(getSearchedAgencyCandidatesList.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(getAgencyCandidatesCsvList.pending, (state) => {
        state.modalLoading = true;
        state.error = null;
      })
      .addCase(getAgencyCandidatesCsvList.fulfilled, (state, action) => {
        state.csvData = action.payload;
        state.modalLoading = false;
      })
      .addCase(getAgencyCandidatesCsvList.rejected, (state, action) => {
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
        state.modalLoading = false;
      })



       .addCase(getTeamCandidatesCsvList.pending, (state) => {
        state.modalLoading = true;
        state.error = null;
      })
      .addCase(getTeamCandidatesCsvList.fulfilled, (state, action) => {
        state.csvData = action.payload;
        state.modalLoading = false;
      })
      .addCase(getTeamCandidatesCsvList.rejected, (state, action) => {
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
        state.modalLoading = false;
      })



      .addCase(getAllCandidatesList.pending, (state) => {
        state.pageLoading = true;
        state.error = null;
      })
      .addCase(getAllCandidatesList.fulfilled, (state, action) => {
        state.allCadidateList = action.payload.data;
        state.next = action.payload.next;
        state.pageLoading = false;
      })
      .addCase(getAllCandidatesList.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(getMoreAllCandidatesList.pending, (state) => {
        state.pageLoading = false;
        state.error = null;
      })
      .addCase(getMoreAllCandidatesList.fulfilled, (state, action) => {
        state.allCadidateList.push(...action.payload.data);
        state.next = action.payload.next;
        state.pageLoading = false;
      })
      .addCase(getMoreAllCandidatesList.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(getCustomProfiles.pending, (state) => {
        state.pageLoading = true;
        state.error = null;
        state.allCadidateList = [];
      })
      .addCase(getCustomProfiles.fulfilled, (state, action) => {
        state.allCadidateList = action.payload.rows;
        state.paginationCount = action.payload.count;
        state.pageLoading = false;
      })
      .addCase(getCustomProfiles.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
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
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(updateCandidateProfile.pending, (state) => {
        state.componentLoading = true;
        state.error = null;
      })
      .addCase(updateCandidateProfile.fulfilled, (state) => {
        state.componentLoading = false;
        toast.success("Profile updated successfully");
      })
      .addCase(updateCandidateProfile.rejected, (state, action) => {
        state.componentLoading = false;
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(assignJobToCandidate.pending, (state) => {
        state.error = null;
      })
      .addCase(assignJobToCandidate.fulfilled, () => {
        toast.success("Job is assigned successfully");
      })
      .addCase(assignJobToCandidate.rejected, (state, action: any) => {
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
        toast.error(
          (action.payload.message as string) ||
            "Unknown error occurred while inviting client",
        );
      })

      .addCase(removeAgencyCandidate.pending, (state) => {
        state.error = null;
      })
      .addCase(removeAgencyCandidate.fulfilled, () => {
        toast.success("cadndidate is removed");
      })
      .addCase(removeAgencyCandidate.rejected, (state, action: any) => {
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
        toast.error(
          (action.payload.message as string) ||
            "Unknown error occurred while inviting client",
        );
      });
  },
});

export const {
  setAllCandidates,
  setLoactionLoading,
  setCandidateSource,
  setCandidateProfile,
  setCandidatesSearch,
  setCandidatesLocations,
  setCandidatesFilterOptions,
} = candidatesSlice.actions;
export default candidatesSlice.reducer;
