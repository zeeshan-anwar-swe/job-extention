import {
	ArrayValidationCheckType,
	NumberValidationCheckType,
	profileImageUrlValidationCheckType,
	TextValidationCheckType,
} from '../types/validationCheck.type';

import DummyProfileImage from '../assets/svg-images/dummy-profile.png';
const serverUrl = import.meta.env.VITE_SERVER_PREFIX_URL;

export const textValidationCheck: TextValidationCheckType = (value) => {
	if (value === null || value === undefined || value === '') {
		return 'N/A';
	}
	return value;
};

export const numberValidationCheck: NumberValidationCheckType = (value) => {
	if (value === null || value === undefined) {
		return 0;
	}
	return value;
};

export const arrayValidationCheck: ArrayValidationCheckType = (value) => {
	if (value === null || value === undefined) {
		return [];
	}
	return value;
};

export const profileImageUrlValidationCheck: profileImageUrlValidationCheckType = (url) => {
	if (
		url === null ||
		url === undefined ||
		typeof url !== 'string' ||
		url === '' ||
		typeof url !== 'string'
	) {
		return DummyProfileImage;
	} else {
		if (url.startsWith('http') || url.startsWith('https')) {
			return url;
		} else {
			return serverUrl + url;
		}
	}
};
