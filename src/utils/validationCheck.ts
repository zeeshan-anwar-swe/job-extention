import {
	ArrayValidationCheckType,
	ImageUrlValidationCheckType,
	NumberValidationCheckType,
	profileImageUrlValidationCheckType,
	TextValidationCheckType,
} from '../types/validationCheck.type';

import DummyProfileImage from '../assets/svg-images/dummy-profile.png';
const serverUrl = import.meta.env.VITE_SERVER_PREFIX_URL;

export const textValidationCheck: TextValidationCheckType = (value) => {
	if (value === null || value === undefined || value === '') {
		return '';
	}
	return value;
};

export const urlValidationCheck: TextValidationCheckType = (value) => {
	if (value === null || value === undefined || value === '' || typeof value !== 'string') {
		return '#';
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
	if (url === null || url === undefined || typeof url !== 'string' || url === '') {
		return DummyProfileImage;
	} else {
		if (url.startsWith('http') || url.startsWith('https')) {
			return url;
		} else {
			return serverUrl + url;
		}
	}
};

export const imageUrlValidationCheck: ImageUrlValidationCheckType = async (url) => {
	// Default cases
	if (url === null || url === undefined || typeof url !== 'string' || url === '') {
		return DummyProfileImage;
	}

	// Construct proper URL
	let imageUrl = url;
	if (!url.startsWith('http') && !url.startsWith('https')) {
		imageUrl = serverUrl + url;
	}

	// Verify if the image is actually viewable
	try {
		const isImageValid = await verifyImage(imageUrl);
		return isImageValid ? imageUrl : DummyProfileImage;
	} catch {
		return DummyProfileImage;
	}
};

// Helper function to verify if an image is viewable
const verifyImage = (url: string): Promise<boolean> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
		img.src = url;

		// Set timeout in case the image hangs
		setTimeout(() => {
			img.onload = null;
			img.onerror = null;
			resolve(false);
		}, 2000); // 2 second timeout
	});
};
