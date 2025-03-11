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
};
const ForgotPasswordFormPartial = ({ setFormType }: { setFormType: (value: string) => void }) => {
	const formik = useFormik({
		initialValues: {
			username: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.username) {
				errors.username = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
				errors.username = 'Invalid email address';
			}

			return errors;
		},
		onSubmit: (values: TValues, { setFieldError }) => {
			// onLogin(values.username, values.password)
			// 	.then(() => {})
			// 	.catch((e: Error) => {
			// 		if (e.cause === 'username') {
			// 			setFieldError('username', e.message);
			// 			setFieldError('password', e.message);
			// 			toast.error(e.message);
			// 		} else if (e.cause === 'password') {
			// 			setFieldError('password', e.message);
			// 			toast.error(e.message);
			// 		}
			// 	});
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

				<div>
					<Button
						size='lg'
						variant='solid'
						className='w-full font-semibold'
						onClick={() => formik.handleSubmit()}>
						Forgot Password
					</Button>
				</div>
			</form>
			<div>
				<span className='mr-2 text-zinc-600 dark:text-zinc-100'>Want to login!</span>
				<Button
					onClick={() => setFormType('otp')}
					color='zinc'
					colorIntensity='800'
					className='!p-0 font-semibold hover:text-inherit'>
					Log In
				</Button>
			</div>
		</>
	);
};

export default ForgotPasswordFormPartial;
