import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserProfileDataType } from '../../pages/SettingPage/Setting.page';
import { getToken } from '../../utils/getToken.util';
import toast from 'react-hot-toast';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + '/user';

interface InitialStateType {
	data: any;
	loading: boolean;
	error: string | null;
	userProfile: UserProfileDataType | null;
}

const initialState: InitialStateType = {
	data: null,
	loading: false,
	error: null,
	userProfile: null,
};

export const updateUserProfile = createAsyncThunk(
	'user/updateUserProfile',
	async (profileData: any) => {
		try {
			const token: any = await getToken();
			const response = await axios.put(apiBaseUrl + '/update-profile', profileData, token);
			return response.data.data;
		} catch (error: any) {
			return;
		}
	},
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Profile updated successfully');
				state.userProfile = action.payload;
				localStorage.setItem('user', JSON.stringify(action.payload));
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Handle the error
			});
	},
});

export default userSlice.reducer;
