import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { withAsyncThunkErrorHandler } from "../../utils/withAsyncThunkErrorHandler";
import {
  CandidateProfile,
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
  location?: FilterOptionLocation[];
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

export const getFilteredCandidates = createAsyncThunk(
  "candidates/getFilteredCandidates",
  async (
    {
      page = 1,
      limit = 10,
      location = [],
      tenure = { min: 0, max: 0 },
      skills = [],
      keywords = "",
    }: {
      page?: number;
      limit?: number;
      location?: FilterOptionLocation[];
      tenure?: FilterOptionTenure;
      skills?: string[];
      keywords?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `/unipile-linkedin/search?page=${page}&limit=${limit}`,
        {
          location,
          keywords,
          tenure,
          skills,
        },
      );
      if (response.data.data.data.length < 1) {
        toast.error("No candidates found");
      }
      return response.data.data;
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
    { page, limit, filterOptions, candidateSource }: GetAllCandidatesParamsType,
    { rejectWithValue },
  ) => {
    try {
      const url = `/unipile-linkedin/search?page=${page}&limit=${limit}${
        candidateSource ? `&source=${candidateSource}` : ""
      }`;
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
    {
      page,
      limit,
      cursor,
      filterOptions,
      candidateSource,
    }: GetMoreCandidatesParamsType,
    { rejectWithValue },
  ) => {
    try {
      const url = `/unipile-linkedin/search?page=${page}&limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`;

      const newUrl = candidateSource ? `${url}&source=${candidateSource}` : url;

	  console.log({newUrl});
      const response = await axiosInstance.post(newUrl, filterOptions);
	  

      return response.data.data;
    } catch (error: any) {
      return withAsyncThunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setCandidateSource: (state, action: PayloadAction<TCandidateSource>) => {
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

      .addCase(getFilteredCandidates.pending, (state) => {
        state.pageLoading = true;
        state.error = null;
      })
      .addCase(getFilteredCandidates.fulfilled, (state, action) => {
        state.allCadidateList = [];
        state.filteredCandidate = action.payload.data;
        state.paginationCount = action.payload.count;
        state.pageLoading = false;
      })
      .addCase(getFilteredCandidates.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.payload || {
          message: "Unknown error occurred while inviting client",
        };
      })

      .addCase(getAllCandidatesList.pending, (state) => {
        state.pageLoading = true;
        state.error = null;
      })
      .addCase(getAllCandidatesList.fulfilled, (state, action) => {
        state.filteredCandidate = [];
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
        state.filteredCandidate = [];
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
  setLoactionLoading,
  setCandidateSource,
  setCandidateProfile,
  setCandidatesSearch,
  setCandidatesLocations,
  setCandidatesFilterOptions,
} = candidatesSlice.actions;
export default candidatesSlice.reducer;
