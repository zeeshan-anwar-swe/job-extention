import React, { useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layouts/PageWrapper/PageWrapper';
import Button from '../components/ui/Button';
import { useAuth } from '../context/authContext';
import Input from '../components/form/Input';
import LogoTemplate from '../templates/layouts/Logo/Logo.template';
import FieldWrap from '../components/form/FieldWrap';
import Icon from '../components/icon/Icon';
import Validation from '../components/form/Validation';

type TValues = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
};

const SignupPage = () => {
	const { onLogin, onSignUp } = useAuth();

	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},

		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.firstName) {
				errors.firstName = 'Required';
			}

			if (!values.lastName) {
				errors.lastName = 'Required';
			}

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 8) {
				errors.password = 'Password must be at least 8 characters long';
			} else if (!/[!@#$%^&*()_+\-=[\]{};':",\\|,.<>\/]/.test(values.password)) {
				errors.password = 'Password must contain at least one special character';
			}
			return errors;
		},
		onSubmit: (values: TValues, { setFieldError }) => {
			onSignUp(values.firstName, values.lastName, values.email, values.password)
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

	const isPasswordValidLength = formik.values.password.length >= 8;
	const isPasswordValidSpecialChar = /[!@#$%^&*()_+\-=[\]{};':",\\|,.<>\/]/.test(
		formik.values.password,
	);

	return (
		<PageWrapper
			isProtectedRoute={false}
			className='grid grid-cols-2 gap-x-32 bg-white dark:bg-inherit'
			name='Sign Up'>
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
			<div className='mx-auto flex h-full items-center justify-center max-md:col-span-2  max-md:mx-auto'>
				<div className='mr-auto flex max-w-sm flex-col gap-8'>
					<div>
						<LogoTemplate className='h-12' />
					</div>
					<div>
						<span className='text-4xl font-semibold'>Sign Up</span>
					</div>
					<div>
						<span>Get started for effortless recruitment</span>
					</div>
					<form className='flex flex-col gap-4' noValidate>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.firstName}
								invalidFeedback={formik.errors.firstName}
								validFeedback='Good'>
								<FieldWrap firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
									<Input
										dimension='lg'
										id='firstName'
										autoComplete='firstName'
										name='firstName'
										placeholder='First Name'
										value={formik.values.firstName}
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
								isTouched={formik.touched.lastName}
								invalidFeedback={formik.errors.lastName}
								validFeedback='Good'>
								<FieldWrap firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
									<Input
										dimension='lg'
										id='lastName'
										autoComplete='lastName'
										name='lastName'
										placeholder='Last Name'
										value={formik.values.lastName}
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
								isTouched={formik.touched.email}
								invalidFeedback={formik.errors.email}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
									<Input
										dimension='lg'
										id='email'
										autoComplete='email'
										name='email'
										placeholder='Enter your email'
										value={formik.values.email}
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
										placeholder='Password'
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
							<div className='mt-2 flex flex-col gap-2'>
								<div className='flex items-center gap-2'>
									<Icon
										icon={
											isPasswordValidLength
												? 'HeroCheckCircle'
												: 'HeroCheckCircle'
										}
										className={
											isPasswordValidLength
												? 'text-green-500'
												: 'text-gray-400'
										}
									/>
									<span className='text-sm'>At least 8 characters</span>
								</div>
								<div className='flex items-center gap-2'>
									<Icon
										icon={
											isPasswordValidSpecialChar
												? 'HeroCheckCircle'
												: 'HeroCheckCircle'
										}
										className={
											isPasswordValidSpecialChar
												? 'text-green-500'
												: 'text-gray-400'
										}
									/>
									<span className='text-sm'>At least one special character</span>
								</div>
							</div>
						</div>
						<div>
							<Button
								size='lg'
								variant='solid'
								className='w-full font-semibold'
								onClick={() => formik.handleSubmit()}>
								Sign up
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
								Sign up with Google
							</Button>
						</div>
						<div className='col-span-12'>
							<Button
								icon='CustomLinkedin'
								variant='outline'
								color='zinc'
								size='lg'
								className='w-full'>
								Sign up with LinkedIn
							</Button>
						</div>
					</div>
					<div>
						<span className='flex gap-2 text-sm'>
							<span className='text-zinc-400 dark:text-zinc-600'>
								Already have an account?
							</span>
							<Link to='/login' className='hover:text-inherit'>
								Login
							</Link>
						</span>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default SignupPage;
