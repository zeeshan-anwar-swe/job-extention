import { useEffect } from 'react';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../../components/ui/Button';
import Container from '../../../../components/layouts/Container/Container';
import Card, { CardBody, CardFooter, CardFooterChild } from '../../../../components/ui/Card';
import SettingAside from './partial/Asides/DefaultAside.template';
import Icon from '../../../../components/icon/Icon';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import { useAuth } from '../../../../context/authContext';
import { useFormik } from 'formik';
import Textarea from '../../../../components/form/Textarea';
import Validation from '../../../../components/form/Validation';
import Label from '../../../../components/form/Label';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getMyProfile, updateUserProfile } from '../../../../store/slices/User.slice';
import ChangePasswordFormPartial from './partial/ChangePasswordForm.partial';
import { ProfileImagePartial } from './partial/ProfileImage.partial';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';

export type UserProfileDataType = {
	firstName: string;
	lastName: string;
	email: string;
	industry: string;
	about: string;
	image: File | null;
	location: string;
	experience: string;
	dob: string;
};

const SettingPage = () => {
	const { userProfile, loading } = useSelector((state: RootState) => state.user);
	const { onLogout } = useAuth();

	const dispatch: AppDispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			firstName: '',
			email: '',
			lastName: '',
			industry: '',
			about: '',
			image: null,
			location: '',
			experience: '',
			dob: '',
		},
		validate: (values: UserProfileDataType) => {
			const errors: Partial<UserProfileDataType> = {};

			if (!values.firstName) {
				errors.firstName = 'required';
			}
			if (values.firstName.length < 2) {
				errors.firstName = 'Name must be at least 2 characters long';
			}

			return errors;
		},
		onSubmit: (values: UserProfileDataType) => {
			const formData = new FormData();

			if (values.firstName) {
				formData.append('firstName', values.firstName);
			}
			if (values.lastName) {
				formData.append('lastName', values.lastName);
			}
			if (values.industry) {
				formData.append('industry', values.industry);
			}
			if (values.about) {
				formData.append('about', values.about);
			}

			if (values.image) {
				formData.append('file', values.image);
			}

			if (values.location) {
				formData.append('location', values.location);
			}

			if (values.experience) {
				formData.append('experience', values.experience);
			}

			if (values.dob) {
				formData.append('dob', values.dob);
			}

			dispatch(updateUserProfile(formData));
		},
	});

	useEffect(() => {
		if (userProfile) {
			formik.setFieldValue('firstName', userProfile?.firstName ?? '');
			formik.setFieldValue('lastName', userProfile?.lastName ?? '');
			formik.setFieldValue('industry', userProfile?.industry ?? '');
			formik.setFieldValue('about', userProfile?.about ?? '');
			formik.setFieldValue('email', userProfile?.email ?? '');
			formik.setFieldValue('location', userProfile?.location ?? '');
			formik.setFieldValue('dob', userProfile?.dob ?? '');
			formik.setFieldValue('experience', userProfile?.experience ?? '');
		}
	}, [userProfile]);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Setting' currentPage='Setting' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Setting'>
				<Container className='!grid flex-1 !grid-cols-12 !gap-4'>
					<Card className='col-span-12 !grid flex-1 !grid-cols-10 gap-4 overflow-hidden p-4'>
						{/* <SettingAside /> */}
						<Card className='col-span-12 max-md:col-span-12 '>
							<CardBody className='!flex gap-4 max-md:!flex-col'>
								<form className='flex w-full gap-4'>
									<ProfileImagePartial
										initialImage={userProfile?.image}
										formik={formik}
									/>

									<div className='flex w-full flex-1 flex-col gap-4 '>
										<div className='flex  gap-4 max-md:flex-col'>
											<div className='w-full'>
												<Label htmlFor='title'>First Name*</Label>
												<Validation
													isValid={formik.isValid}
													isTouched={formik.touched.firstName}
													invalidFeedback={formik.errors.firstName}>
													<FieldWrap>
														<Input
															className='!bg-white dark:!bg-zinc-800'
															dimension='lg'
															autoComplete='firstName'
															name='firstName'
															value={formik.values.firstName}
															placeholder='Enter your firstr name'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
														/>
													</FieldWrap>
												</Validation>
											</div>
											<div className='w-full'>
												<Label htmlFor='title'>Last Name</Label>
												<Validation
													isValid={formik.isValid}
													isTouched={formik.touched.lastName}
													invalidFeedback={formik.errors.lastName}>
													<FieldWrap>
														<Input
															className='!bg-white dark:!bg-zinc-800'
															dimension='lg'
															autoComplete='lastName'
															name='lastName'
															value={formik.values.lastName}
															placeholder='Enter your last name'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
														/>
													</FieldWrap>
												</Validation>
											</div>
										</div>
										<div className='flex  gap-4 max-md:flex-col '>
											<div className='w-full'>
												<Label htmlFor='title'>Email</Label>
												<Validation
													isValid={formik.isValid}
													isTouched={formik.touched.email}
													invalidFeedback={formik.errors.email}
													validFeedback=''>
													<FieldWrap
														firstSuffix={
															<Icon
																size='text-2xl'
																icon='HeroEnvelope'
																className='mx-2'
															/>
														}>
														<Input
															className='!bg-white dark:!bg-zinc-800'
															type='email'
															dimension='lg'
															autoComplete='email'
															name='email'
															value={formik.values.email}
															placeholder='Enter your email'
															onBlur={formik.handleBlur}
														/>
													</FieldWrap>
												</Validation>
											</div>

											<div className='w-full'>
												<Label htmlFor='title'>Industry</Label>
												<Validation
													isValid={formik.isValid}
													isTouched={formik.touched.industry}
													invalidFeedback={formik.errors.industry}
													validFeedback=''>
													<FieldWrap
														firstSuffix={
															<Icon
																size='text-2xl'
																icon='HeroBuildingOffice2'
																className='mx-2'
															/>
														}>
														<Input
															className='!bg-white dark:!bg-zinc-800'
															dimension='lg'
															autoComplete='industry'
															name='industry'
															value={formik.values.industry}
															placeholder='Enter your Industry'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
														/>
													</FieldWrap>
												</Validation>
											</div>
										</div>

										<div className='flex  gap-4 max-md:flex-col '>
											<div className='w-full'>
												<Label htmlFor='location'>Location</Label>
												<Validation
													isValid={formik.isValid}
													isTouched={formik.touched.location}
													invalidFeedback={formik.errors.location}
													validFeedback=''>
													<FieldWrap
														firstSuffix={
															<Icon
																size='text-2xl'
																icon='HeroMapPin'
																className='mx-2'
															/>
														}>
														<Input
															className='!bg-white dark:!bg-zinc-800'
															type='text'
															dimension='lg'
															autoComplete='location'
															name='location'
															onChange={formik.handleChange}

															value={formik.values.location}
															placeholder='Enter your location'
															onBlur={formik.handleBlur}
														/>
													</FieldWrap>
												</Validation>
											</div>

											<div className='w-full'>
												<Label htmlFor='experience'>Experience</Label>
												<Validation
													isValid={formik.isValid}
													isTouched={formik.touched.experience}
													invalidFeedback={formik.errors.experience}
													validFeedback=''>
													<FieldWrap
														firstSuffix={
															<Icon
																size='text-2xl'
																icon='HeroBriefcase'
																className='mx-2'
															/>
														}>
														<Input
															className='!bg-white dark:!bg-zinc-800'
															dimension='lg'
															autoComplete='experience'
															name='experience'
															value={formik.values.experience}
															placeholder='Enter your experience'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
														/>
													</FieldWrap>
												</Validation>
											</div>
										</div>
										<div>
											<Label htmlFor='about'>About</Label>
											<Validation
												isValid={formik.isValid}
												isTouched={formik.touched.about}
												invalidFeedback={formik.errors.about}
												validFeedback='Good'>
												<FieldWrap>
													<Textarea
														className='!bg-white dark:!bg-zinc-800'
														rows={4}
														dimension='lg'
														autoComplete='about'
														name='about'
														value={formik.values.about}
														placeholder='Enter your about'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FieldWrap>
											</Validation>
										</div>
										<div>
											<Label htmlFor='dob'>Date</Label>
											<Validation
												isValid={formik.isValid}
												isTouched={formik.touched.about}
												invalidFeedback={formik.errors.about}
												validFeedback='Good'>
												<FieldWrap>
													<Input
														type='date'
														className='!bg-white dark:!bg-zinc-800'
														dimension='lg'
														autoComplete='dob'
														placeholder='Enter your date of birth'
														name='dob'
														value={formik.values.dob}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FieldWrap>
											</Validation>
										</div>
										<NavSeparator className='mt-4' />
										<ChangePasswordFormPartial />
									</div>
								</form>
							</CardBody>
							<NavSeparator />
							<CardFooter className='max-md:flex-col-reverse'>
								<CardFooterChild className=' max-md:w-full'>
									<Button
										onClick={onLogout}
										className='max-md:!w-full'
										variant='outline'
										color='zinc'
										borderWidth='border'
										icon='HeroArrowRightOnRectangle'>
										Log Out
									</Button>
								</CardFooterChild>
								<CardFooterChild className='max-md:w-full max-md:!flex-col'>
									<Button
										className='max-md:w-full'
										variant='outline'
										color='zinc'
										borderWidth='border'>
										Cancel
									</Button>
									<Button
										isLoading={loading}
										onClick={() => formik.handleSubmit()}
										className='max-md:w-full'
										variant='solid'>
										Save changes
									</Button>
								</CardFooterChild>
							</CardFooter>
						</Card>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SettingPage;
