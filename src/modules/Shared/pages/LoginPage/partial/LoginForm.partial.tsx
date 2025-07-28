import { useState } from 'react';
import Validation from '../../../../../components/form/Validation';
import { useAuth } from '../../../../../context/authContext';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Icon from '../../../../../components/icon/Icon';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Input from '../../../../../components/form/Input';
import Button from '../../../../../components/ui/Button';
import { setFormType } from '../../../../../store/slices/ForgotPassword.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';

type TValues = {
    username: string;
    password: string;
};

const LoginFormPartial = () => {
    const dispatch: AppDispatch = useDispatch();
    const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
    const [apiErrors, setApiErrors] = useState<{ username?: string; password?: string }>({});

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
        onSubmit: async (values: TValues) => {
            setApiErrors({}); // Clear previous API errors
            try {
                await onLogin(values.username, values.password);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    // Set field errors based on API response
                    setApiErrors({
                        username: error.response?.data?.message || 'Invalid credentials',
                        password: error.response?.data?.message || 'Invalid credentials',
                    });
                }
            }
        },
    });

    // Combine formik errors and API errors
    const errors = {
        ...formik.errors,
        ...apiErrors,
    };

    return (
        <>
            <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}> {/* Added onSubmit here */}
                <div className={classNames({ 'mb-2': !formik.isValid })}>
                    <Validation
                        isValid={!errors.username && formik.touched.username}
                        isTouched={formik.touched.username}
                        invalidFeedback={errors.username}
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
                <div className={classNames({ 'mb-2': !formik.isValid })}>
                    <Validation
                        isValid={!errors.password && formik.touched.password}
                        isTouched={formik.touched.password}
                        invalidFeedback={errors.password}
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
                        type='submit' // Changed type to 'submit'
                        // Removed onClick={() => formik.handleSubmit()}
                    >
                        Sign in
                    </Button>
                </div>
            </form>

            <div>
                <span className='mr-2 text-zinc-600 dark:text-zinc-100'>Don’t know password!</span>
                <Button
                    onClick={() => dispatch(setFormType('forgot'))}
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