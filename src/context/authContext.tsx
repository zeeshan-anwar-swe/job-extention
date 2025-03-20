import { createContext, FC, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { authPages } from '../config/pages.config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setResetToken, setFormType } from '../store/slices/ForgotPassword.slice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

export interface IAuthContextProps {
	userTokenStorage: string | null;
	userStorage: {
		firstName: string;
		email: string;
		about?: string;
		lastName: string;
		industry?: string;
		role: string;
		image?: string;
	};
	onLogin: (username: string, password: string) => Promise<void>;
	onOTPVerify: (otpCode: string) => void;
	onResetPassword: (newPassword: string) => void;
	onForgot: ({ email }: { email: string }) => void;
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

	const [userTokenStorage, setUserToken] = useLocalStorage('token', null);
	const [userStorage, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();

	const onLogin = async (username: string, password: string) => {
		const response = await axios
			.post(apiBaseUrl + '/user/login', {
				email: username,
				password,
			})

			.then(async (response) => {
				if (typeof setUser === 'function') {
					await setUser(response.data.data.user);
				}
				if (typeof setUserToken === 'function') {
					if (response.data.success) {
						await setUserToken(response.data.data.token).then(() => navigate('/'));
						toast.success('Login Successfully');
					}
				}
			})
			.catch((e) => {
				if (e.response.status === 500) {
					toast.error(e.response.data.message);
				}
				console.error(e);
			});
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
				if (e.response.status === 500) {
					toast.error(e?.response?.data?.message);
				}
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
	) => {
		axios
			.post(apiBaseUrl + '/user/register', {
				firstName,
				lastName,
				email,
				password,
			})
			.then((response) => {
				if (response.data.success) {
					if (typeof setUserToken === 'function' && typeof setUser === 'function') {
						setUserToken(response.data.data.token);
						setUser(response.data.data.user);
					}
					navigate('/');
				}
			})
			.catch((e) => {
				if (e.response.status === 500) {
					toast.error(e.response.data.message);
				}
			});
	};
	// call this function to sign out logged-in user
	const onLogout = async () => {
		navigate(`../${authPages.loginPage.to}`, { replace: true });
		if (typeof setUserToken === 'function') await setUserToken(null);
	};

	const value: IAuthContextProps = useMemo(
		() => ({
			userStorage: userStorage || {
				firstName: '',
				industry: '',
				lastName: '',
				role: '',
				image: '',
				about: '',
				email: '',
			},
			userTokenStorage,
			onResetPassword,
			onSignUp,
			onLogin,
			onLogout,
			onOTPVerify,
			onForgot,
		}),
		[userStorage, userTokenStorage],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
