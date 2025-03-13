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
import { setFormType } from '../../../store/slices/ForgotPassword.slice';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';

type TValues = {
	email: string;
};
const ForgotPasswordFormPartial = () => {
	const { onForgot } = useAuth();
	const dispatch: AppDispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			return errors;
		},
		onSubmit: (email: TValues) => {
			onForgot({ email: email.email });
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
						isTouched={formik.touched.email}
						invalidFeedback={formik.errors.email}
						validFeedback='Good'>
						<FieldWrap firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
							<Input
								type='email'
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
					onClick={() => dispatch(setFormType('login'))}
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
