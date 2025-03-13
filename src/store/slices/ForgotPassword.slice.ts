import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
	resetToken: string | null;
	selectedEmail: string | null;
	formType: string;
}

const initialState: InitialStateType = {
	resetToken: null,
	selectedEmail: null,
	formType: 'login',
};

export const forgotPasswrodSlice = createSlice({
	name: 'forgotPasswrod',
	initialState,
	reducers: {
		setResetToken: (state, action: PayloadAction<string | null>) => {
			state.resetToken = action.payload;
		},
		setSelectedEmail: (state, action: PayloadAction<string | null>) => {
			state.selectedEmail = action.payload;
		},
		setFormType: (state, action: PayloadAction<string>) => {
			state.formType = action.payload;
		},
		clearForgotPasswordState: (state) => {
			state.resetToken = null;
			state.selectedEmail = null;
			state.formType = 'login';
		},
	},
});

export const { setResetToken, setSelectedEmail, setFormType, clearForgotPasswordState } =
	forgotPasswrodSlice.actions;
export default forgotPasswrodSlice.reducer;
