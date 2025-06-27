import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';
import { ChatInitialStateType } from '../../types/slices.type/chat/chat.slice.type';

const initialState:ChatInitialStateType  = {
    chatData: { loading: false, error: null, rows: [], count: 0 },
};

export const getChatData = createAsyncThunk(
    'Chat/getChatData', 
    async ({page=1, limit=10}: { page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/chat/inbox?limit=${limit}&page=${page}`);
            return response.data.data;
        } catch (error: any) {
            return await withAsyncThunkErrorHandler(error, rejectWithValue);
        }
    },
);

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(getChatData.pending, (state) => {
                state.chatData.loading = true;
                state.chatData.error = null;
            })
            .addCase(getChatData.fulfilled, (state, action) => {
                state.chatData.rows = action.payload.rows;
                state.chatData.count = action.payload.count;
                state.chatData.loading = false;
            })
            .addCase(getChatData.rejected, (state, action: any) => {
                state.chatData.error = action.payload || {
                    message: 'Unknown error occurred ',
                };
                toast.error((action.payload.message as string) || 'Unknown error occurred ');
                state.chatData.loading = false;
            });
    },
});

export default chatSlice.reducer;
