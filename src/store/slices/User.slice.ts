import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';
import axiosInstanceSoft from '../../utils/axiosInstanceSoft';

interface InitialStateType {
	data: any;
	loading: boolean;
	passwordChangeLoading: boolean;
	passwordError: string | null;
	error: string | null;
	userProfile: {
		firstName: string;
		email: string;
		about?: string;
		lastName: string;
		industry?: string;
		role: string;
		image?: string;
		location: string | null;
		experience: string | null;
		dob: string | null;
	};
}

const initialState: InitialStateType = {
	data: null,
	passwordError: null,
	passwordChangeLoading: false,
	loading: false,
	error: null,
	userProfile: {
		firstName: '',
		email: '',
		about: '',
		lastName: '',
		industry: '',
		role: '',
		image: '',
		dob: '',
		experience: '',
		location: '',
	},
};

export const getMyProfile = createAsyncThunk(
	'user/getMyProfile',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('user/me');
			return response.data.data;
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Failed to update profile');
			withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const sendEmail = createAsyncThunk(
	'user/sendEmail',
	async (
		{ name, email, message }: { name: string; email: string; message: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.post('/user/contact-us', {
				name,
				email,
				message,
			});
			toast.success('Message sent successfully!');
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Failed to update profile');
			withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const updateUserProfile = createAsyncThunk(
	'user/updateUserProfile',
	async (profileData: any) => {
		try {
			const response = await axiosInstance.put('/user/update-profile', profileData);
			return response.data.data;
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Failed to update profile');
			throw error;
		}
	},
);

export const changeUserPassword = createAsyncThunk(
	'user/changeUserPassword',
	async (passwordData: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstanceSoft.post('/user/change-password', passwordData);
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setPasswordError: (state, action) => {
			state.passwordError = action.payload;
		},
		setUserProfileData: (state, action) => {
			state.userProfile = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(getMyProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getMyProfile.fulfilled, (state, action) => {
				state.userProfile = action.payload;
				localStorage.setItem('user', JSON.stringify(action.payload));
				state.loading = false;
			})
			.addCase(getMyProfile.rejected, (state) => {
				state.loading = false;
				state.error = null;
			})

			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				localStorage.setItem('user', JSON.stringify(action.payload));
				state.userProfile = action.payload;
				toast.success('Profile updated successfully');
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Handle the error
			})

			.addCase(changeUserPassword.pending, (state) => {
				state.passwordChangeLoading = true;
				state.passwordError = null;
			})
			.addCase(changeUserPassword.fulfilled, (state, action) => {
				state.passwordChangeLoading = false;
				localStorage.setItem('token', JSON.stringify(action.payload.token));
				toast.success('Password updated successfully');
			})
			.addCase(changeUserPassword.rejected, (state, action) => {
				state.passwordError = action.payload as string;
				state.passwordChangeLoading = false;
				toast.error(action.payload as string);
			});
	},
});

export const { setPasswordError, setUserProfileData } = userSlice.actions;

export default userSlice.reducer;
