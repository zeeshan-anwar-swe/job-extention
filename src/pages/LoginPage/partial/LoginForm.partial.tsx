import { useState } from 'react';
import Validation from '../../../components/form/Validation';
import { useAuth } from '../../../context/authContext';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import Icon from '../../../components/icon/Icon';
import FieldWrap from '../../../components/form/FieldWrap';
import Input from '../../../components/form/Input';
import Button from '../../../components/ui/Button';

type TValues = {
	username: string;
	password: string;
};

const LoginFormPartial = ({ setFormType }: { setFormType: (value: string) => void }) => {
	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);

	const { onLogin } = useAuth();

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.username) {
				errors.username = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
				errors.username = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 6) {
				errors.password = 'Password must be at least 6 characters long';
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
						toast.error(e.message);
					} else if (e.cause === 'password') {
						setFieldError('password', e.message);
						toast.error(e.message);
					}
				});
		},
	});
	return (
		<>
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
						<FieldWrap firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
							<Input
								type='email'
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
			<div>
				<span className='mr-2 text-zinc-600 dark:text-zinc-100'>Don’t know password!</span>
				<Button
					onClick={() => setFormType('forgot')}
					color='zinc'
					colorIntensity='800'
					className='!p-0 font-semibold hover:text-inherit'>
					Forgot
				</Button>
			</div>
		</>
	);
};

export default LoginFormPartial;
