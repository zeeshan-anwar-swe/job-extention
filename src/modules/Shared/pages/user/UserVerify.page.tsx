import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card, {
	CardBody,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/icon/Icon';

type VerificationStatus = 'loading' | 'success' | 'failed';

export function UserVerificationPage() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get('token');

	const [status, setStatus] = useState<VerificationStatus>('loading');
	const [message, setMessage] = useState('Verifying your account...');

	useEffect(() => {
		if (!token) {
			setStatus('failed');
			setMessage('No verification token found. Please check your link.');
			return;
		}

		const verifyToken = async () => {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

			// In a real application, you would send the token to your backend
			// const response = await fetch('/api/verify-token', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ token }),
			// });
			//
			// if (response.ok) {
			//   setStatus('success');
			//   setMessage('Your account has been successfully verified!');
			// } else {
			//   const errorData = await response.json();
			//   setStatus('failed');
			//   setMessage(errorData.message || 'Account verification failed. The token might be invalid or expired.');
			// }

			// For demonstration: randomly succeed or fail
			const isSuccess = Math.random() > 0.3; // 70% chance of success
			if (isSuccess) {
				setStatus('success');
				setMessage('Your account has been successfully verified!');
			} else {
				setStatus('failed');
				setMessage('Account verification failed. The token might be invalid or expired.');
			}
		};

		verifyToken();
	}, [token]);

	const cardVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.8 },
		visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
		exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } },
	};

	const iconVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: { type: 'spring', stiffness: 260, damping: 20 },
		},
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-950'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={status}
					initial='hidden'
					animate='visible'
					exit='exit'
					variants={cardVariants}
					className='w-full max-w-md'>
					<Card className='rounded-lg p-6 text-center shadow-lg'>
						<CardHeader className='pb-4'>
							{status === 'loading' && (
								<motion.div
									initial={{ rotate: 0 }}
									animate={{ rotate: 360 }}
									transition={{
										duration: 1,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'linear',
									}}
									className='mx-auto mb-4 text-blue-500'>
									<Icon size='text-4xl' icon='DuoLoading' />
								    </motion.div>
							)}
							{status === 'success' && (
								<motion.div
									variants={iconVariants}
									className='mx-auto mb-4 text-green-500'>
									<Icon icon='HeroCheckCircle' className='h-12 w-12' />
								</motion.div>
							)}
							{status === 'failed' && (
								<motion.div
									variants={iconVariants}
									className='mx-auto mb-4 text-red-500'>
									<Icon icon='HeroXMark' className='h-12 w-12' />
								</motion.div>
							)}
							<CardTitle className='text-3xl font-bold'>{message}</CardTitle>
						</CardHeader>
						<CardBody>
							<CardSubTitle
								className='text-lg text-gray-600 dark:text-gray-400'
								aria-live='polite'>
								{status === 'loading' &&
									'Please wait while we confirm your details.'}
								{status === 'success' &&
									'You can now proceed to log in to your account.'}
								{status === 'failed' &&
									'Please try again or contact support if the issue persists.'}
							</CardSubTitle>
							{status !== 'loading' && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5, duration: 0.3 }}
									className='mt-6'>
									<Button className='w-full'>
										<Link to='/'>Go to Home</Link>
									</Button>
								</motion.div>
							)}
						</CardBody>
					</Card>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
