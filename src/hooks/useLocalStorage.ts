import { useState } from 'react';

interface ISetValue {
	(newValue: string | null): Promise<string | boolean>;
}

const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const value = window.localStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value) as T;
			}
			window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
			return defaultValue;
		} catch (err) {
			return defaultValue;
		}
	});

	const setValue = (newValue: T) => {
		return new Promise((resolve) => {
			try {
				window.localStorage.setItem(keyName, JSON.stringify(newValue));
				resolve(true);
			} catch (err) {
				/* empty */
			}
			setStoredValue(newValue);
		});
	};
	return [storedValue, setValue] as const;
};

export default useLocalStorage;
