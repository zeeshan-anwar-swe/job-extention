import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { authPages } from '../config/pages.config';
import useFakeUserAPI from '../mocks/hooks/useFakeUserAPI';
import { TUser } from '../mocks/db/users.db';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface IAuthContextProps {
	userTokenStorage: string | ((newValue: string | null) => void) | null;
	onLogin: (username: string, password: string) => Promise<void>;
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
	const [usernameStorage, setUserName] = useLocalStorage('user', null);
	const [userTokenStorage, setUserToken] = useLocalStorage('token', null);
	const [userIdStorage, setUserId] = useLocalStorage('userId', null);

	const navigate = useNavigate();

	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	// call this function when you want to authenticate the user
	const onLogin = async (username: string, password: string) => {
		await axios
			.post(apiBaseUrl + 'user/login', {
				email: username,
				password,
			})
			.then(async (response) => {
				if (typeof setUserToken === 'function') {
					if (response.data.success) {
						await setUserToken(response.data.data.token).then(() => navigate('/'));
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

	const onSignUp = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	) => {
		await axios
			.post(apiBaseUrl + 'user/register', {
				firstName,
				lastName,
				email,
				password,
			})
			.then(async (response) => {
				if (typeof setUserToken === 'function') {
					if (response.data.success) {
						await setUserToken(response.data.data.token).then(() => navigate('/'));
					}
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
			userTokenStorage,
			onSignUp,
			onLogin,
			onLogout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[userTokenStorage],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
