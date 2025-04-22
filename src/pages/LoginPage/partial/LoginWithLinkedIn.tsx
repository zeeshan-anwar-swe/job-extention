import React from 'react';
import Button from '../../../components/ui/Button';

const LoginWitLinkedIn = () => {
	return (
		<div className='col-span-12'>
			<Button
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
