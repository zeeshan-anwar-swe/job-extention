import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const initialState = {
	data: null,
	loading: false,
	error: null,
};

// Define the async thunk
export const getUserData = createAsyncThunk('user/getUserData', async () => {
	const response = await axios.get(apiBaseUrl);
});

export const asyncSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserData.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
	},
});

// export const { resetState } = asyncSlice.actions;

export default asyncSlice.reducer;
