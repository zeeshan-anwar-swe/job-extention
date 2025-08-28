import { createContext, FC, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { authPages } from '../config/pages.config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setResetToken, setFormType } from '../store/slices/ForgotPassword.slice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { Roles, RolesType } from '../constants/role.enums';
import useDarkMode from '../hooks/useDarkMode';
import { log } from 'console';

export interface IAuthContextProps {
	userTokenStorage: string | null;
	userStorage: {
		id: string;
		firstName: string;
		email: string;
		about?: string;
		lastName: string;
		industry?: string;
		role: Roles;
		image?: string;
	};
	onLogin: (username: string, password: string) => Promise<void>;
	onOTPVerify: (otpCode: string) => void;
	onResetPassword: (newPassword: string) => void;
	onForgot: ({ email }: { email: string }) => void;
	onPasswordSet: ({ password, token }: { password: string; token: string }) => Promise<void>;
	onSignUp: (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	) => Promise<void>;
	onLogout: () => void;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE;

	const dispatch: AppDispatch = useDispatch();

	const selectedEmail = useRef('');
	const resetToken = useRef('');

	const { setDarkModeStatus } = useDarkMode();

	const [userTokenStorage, setUserToken] = useLocalStorage('token', null);
	const [userStorage, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();

	const onLogin = async (username: string, password: string) => {
		try {
			const response = await axios.post(apiBaseUrl + '/user/login', {
				email: username,
				password,
			});

			if (response.data.success) {
				console.log(response.data);

				if (response.data.data.user.role === Roles.CLIENT) {
					toast.error("Client Don't have permission to login here");
				} else {
					if (typeof setUser === 'function') {
						await setUser(response.data.data.user);
					}
					if (typeof setUserToken === 'function') {
						await setUserToken(response.data.data.token);
						toast.success('Login Successfully');
						navigate('/');
					}
				}
			}
		} catch (e: any) {
			if (e.response?.status === 401) {
				toast.error(e?.response?.data?.message || 'Invalid credentials');
				throw e; // Throw the error to be caught in the component
			}

			if (e.response?.status === 500) {
				toast.error(e.response.data.message);
			}
			console.error(e);
			throw e; // Throw the error to be caught in the component
		}
	};

	const onForgot = ({ email }: { email: string }) => {
		axios
			.post(apiBaseUrl + '/user/forgot-password', {
				email,
			})
			.then(() => (selectedEmail.current = email))
			.then(() => toast.success('OTP is sended'))
			.then(() => dispatch(setFormType('otp')))
			.catch((e) => {
				toast.error(e?.response?.data?.message);
				console.error(e);
			});
	};

	const onOTPVerify = (otpCode: string) => {
		if (!selectedEmail.current) {
			toast.error('Email not found!');
			return;
		}
		axios
			.post(apiBaseUrl + '/user/verify-otp', {
				email: selectedEmail.current,
				otpCode,
			})
			.then((response) => (resetToken.current = response.data.data.resetToken))
			.then(() => toast.success('OTP Verified'))
			.then(() => dispatch(setFormType('reset')))
			.catch((e) => {
				if (e.response.status === 500) {
					toast.error(e?.response?.data?.message);
				}
				console.error(e);
			});
	};

	const onResetPassword = (newPassword: string) => {
		axios
			.post(apiBaseUrl + '/user/reset-password', {
				newPassword,
				resetToken: resetToken.current,
			})
			.then((response) => dispatch(setResetToken(response.data.data.resetToken)))
			.then(() => toast.success('Password changed successfully'))
			.then(() => dispatch(setFormType('login')))
			.catch((e) => {
				if (e.response.status === 500) {
					toast.error(e?.response?.data?.message);
				}
				console.error(e);
			});
	};

	const onSignUp = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	): Promise<void> => {
		try {
			const response = await axios.post(apiBaseUrl + '/user/register', {
				firstName,
				lastName,
				email,
				password,
			});

			if (response.data.success) {
				console.log('Signup successful:', response.data);

				navigate('/signup/confirmation', {
					state: { email },
				});
			} else {
				// Handle specific backend errors if provided
				if (response.data.message) {
					throw new Error(response.data.message);
				} else {
					throw new Error('Registration failed.');
				}
			}
		} catch (error: any) {
			console.error('Signup error:', error);
			let errorMessage = 'An unexpected error occurred during signup.';
			let errorCause: string | undefined;

			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error('Response data:', error.response.data);
				console.error('Response status:', error.response.status);
				if (error.response.data && error.response.data.message) {
					errorMessage = error.response.data.message;
				}
				if (error.response.data && error.response.data.cause) {
					errorCause = error.response.data.cause;
				}
			} else if (error.request) {
				// The request was made but no response was received
				console.error('No response received:', error.request);
				errorMessage = 'Could not connect to the server.';
			} else {
				// Something happened in setting up the request that triggered an Error
				errorMessage = error.message;
			}

			// Optionally, you can re-throw the error with more context
			const enhancedError = new Error(errorMessage);
			enhancedError.cause = errorCause;
			throw enhancedError;
		}
	};
	// call this function to sign out logged-in user
	const onLogout = async () => {
		await localStorage.clear();
		navigate('/signin');
	};

	const onPasswordSet = async ({ password, token }: { password: string; token: string }): Promise<void> => {
		try {
			const response = await axios.post(apiBaseUrl + '/user/set-password', {
				password,
				token,
			});

			if (response.data.success) {
				console.log('Password setup successful:', response.data);
			} else {
				// Handle specific backend errors if provided
				if (response.data.message) {
					throw new Error(response.data.message);
				} else {
					throw new Error('Registration failed.');
				}
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message);
			console.error('password setup error:', error);
			throw error;
		}
	};

	const value: IAuthContextProps = useMemo(
		() => ({
			userStorage: userStorage || {
				firstName: '',
				industry: '',
				lastName: '',
				role: Roles.AGENCY_ADMIN,
				image: '',
				about: '',
				email: '',
				id: '',
			},
			userTokenStorage,
			onResetPassword,
			onSignUp,
			onLogin,
			onLogout,
			onOTPVerify,
			onForgot,
			onPasswordSet,
		}),
		[userStorage, userTokenStorage],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
