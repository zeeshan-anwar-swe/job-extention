import Validation from '../../../components/form/Validation';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';
import { useFormik } from 'formik';
import Label from '../../../components/form/Label';

import { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { changeUserPassword, setPasswordError } from '../../../store/slices/User.slice';
type TValues = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

const ChangePasswordFormPartial = () => {
	const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const { passwordChangeLoading, passwordError } = useSelector((state: RootState) => state.user);
	const dispatch: AppDispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (passwordError) {
				dispatch(setPasswordError(null));
			}

			if (!values.currentPassword) {
				errors.currentPassword = 'Required';
			}

			if (!values.newPassword) {
				errors.newPassword = 'Required';
			}
			if (!values.confirmPassword) {
				errors.confirmPassword = 'Required';
			}

			if (!values.newPassword) {
				errors.newPassword = 'Required';
			} else if (values.newPassword.length < 8) {
				errors.newPassword = 'Password must be at least 8 characters long';
			} else if (!/[!@#$%^&*()_+\-=[\]{};':",\\|,.<>\/]/.test(values.newPassword)) {
				errors.newPassword = 'Password must contain at least one special character';
			} else if (values.currentPassword === values.newPassword) {
				errors.newPassword = 'Password must be different from current password';
			} else if (values.confirmPassword !== values.newPassword) {
				errors.confirmPassword = 'Password does not match';
			}

			return errors;
		},
		onSubmit: (values: TValues) => {
			const { currentPassword, newPassword } = values;
			dispatch(changeUserPassword({ currentPassword, newPassword })).then(() => {
				formik.resetForm();
				setShowCurrentPassword(false);
				setShowConfirmPassword(false);
				setShowNewPassword(false);
			});
		},
	});

	if (passwordError) {
		formik.errors.currentPassword = passwordError;
	}

	return (
		<form className='flex w-full flex-col gap-4'>
			{/* --------------Field for current password---------- */}
			<div className='w-full'>
				<Label htmlFor='title'>Current Password</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.currentPassword}
					invalidFeedback={formik.errors.currentPassword}
					validFeedback=''>
					<FieldWrap
						firstSuffix={
							<Icon
								onClick={() => setShowCurrentPassword((pre) => !pre)}
								size='text-2xl'
								icon={showCurrentPassword ? 'HeroEyeSlash' : 'HeroEye'}
								className='mx-2 hover:cursor-pointer'
							/>
						}>
						<Input
							type={showCurrentPassword ? 'text' : 'password'}
							className='!bg-white dark:!bg-zinc-800'
							dimension='lg'
							autoComplete='currentPassword'
							name='currentPassword'
							value={formik.values.currentPassword}
							placeholder='Enter your current password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>

			<div className='flex gap-4 max-md:flex-col '>
				{/* --------------Field for new password---------- */}
				<div className='w-full'>
					<Label htmlFor='title'>New Password</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.currentPassword}
						invalidFeedback={formik.errors.newPassword}
						validFeedback=''>
						<FieldWrap
							firstSuffix={
								<Icon
									onClick={() => setShowNewPassword((pre) => !pre)}
									size='text-2xl'
									icon={showNewPassword ? 'HeroEyeSlash' : 'HeroEye'}
									className='mx-2 hover:cursor-pointer'
								/>
							}>
							<Input
								type={showNewPassword ? 'text' : 'password'}
								className='!bg-white dark:!bg-zinc-800'
								dimension='lg'
								autoComplete='newPassword'
								name='newPassword'
								value={formik.values.newPassword}
								placeholder='Enter your current password'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>

				{/* --------------Field for confirm password---------- */}
				<div className='w-full'>
					<Label htmlFor='title'>Confirm Password</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.confirmPassword}
						invalidFeedback={formik.errors.confirmPassword}
						validFeedback=''>
						<FieldWrap
							firstSuffix={
								<Icon
									onClick={() => setShowConfirmPassword((pre) => !pre)}
									size='text-2xl'
									icon={showConfirmPassword ? 'HeroEyeSlash' : 'HeroEye'}
									className='mx-2 hover:cursor-pointer'
								/>
							}>
							<Input
								type={showConfirmPassword ? 'text' : 'password'}
								className='!bg-white dark:!bg-zinc-800'
								dimension='lg'
								autoComplete='confirmPassword'
								name='confirmPassword'
								value={formik.values.confirmPassword}
								placeholder='Enter your current password'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>
			</div>
			<Button
				variant='solid'
				isLoading={passwordChangeLoading}
				className='ml-auto !w-fit font-semibold'
				onClick={() => formik.handleSubmit()}>
				Change Password
			</Button>
		</form>
	);
};

export default ChangePasswordFormPartial;
