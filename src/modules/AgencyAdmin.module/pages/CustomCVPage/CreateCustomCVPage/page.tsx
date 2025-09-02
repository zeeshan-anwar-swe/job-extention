import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Icon from '../../../../../components/icon/Icon';
import Button from '../../../../../components/ui/Button';
import Label from '../../../../../components/form/Label';
import Input from '../../../../../components/form/Input';
import Textarea from '../../../../../components/form/Textarea';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Card, { CardBody } from '../../../../../components/ui/Card';
import Validation from '../../../../../components/form/Validation';
import Container from '../../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import { AppDispatch, RootState } from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCustomCV,
	getCustomCVById,
	updateCustomCV,
} from '../../../../../store/slices/Agency/CustomCV.slice';
import { useEffect, useLayoutEffect } from 'react';
import { cn } from '../../../../../utils/cn';
import { TCustomCVSkill } from '../../../../../types/slices.type/agency/custom-cv.slice.type';

type TCVFormValues = {
	firstName: string;
	lastName: string;
	headline: string;
	location: string;
	industry: string;
	skills: string[];
	publicProfileUrl: string;
	summary: string;
	education: {
		degree: string;
		school: string;
		fieldOfStudy: string;
		start: {
			month: number;
			year: number;
		};
		end: {
			month: number;
			year: number;
		} | null;
	}[];
	workExperience: {
		company: string;
		companyUrl: string;
		industry: string;
		location: string;
		role: string;
		start: {
			month: number;
			year: number;
		};
		end: {
			month: number;
			year: number;
		} | null;
		description: string;
	}[];
};
const CreateCustomCVPage = () => {
	const { loading, data } = useSelector((state: RootState) => state.customCV.cvDetails);
	const { state, pathname } = useLocation();
	const isEditPage = pathname === '/dashboard/custom-cv/edit';

	const navigateTo = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const formik = useFormik<TCVFormValues>({
		initialValues: {
			skills: [],
			summary: '',
			lastName: '',
			headline: '',
			location: '',
			industry: '',
			firstName: '',
			education: [],
			workExperience: [],
			publicProfileUrl: '',
		},
		validate: (values) => {
			const errors: Partial<TCVFormValues> = {};

			if (!values.firstName) {
				errors.firstName = 'Required';
			} else if (values.firstName.length < 3) {
				errors.firstName = 'First Name must be at least 3 characters long';
			}

			if (!values.lastName) {
				errors.lastName = 'Required';
			} else if (values.lastName.length < 3) {
				errors.lastName = 'Last Name must be at least 3 characters long';
			}

			if (!values.headline) {
				errors.headline = 'Required';
			}
			if (!values.location) {
				errors.location = 'Required';
			}
			if (!values.industry) {
				errors.industry = 'Required';
			}
			if (!values.publicProfileUrl) {
				errors.publicProfileUrl = 'Required';
			}
			if (!values.summary) {
				errors.summary = 'Required';
			}

			return errors;
		},
		onSubmit: async (values) => {
			console.log({ values });
			try {
				if (isEditPage) {
					await dispatch(updateCustomCV({ id: state.id, data: values }));
				} else {
					await dispatch(createCustomCV(values));
				}
				navigateTo('/dashboard/custom-cv');
			} catch (e) {
				console.log({ e });
			}
		},
	});

	const handleAddEducation = () => {
		formik.setFieldValue('education', [
			...formik.values.education,
			{
				degree: '',
				school: '',
				fieldOfStudy: '',
				start: {
					month: 0,
					year: 0,
				},
				end: null,
			},
		]);
	};

	const handleRemoveEducation = (index: number) => {
		const newEducation = [...formik.values.education];
		newEducation.splice(index, 1);
		formik.setFieldValue('education', newEducation);
	};

	const handleAddWorkExperience = () => {
		formik.setFieldValue('workExperience', [
			...formik.values.workExperience,
			{
				company: '',
				companyUrl: '',
				industry: '',
				location: '',
				role: '',
				start: {
					month: 0,
					year: 0,
				},
				end: null,
				description: '',
			},
		]);
	};

	const handleRemoveWorkExperience = (index: number) => {
		const newWorkExperience = [...formik.values.workExperience];
		newWorkExperience.splice(index, 1);
		formik.setFieldValue('workExperience', newWorkExperience);
	};

	useLayoutEffect(() => {
		if (state) {
			dispatch(getCustomCVById(state.id));
		} else {
			if (isEditPage) {
				navigateTo('/dashboard/custom-cv');
			}
			formik.resetForm();
		}
	}, [pathname]);

	useEffect(() => {
		if (data && isEditPage) {
			formik.setFieldValue('summary', data?.summary ?? '');
			formik.setFieldValue('firstName', data?.firstName ?? '');
			formik.setFieldValue('lastName', data?.lastName ?? '');
			formik.setFieldValue('location', data?.location ?? '');
			formik.setFieldValue('industry', data?.industry ?? '');
			formik.setFieldValue('headline', data?.headline ?? '');
			formik.setFieldValue('publicProfileUrl', data?.publicProfileUrl ?? '');
			formik.setFieldValue('workExperience', data?.workExperience ?? []);
			formik.setFieldValue('education', data?.education ?? []);
			formik.setFieldValue(
				'skills',
				data?.skills.map((skill: TCustomCVSkill) => skill.name) ?? [],
			);
		}
	}, [data, isEditPage]);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Custom CV' currentPage='Create' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>

			<PageWrapper name='Create Custom CV'>
				<Container>
					<Card>
						<CardBody>
							<form
								className={cn(
									'grid grid-cols-1 gap-4 lg:grid-cols-2',
									loading && 'animate-pulse',
								)}
								onSubmit={formik.handleSubmit}>
								<div className='lg:col-span-2'>
									<h2 className='text-xl font-semibold'>Personal Information</h2>
									<hr className='my-4' />
								</div>

								{/* First Name */}
								<div>
									<Label htmlFor='firstName'>First Name</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.firstName}
										validFeedback='Good'
										invalidFeedback={formik.errors.firstName}>
										<FieldWrap
											firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
											<Input
												dimension='lg'
												id='firstName'
												autoComplete='given-name'
												name='firstName'
												placeholder='First Name'
												value={formik.values.firstName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FieldWrap>
									</Validation>
								</div>

								{/* Last Name */}
								<div>
									<Label htmlFor='lastName'>Last Name</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.lastName}
										validFeedback='Good'
										invalidFeedback={formik.errors.lastName}>
										<FieldWrap
											firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
											<Input
												dimension='lg'
												id='lastName'
												autoComplete='family-name'
												name='lastName'
												placeholder='Last Name'
												value={formik.values.lastName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FieldWrap>
									</Validation>
								</div>

								{/* Headline */}
								<div>
									<Label htmlFor='headline'>Headline</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.headline}
										validFeedback='Good'
										invalidFeedback={formik.errors.headline}>
										<FieldWrap
											firstSuffix={
												<Icon icon='HeroBriefcase' className='mx-2' />
											}>
											<Input
												dimension='lg'
												id='headline'
												name='headline'
												placeholder='e.g., Senior Frontend Engineer'
												value={formik.values.headline}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FieldWrap>
									</Validation>
								</div>

								{/* Location */}
								<div>
									<Label htmlFor='location'>Location</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.location}
										validFeedback='Good'
										invalidFeedback={formik.errors.location}>
										<FieldWrap
											firstSuffix={
												<Icon icon='HeroMapPin' className='mx-2' />
											}>
											<Input
												dimension='lg'
												id='location'
												name='location'
												placeholder='e.g., Lahore, Pakistan'
												value={formik.values.location}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FieldWrap>
									</Validation>
								</div>

								{/* Industry */}
								<div>
									<Label htmlFor='industry'>Industry</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.industry}
										validFeedback='Good'
										invalidFeedback={formik.errors.industry}>
										<FieldWrap
											firstSuffix={
												<Icon icon='HeroBuildingOffice' className='mx-2' />
											}>
											<Input
												dimension='lg'
												id='industry'
												name='industry'
												placeholder='e.g., Information Technology & Services'
												value={formik.values.industry}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FieldWrap>
									</Validation>
								</div>

								{/* Public Profile URL */}
								<div>
									<Label htmlFor='publicProfileUrl'>Public Profile URL</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.publicProfileUrl}
										validFeedback='Good'
										invalidFeedback={formik.errors.publicProfileUrl}>
										<FieldWrap
											firstSuffix={<Icon icon='HeroLink' className='mx-2' />}>
											<Input
												dimension='lg'
												id='publicProfileUrl'
												name='publicProfileUrl'
												placeholder='e.g., https://linkedin.com/in/your-profile'
												value={formik.values.publicProfileUrl}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FieldWrap>
									</Validation>
								</div>

								{/* Skills (Multi-select) */}
								<div className='lg:col-span-2'>
									<Label htmlFor='skills'>Skills</Label>
									<CreatableSelect
										id='skills'
										name='skills'
										isMulti
										placeholder='Add your skills...'
										options={formik.values.skills.map((s) => ({
											value: s,
											label: s,
										}))}
										value={formik.values.skills.map((s) => ({
											value: s,
											label: s,
										}))}
										onChange={(newValue) => {
											formik.setFieldValue(
												'skills',
												newValue ? newValue.map((item) => item.value) : [],
											);
										}}
										onBlur={() => formik.setFieldTouched('skills', true)}
									/>
								</div>

								{/* Summary */}
								<div className='lg:col-span-2'>
									<Label htmlFor='summary'>Summary</Label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.summary}
										validFeedback='Good'
										invalidFeedback={formik.errors.summary}>
										<Textarea
											dimension='lg'
											id='summary'
											name='summary'
											rows={4}
											placeholder='Write a brief summary of your professional experience...'
											value={formik.values.summary}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</Validation>
								</div>

								{/* Education Section */}
								<div className='lg:col-span-2'>
									<hr className='my-4' />
									<h2 className='text-xl font-semibold'>Education</h2>
								</div>

								{formik.values.education.map((edu, index) => (
									<div
										key={index}
										className='relative grid grid-cols-1 gap-4 rounded-md border p-4 md:grid-cols-2 lg:col-span-2'>
										{formik.values.education.length > 1 && (
											<Button
												type='button'
												onClick={() => handleRemoveEducation(index)}
												className='absolute right-2 top-2'
												color='red'
												variant='solid'>
												<Icon icon='HeroTrash' />
											</Button>
										)}
										<div>
											<Label htmlFor={`education[${index}].school`}>
												School
											</Label>
											<Input
												id={`education[${index}].school`}
												name={`education[${index}].school`}
												placeholder='School Name'
												value={edu.school}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div>
											<Label htmlFor={`education[${index}].degree`}>
												Degree
											</Label>
											<Input
												id={`education[${index}].degree`}
												name={`education[${index}].degree`}
												placeholder='e.g., BS Computer Science'
												value={edu.degree}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div>
											<Label htmlFor={`education[${index}].fieldOfStudy`}>
												Field of Study
											</Label>
											<Input
												id={`education[${index}].fieldOfStudy`}
												name={`education[${index}].fieldOfStudy`}
												placeholder='e.g., Computer Science'
												value={edu.fieldOfStudy}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div className='grid grid-cols-2 gap-4'>
											<div>
												<Label htmlFor={`education[${index}].start`}>
													Start Date
												</Label>
												<Input
													type='month'
													id={`education[${index}].start`}
													name={`education[${index}].start`}
													placeholder='YYYY-MM'
													value={
														edu.start
															? `${edu.start.year}-${String(edu.start.month).padStart(2, '0')}`
															: ''
													}
													onChange={(e) => {
														const [year, month] = e.target.value
															.split('-')
															.map(Number);
														formik.setFieldValue(
															`education[${index}].start`,
															{ year, month },
														);
													}}
													onBlur={formik.handleBlur}
												/>
											</div>
											<div>
												<Label htmlFor={`education[${index}].end`}>
													End Date
												</Label>
												<Input
													type='month'
													id={`education[${index}].end`}
													name={`education[${index}].end`}
													placeholder='YYYY-MM or Present'
													value={
														edu.end
															? `${edu.end.year}-${String(edu.end.month).padStart(2, '0')}`
															: ''
													}
													onChange={(e) => {
														const [year, month] = e.target.value
															.split('-')
															.map(Number);
														formik.setFieldValue(
															`education[${index}].end`,
															{ year, month },
														);
													}}
													onBlur={formik.handleBlur}
												/>
											</div>
										</div>
									</div>
								))}

								<div className='flex justify-end lg:col-span-2'>
									<Button
										onClick={handleAddEducation}
										rightIcon='HeroPlus'
										variant='solid'
										type='button'>
										Add Education
									</Button>
								</div>

								{/* Work Experience Section */}
								<div className='lg:col-span-2'>
									<hr className='my-4' />
									<h2 className='text-xl font-semibold'>Work Experience</h2>
								</div>

								{formik.values.workExperience.map((exp, index) => (
									<div
										key={index}
										className='relative grid grid-cols-1 gap-4 rounded-md border p-4 md:grid-cols-2 lg:col-span-2'>
										{formik.values.workExperience.length > 1 && (
											<Button
												type='button'
												onClick={() => handleRemoveWorkExperience(index)}
												className='absolute right-2 top-2'
												color='red'
												variant='solid'>
												<Icon icon='HeroTrash' />
											</Button>
										)}
										<div>
											<Label htmlFor={`workExperience[${index}].company`}>
												Company
											</Label>
											<Input
												id={`workExperience[${index}].company`}
												name={`workExperience[${index}].company`}
												placeholder='Company Name'
												value={exp.company}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div>
											<Label htmlFor={`workExperience[${index}].role`}>
												Role
											</Label>
											<Input
												id={`workExperience[${index}].role`}
												name={`workExperience[${index}].role`}
												placeholder='e.g., Senior Frontend Engineer'
												value={exp.role}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div>
											<Label htmlFor={`workExperience[${index}].location`}>
												Location
											</Label>
											<Input
												id={`workExperience[${index}].location`}
												name={`workExperience[${index}].location`}
												placeholder='Location'
												value={exp.location}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div>
											<Label htmlFor={`workExperience[${index}].industry`}>
												Industry
											</Label>
											<Input
												id={`workExperience[${index}].industry`}
												name={`workExperience[${index}].industry`}
												placeholder='Industry'
												value={exp.industry}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div>
											<Label htmlFor={`workExperience[${index}].companyUrl`}>
												Company URL
											</Label>
											<Input
												id={`workExperience[${index}].companyUrl`}
												name={`workExperience[${index}].companyUrl`}
												placeholder='https://www.company.com'
												value={exp.companyUrl}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div className='grid grid-cols-2 gap-4'>
											<div>
												<Label htmlFor={`workExperience[${index}].start`}>
													Start Date
												</Label>
												<Input
													type='month'
													id={`workExperience[${index}].start`}
													name={`workExperience[${index}].start`}
													placeholder='YYYY-MM'
													value={
														exp.start
															? `${exp.start.year}-${String(exp.start.month).padStart(2, '0')}`
															: ''
													}
													onChange={(e) => {
														const [year, month] = e.target.value
															.split('-')
															.map(Number);
														formik.setFieldValue(
															`workExperience[${index}].start`,
															{ year, month },
														);
													}}
													onBlur={formik.handleBlur}
												/>
											</div>
											<div>
												<Label htmlFor={`workExperience[${index}].end`}>
													End Date
												</Label>
												<Input
													type='month'
													id={`workExperience[${index}].end`}
													name={`workExperience[${index}].end`}
													placeholder='YYYY-MM or Present'
													value={
														exp.end
															? `${exp.end.year}-${String(exp.end.month).padStart(2, '0')}`
															: ''
													}
													onChange={(e) => {
														const [year, month] = e.target.value
															.split('-')
															.map(Number);
														formik.setFieldValue(
															`workExperience[${index}].end`,
															{ year, month },
														);
													}}
													onBlur={formik.handleBlur}
												/>
											</div>
										</div>
										<div className='md:col-span-2'>
											<Label htmlFor={`workExperience[${index}].description`}>
												Description
											</Label>
											<Textarea
												id={`workExperience[${index}].description`}
												name={`workExperience[${index}].description`}
												rows={3}
												placeholder='Describe your responsibilities and achievements'
												value={exp.description}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
									</div>
								))}

								<div className='flex justify-end lg:col-span-2'>
									<Button
										onClick={handleAddWorkExperience}
										rightIcon='HeroPlus'
										variant='solid'
										type='button'>
										Add Work Experience
									</Button>
								</div>

								{/* --- */}
								<div className='mt-4 flex justify-between gap-2 lg:col-span-2'>
									<Button
										isDisable={formik.isSubmitting || loading}
										isLoading={formik.isSubmitting}
										variant='solid'
										color='blue'
										type='submit'>
										{isEditPage ? 'Update CV' : 'Create CV'}
									</Button>
									<Button
										onClick={() => navigateTo('/dashboard/custom-cv')}
										variant='solid'
										color='zinc'
										type='button'>
										Back
									</Button>
								</div>
							</form>
						</CardBody>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default CreateCustomCVPage;
