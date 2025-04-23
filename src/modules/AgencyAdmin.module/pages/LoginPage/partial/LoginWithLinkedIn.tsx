import Button from '../../../../../components/ui/Button';

const LoginWitLinkedIn = () => {
	const baseUrl = import.meta.env.VITE_API_BASE_URL;
	const handleGoogleLogin = () => {
		window.location.href = baseUrl + '/sso/linkedin';
	};

	return (
		<div className='col-span-12'>
			<Button
				onClick={handleGoogleLogin}
				icon='CustomLinkedin'
				variant='outline'
				color='zinc'
				size='lg'
				className='w-full'>
				Sign in with Linked In
			</Button>
		</div>
	);
};

export default LoginWitLinkedIn;
