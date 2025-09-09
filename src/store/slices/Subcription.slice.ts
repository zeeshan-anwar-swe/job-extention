import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axiosInstanceNoAuth from '../../utils/axiosInstanceNoAuth';
import toast from 'react-hot-toast';
import { SubcriptionInitialStateType } from '../../types/slices.type/subcription.slice.type';

const initialState: SubcriptionInitialStateType = {
	userSubscription: {
		loading: false,
		error: null,
		data: {
			subscription: null,
			invoices: [],
		},
	},
	subscriptionPlans: {
		loading: false,
		error: null,
		data: [],
	},
};

export const getUserSubscription = createAsyncThunk(
	'subscription/getUserSubscription',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/stripe-payment/user-subscription');
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getSubscriptionPlan = createAsyncThunk(
	'subscription/getSubscriptionPlan',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstanceNoAuth.get('/stripe-payment/plans');
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserSubscription.pending, (state) => {
				state.userSubscription.loading = true;
				state.userSubscription.error = null;
			})
			.addCase(getUserSubscription.fulfilled, (state, action) => {
				state.userSubscription.data = action.payload;
				state.userSubscription.loading = false;
			})
			.addCase(getUserSubscription.rejected, (state, action: any) => {
				state.userSubscription.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
				state.userSubscription.loading = false;
			});

		builder
			.addCase(getSubscriptionPlan.pending, (state) => {
				state.subscriptionPlans.loading = true;
				state.subscriptionPlans.error = null;
			})
			.addCase(getSubscriptionPlan.fulfilled, (state, action) => {
				state.subscriptionPlans.data = action.payload;
				state.subscriptionPlans.loading = false;
			})
			.addCase(getSubscriptionPlan.rejected, (state, action: any) => {
				state.subscriptionPlans.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
				state.subscriptionPlans.loading = false;
			});
	},
});

export default subscriptionSlice.reducer;
