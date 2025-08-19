import { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/form/Input';
import Button from '../../../../components/ui/Button';
import { useAuth } from '../../../../context/authContext';
import FieldWrap from '../../../../components/form/FieldWrap';
import Validation from '../../../../components/form/Validation';
import LogoTemplate from '../../../../templates/layouts/Logo/Logo.template';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';

type TValues = {
  password: string;
  confirmPassword: string;
};

const SetUserPassword = () => {
  
  const { onPasswordSet } = useAuth();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  const [param] = useSearchParams()
  const token = param.get('token')

  console.log({token});
  

  

  const [passwordShowStatus, setPasswordShowStatus] = useState(false);
  const [confirmPasswordShowStatus, setConfirmPasswordShowStatus] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: (values: TValues) => {
      const errors: Partial<TValues> = {};

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*()_+\-=[\]{};':",\\|,.<>\/]/.test(values.password)) {
        errors.password = 'Password must contain at least one special character';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password does not match';
      }
      return errors;
    },
    onSubmit: (values: TValues) => {
      console.log({ values });
      
      // onPasswordSet({ password: values.password });
    },
  });

  // Derived state for visual feedback
  const isPasswordValidLength = formik.values.password.length >= 8;
  const isPasswordValidCapital = /[A-Z]/.test(formik.values.password);
  const isPasswordValidNumber = /[0-9]/.test(formik.values.password);
  const isPasswordValidSpecialChar = /[!@#$%^&*()_+\-=[\]{};':",\\|,.<>\/]/.test(formik.values.password);
  const arePasswordsMatching = formik.values.password === formik.values.confirmPassword && formik.values.confirmPassword !== '';

  return (
    <PageWrapper
      isProtectedRoute={false}
      name='Verify User'
      className='!grid !h-screen !grid-cols-2 bg-white dark:bg-inherit'>
      <div className='py-16 max-md:hidden'>
        <div className="relative ml-auto h-full w-8/12 overflow-visible rounded-2xl bg-[url('/images/bear-bg.png')] bg-cover bg-center px-8">
          <img
            className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-cover'
            src='/images/animated-bear.gif'
            alt=''
          />
          
        </div>
      </div>
      <div className='mx-auto flex h-full items-center justify-center max-md:col-span-2 max-md:mx-auto'>
        <div className='mr-auto flex max-w-sm flex-col gap-4'>
          <div className='space-y-2'>
            <div>
              <LogoTemplate className='h-10' />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-semibold'>Set New Password</h1>
              <span>Create a new password for your account</span>
            </div>
          </div>
          <form
            className='flex w-96 flex-col gap-4'
            noValidate
            onSubmit={formik.handleSubmit}>
            <div
              className={classNames({
                'mb-2': !formik.isValid,
              })}>
              {/* New Password Field */}
              <Validation
                isValid={!formik.touched.password || !formik.errors.password}
                isTouched={formik.touched.password}
                invalidFeedback={formik.errors.password}>
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
                    autoComplete='new-password'
                    id='password'
                    name='password'
                    placeholder='New Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FieldWrap>
              </Validation>
              <div className='mt-2 flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Icon
                    size='text-2xl'
                    icon={isPasswordValidLength ? 'HeroCheckCircle' : 'HeroCheckCircle'}
                    className={isPasswordValidLength ? 'text-blue-500' : 'text-gray-400'}
                  />
                  <span className='text-sm'>At least 8 characters</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Icon
                    size='text-2xl'
                    icon={isPasswordValidCapital ? 'HeroCheckCircle' : 'HeroCheckCircle'}
                    className={isPasswordValidCapital ? 'text-blue-500' : 'text-gray-400'}
                  />
                  <span className='text-sm'>At least one uppercase letter</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Icon
                    size='text-2xl'
                    icon={isPasswordValidNumber ? 'HeroCheckCircle' : 'HeroCheckCircle'}
                    className={isPasswordValidNumber ? 'text-blue-500' : 'text-gray-400'}
                  />
                  <span className='text-sm'>At least one number</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Icon
                    size='text-2xl'
                    icon={isPasswordValidSpecialChar ? 'HeroCheckCircle' : 'HeroCheckCircle'}
                    className={isPasswordValidSpecialChar ? 'text-blue-500' : 'text-gray-400'}
                  />
                  <span className='text-sm'>At least one special character</span>
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <Validation
              isValid={
                !formik.touched.confirmPassword || !formik.errors.confirmPassword
              }
              isTouched={formik.touched.confirmPassword}
              invalidFeedback={formik.errors.confirmPassword}>
              <FieldWrap
                firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
                lastSuffix={
                  <Icon
                    className='mx-2 cursor-pointer'
                    icon={confirmPasswordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
                    onClick={() => {
                      setConfirmPasswordShowStatus(
                        !confirmPasswordShowStatus,
                      );
                    }}
                  />
                }>
                <Input
                  dimension='lg'
                  type={confirmPasswordShowStatus ? 'text' : 'password'}
                  autoComplete='new-password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FieldWrap>
            </Validation>
            <div className='mt-2 flex items-center gap-2'>
              <Icon
                size='text-2xl'
                icon={arePasswordsMatching ? 'HeroCheckCircle' : 'HeroCheckCircle'}
                className={arePasswordsMatching ? 'text-blue-500' : 'text-gray-400'}
              />
              <span className='text-sm'>Passwords match</span>
            </div>

            <div>
              <Button
                size='lg'
                variant='solid'
                className='w-full font-semibold'
                type='submit'
                isDisable={!formik.isValid || formik.isSubmitting}>
                Set Password
              </Button>
            </div>
          </form>

          <div className='text-center '>
            <span className='flex justify-center gap-2 text-center text-sm'>
              <span className='text-zinc-400 dark:text-zinc-600'>
                Already have an account?
              </span>
              <Link to='/signin' className='font-semibold text-blue-500'>
                Log In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SetUserPassword;
