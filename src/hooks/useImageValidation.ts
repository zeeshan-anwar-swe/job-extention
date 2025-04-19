import { useState, useEffect } from 'react';
import DummyProfileImage from '../assets/svg-images/dummy-profile.png';

export type ImageUrlValidationCheckType = (url: null | undefined | string) => Promise<string>;

export const imageUrlValidationCheck: ImageUrlValidationCheckType = async (url) => {
	const serverUrl = import.meta.env.VITE_SERVER_PREFIX_URL;

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

interface UseImageValidationResult {
	imageUrl: string;
	loading: boolean;
}

const useImageValidation = (initialUrl: string | null | undefined): UseImageValidationResult => {
	const [imageUrl, setImageUrl] = useState<string>(DummyProfileImage);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (initialUrl) {
			const validateImageUrl = async () => {
				setLoading(true);
				const validatedUrl = await imageUrlValidationCheck(initialUrl);
				setImageUrl(validatedUrl);
				setLoading(false);
			};

			validateImageUrl();
		}
	}, [initialUrl, window.location]);

	return { imageUrl, loading };
};

export default useImageValidation;
