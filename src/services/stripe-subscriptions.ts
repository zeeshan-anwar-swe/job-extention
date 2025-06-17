import axiosInstance from "../utils/axiosInstance";

export const getSubscriptionPlans = async () => {
	const response = await axiosInstance.get('/stripe-payment/plans');
	if (response.data.success) {
		return response.data.data;
	}
	return [];
};

export const getSubscriptionDetails = async () => {
	const response = await axiosInstance.get('/stripe-payment/user-subscription');
	if (response.data.success) {
		return {
			subscription: response.data.data.subscription,
			invoices: response.data.data.invoices,
		};
	}

	return {
		subscription: null,
		invoices: [],
	};
};

export const createCheckOutSession = async (lookup_key: string) => {
	const response = await axiosInstance.post('/stripe-payment/create-checkout-session', {
		lookup_key,
	});
	if (response.data.success) {
		return response.data.data.url;
	}
	return null;
};

export const createPortalSession = async () => {
	const response = await axiosInstance.post('/stripe-payment/create-portal-session', {});

	if (response.data.success) {
		return response.data.data.url;
	}
	return null;
};
