import { useState } from 'react';

import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../components/ui/Button';
import LogoTemplate from '../../templates/layouts/Logo/Logo.template';
import LoginFormPartial from './partial/LoginForm.partial';
import ForgotPasswordFormPartial from './partial/ForgotPasswordForm.partial';
import OTPVerifyFormPartial from './partial/OTPVerifyForm.partial';

const LoginPage = () => {
	const [formType, setFormType] = useState<string>('login');

	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);

	return (
		<PageWrapper
			isProtectedRoute={false}
			className='grid grid-cols-2 gap-x-32 bg-white dark:bg-inherit'
			name='Sign In'>
			<div className='py-16 max-md:hidden'>
				<div className="relative ml-auto h-full w-8/12 rounded-2xl bg-[url('/images/sin-sup-side-bg.png')] bg-cover bg-center px-8">
					<div className='absolute bottom-4 left-1/2 w-11/12 -translate-x-1/2  rounded-2xl border-2 border-white p-4 backdrop-blur-md'>
						<p className='text-white'>
							Effortlessly search, edit, and share candidate profiles, manage tasks,
							and streamline hiring with AI-powered tools and a smart talking
							assistant. Simplify your recruitment process today!
						</p>
						<img src='/images/user-rating.png' alt='' />
					</div>
				</div>
			</div>
			<div className='flex h-full items-center justify-center max-md:col-span-2 max-md:mx-auto'>
				<div className='mr-auto flex max-w-sm flex-col gap-8'>
					{formType !== 'otp' && (
						<>
							<div>
								<LogoTemplate className='h-12' />
							</div>
							<div>
								<span className='text-4xl font-semibold'>Sign in</span>
							</div>
							<div>
								<span>Welcome back please enter the details.</span>
							</div>
						</>
					)}
					{formType === 'login' ? (
						<LoginFormPartial setFormType={setFormType} />
					) : formType === 'forgot' ? (
						<ForgotPasswordFormPartial setFormType={setFormType} />
					) : (
						<OTPVerifyFormPartial setFormType={setFormType} />
					)}

					{formType !== 'otp' && (
						<>
							<div className='grid grid-cols-12 gap-4'>
								<div className='col-span-12'>
									<Button
										icon='CustomGoogle'
										variant='outline'
										color='zinc'
										size='lg'
										className='w-full'>
										Sign in with Google
									</Button>
								</div>
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
							</div>

							<div>
								<span className='flex gap-2 text-sm'>
									<span className='text-zinc-400 dark:text-zinc-600'>
										Don’t have an account?
									</span>
									<Link to='/signup' className='hover:text-inherit'>
										Sign up
									</Link>
								</span>
							</div>
						</>
					)}
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
