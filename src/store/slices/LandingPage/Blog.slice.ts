import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import axiosInstanceNoAuth from '../../../utils/axiosInstanceNoAuth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TBlogInitialState } from '../../../types/slices.type/agency/blog.slice.type';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';

const initialState: TBlogInitialState = {
	blogPosts: { loading: true, error: null, count: 0, rows: [], search: '', tab: 'view-all' },
	blogDetails: { loading: false, error: null, data: null },
	blogCategoryList: { loading: true, error: null, count: 0, rows: [], search: '' },
	blogCategoryDetails: { loading: false, error: null, data: null },
};

export const getBlogCategoryList = createAsyncThunk(
	'blog/getBlogCategoryList',
	async (
		{ page, limit, search }: { limit: number; page: number; search?: string },
		{ rejectWithValue },
	) => {
		try {
			const url = search
				? `/blogs/categories/list?page=${page}&limit=${limit}&search=${search}`
				: `/blogs/categories/list?page=${page}&limit=${limit}`;
			const response = await axiosInstanceNoAuth.get(url);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getBlogCategoryDetails = createAsyncThunk(
	'blog/getBlogCategoryDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstanceNoAuth.get(`/blogs/categories/${id}`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getBlogPosts = createAsyncThunk(
	'blog/getBlogPosts',
	async (
		{ page, limit, search }: { limit: number; page: number; search?: string },
		{ rejectWithValue },
	) => {
		try {
			const url = search
				? `/blogs?page=${page}&limit=${limit}&search=${search}`
				: `/blogs?page=${page}&limit=${limit}`;
			const response = await axiosInstanceNoAuth.get(url);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getBlogPostDetails = createAsyncThunk(
	'blog/getBlogPostDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstanceNoAuth.get(`/blogs/${id}`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		setBlogSearch: (state, action: PayloadAction<string>) => {
			state.blogPosts.search = action.payload;
		},
		setBlogTab: (state, action: PayloadAction<string>) => {
			state.blogPosts.tab = action.payload;
		},
		setBlogCategorySearch: (state, action: PayloadAction<string>) => {
			state.blogCategoryList.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBlogCategoryList.pending, (state) => {
				state.blogCategoryList.loading = true;
				state.blogCategoryList.error = null;
			})
			.addCase(getBlogCategoryList.fulfilled, (state, action) => {
				state.blogCategoryList.rows = action.payload.rows;
				state.blogCategoryList.count = action.payload.count;
				state.blogCategoryList.loading = false;
			})
			.addCase(getBlogCategoryList.rejected, (state, action: any) => {
				state.blogCategoryList.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.blogCategoryList.loading = false;
			});

		builder
			.addCase(getBlogCategoryDetails.pending, (state) => {
				state.blogCategoryDetails.loading = true;
				state.blogCategoryDetails.error = null;
			})
			.addCase(getBlogCategoryDetails.fulfilled, (state, action) => {
				state.blogCategoryDetails.data = action.payload;
				state.blogCategoryDetails.loading = false;
			})
			.addCase(getBlogCategoryDetails.rejected, (state, action: any) => {
				state.blogCategoryDetails.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.blogCategoryDetails.loading = false;
			});

		builder
			.addCase(getBlogPosts.pending, (state) => {
				state.blogPosts.loading = true;
				state.blogPosts.error = null;
			})
			.addCase(getBlogPosts.fulfilled, (state, action) => {
				state.blogPosts.rows = action.payload.rows;
				state.blogPosts.count = action.payload.count;
				state.blogPosts.loading = false;
			})
			.addCase(getBlogPosts.rejected, (state, action: any) => {
				state.blogPosts.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.blogPosts.loading = false;
			});

		builder
			.addCase(getBlogPostDetails.pending, (state) => {
				state.blogDetails.loading = true;
				state.blogDetails.error = null;
			})
			.addCase(getBlogPostDetails.fulfilled, (state, action) => {
				state.blogDetails.data = action.payload;
				state.blogDetails.loading = false;
			})
			.addCase(getBlogPostDetails.rejected, (state, action: any) => {
				state.blogDetails.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.blogDetails.loading = false;
			});
	},
});

export const { setBlogSearch, setBlogCategorySearch, setBlogTab } = blogSlice.actions;
export default blogSlice.reducer;
