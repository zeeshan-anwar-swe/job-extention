import Button from '../../../../../components/ui/Button';

const LoginWithGoogle = () => {
	const baseUrl = import.meta.env.VITE_API_BASE_URL;
	const handleGoogleLogin = () => {
		window.location.href = baseUrl + '/sso/google'; // Replace with your actual route
	};

	return (
		<div className='col-span-12'>
			<Button
				icon='CustomGoogle'
				variant='outline'
				color='zinc'
				size='lg'
				className='w-full'
				onClick={handleGoogleLogin}>
				Sign in with Google
			</Button>
		</div>
	);
};

export default LoginWithGoogle;
