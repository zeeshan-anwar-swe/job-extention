import React, { useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layouts/PageWrapper/PageWrapper';
import Button from '../components/ui/Button';
import { useAuth } from '../context/authContext';
import Input from '../components/form/Input';
import usersDb from '../mocks/db/users.db';
import LogoTemplate from '../templates/layouts/Logo/Logo.template';
import FieldWrap from '../components/form/FieldWrap';
import Icon from '../components/icon/Icon';
import Validation from '../components/form/Validation';

type TValues = {
	username: string;
	password: string;
};

const LoginPage = () => {
	const { onLogin } = useAuth();

	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			username: usersDb[0].username,
			password: usersDb[0].password,
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.username) {
				errors.username = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		onSubmit: (values: TValues, { setFieldError }) => {
			onLogin(values.username, values.password)
				.then(() => {})
				.catch((e: Error) => {
					if (e.cause === 'username') {
						setFieldError('username', e.message);
						setFieldError('password', e.message);
					}
					if (e.cause === 'password') setFieldError('password', e.message);
				});
		},
	});

	return (
		<PageWrapper
			isProtectedRoute={false}
			className='grid grid-cols-2 gap-x-32 bg-white dark:bg-inherit'
			name='Sign In'>
			<div className='py-16'>
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
			<div className='container  flex h-full items-center justify-center'>
				<div className='mr-auto flex max-w-sm flex-col gap-8'>
					<div>
						<LogoTemplate className='h-12' />
					</div>
					<div>
						<span className='text-4xl font-semibold'>Sign in</span>
					</div>
					<div>
						<span>Welcome back please enter the details.</span>
					</div>

					<form className='flex flex-col gap-4' noValidate>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.username}
								invalidFeedback={formik.errors.username}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
									<Input
										dimension='lg'
										id='username'
										autoComplete='username'
										name='username'
										placeholder='Enter your email'
										value={formik.values.username}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.password}
								invalidFeedback={formik.errors.password}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
									lastSuffix={
										<Icon
											className='mx-2 cursor-pointer'
											icon={passwordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
											onClick={() => {
												setPasswordShowStatus(!passwordShowStatus);
											}}
										/>
									}>
									<Input
										dimension='lg'
										type={passwordShowStatus ? 'text' : 'password'}
										autoComplete='current-password'
										id='password'
										name='password'
										placeholder='Enter your password'
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div>
							<Button
								size='lg'
								variant='solid'
								className='w-full font-semibold'
								onClick={() => formik.handleSubmit()}>
								Sign in
							</Button>
						</div>
					</form>
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
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
