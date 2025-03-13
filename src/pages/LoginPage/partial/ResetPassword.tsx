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
	password: string;
};
const ResetPasswordFormPartial = () => {
	const { onResetPassword } = useAuth();
	const dispatch: AppDispatch = useDispatch();

	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 6) {
				errors.password = 'Password must be at least 6 characters long';
			}

			return errors;
		},
		onSubmit: (value: TValues) => {
			onResetPassword(value.password);
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
						Reset Password
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

export default ResetPasswordFormPartial;
