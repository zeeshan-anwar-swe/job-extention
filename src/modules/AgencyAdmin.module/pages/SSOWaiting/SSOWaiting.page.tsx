import { useDispatch } from 'react-redux';
import ShimmerEffectPageLoader from '../../../../components/layouts/PageLoader/ShimmerEffectPageLoader';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const SSOWaitingPage = () => {
	const [searchParam] = useSearchParams();
	const token = searchParam.get('token');

	const handleSSOLogin = async () => {
		await localStorage.setItem('token', JSON.stringify(token) ?? '');
		window.location.href = '/dashboard';
	};

	useEffect(() => {
		if (token) {
			handleSSOLogin();
		}
	}, [token]);
	return (
		<PageWrapper isProtectedRoute={false} name='SSOWaiting'>
			<ShimmerEffectPageLoader />
		</PageWrapper>
	);
};

export default SSOWaitingPage;
