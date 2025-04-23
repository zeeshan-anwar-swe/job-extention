import React from 'react';
import Button from '../../../../../components/ui/Button';

const LoginWithGoogle = () => {
	const handleGoogleLogin = () => {
		// Redirect the user to your backend's Google authentication route
		window.location.href = '/auth/google'; // Replace with your actual route
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
