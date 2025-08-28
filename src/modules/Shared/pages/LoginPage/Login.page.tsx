import { Link, useSearchParams } from 'react-router-dom';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import LogoTemplate from '../../../../templates/layouts/Logo/Logo.template';
import LoginFormPartial from './partial/LoginForm.partial';
import ForgotPasswordFormPartial from './partial/ForgotPasswordForm.partial';
import OTPVerifyFormPartial from './partial/OTPVerifyForm.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import ResetPasswordFormPartial from './partial/ResetPassword';
import LoginWithGoogle from './partial/LoginWithGoogle';
import LoginWitLinkedIn from './partial/LoginWithLinkedIn';
import { useEffect, useState } from 'react';

const LoginPage = () => {
	const [param] = useSearchParams();
	const status = param.get('status');
	const { formType } = useSelector((state: RootState) => state.forgotPasswordSlice);

	console.log({ status });

	

	return (
		<PageWrapper
			isProtectedRoute={false}
			className='grid grid-cols-2 gap-x-32 bg-white dark:bg-inherit'
			name='Sign In'>
			<div className='py-16 max-md:hidden'>
				<div className="relative ml-auto h-full w-8/12 rounded-2xl	bg-[url('/images/bear-bg.png')] bg-cover bg-center px-8">
					<img
						className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-cover'
						src='/images/animated-bear.gif'
						alt=''
					/>
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
				<div className='mr-auto flex w-96 max-w-sm flex-col gap-8'>
					{formType !== 'otp' && (
						<>
							<div>
								<LogoTemplate className='h-12' />
							</div>
							<div>
								<span className='text-4xl font-semibold'>
									{' '}
									{formType === 'forgot' ? 'Forgot Password' : 'Sign In'}
								</span>
							</div>
							<div>
								<span>
									{formType === 'forgot'
										? 'Please enter the email.'
										: 'Welcome back please enter the details.'}
								</span>
							</div>
						</>
					)}

					{status && status !== 'verified' ? (
						<h4 className='text-center'>
							Email is not verified please verified it again
						</h4>
					) : formType === 'login' ? (
						<LoginFormPartial />
					) : formType === 'forgot' ? (
						<ForgotPasswordFormPartial />
					) : formType === 'reset' ? (
						<ResetPasswordFormPartial />
					) : (
						<OTPVerifyFormPartial />
					)}

					{formType === 'login' && (
						<>
							<div className='grid grid-cols-12 gap-4'>
								<LoginWithGoogle />
								<LoginWitLinkedIn />
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
