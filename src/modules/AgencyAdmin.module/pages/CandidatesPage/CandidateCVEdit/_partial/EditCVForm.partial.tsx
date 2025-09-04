import classNames from 'classnames';
import {  Descendant } from 'slate';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../../store';
import { EditCVFormValues } from '../CandidateCVEdit.page';
import Label from '../../../../../../components/form/Label';
import Input from '../../../../../../components/form/Input';
import RichText from '../../../../../../components/RichText';
import Tooltip from '../../../../../../components/ui/Tooltip';
import Textarea from '../../../../../../components/form/Textarea';
import { JobSelectorForCustomCV } from './JobSelectorForCustomCV';
import Checkbox  from '../../../../../../components/form/Checkbox';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import { getSocialLinkWithId } from '../../../../../../utils/helper';
import Validation from '../../../../../../components/form/Validation';
import MultipleValueSelectorPartial from '../../../../components/MultipleValueSelector.partial';
import Card, { CardBody, CardHeader, CardSubTitle, CardTitle } from '../../../../../../components/ui/Card';

export const EditCVFormPartial = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const { cadnidateProfile } = useSelector((state: RootState) => state.candidates);
	const [cvTextValue, setCvTextValue] = useState<Descendant[]>(
		cadnidateProfile?.cv
			? (JSON.parse(cadnidateProfile?.cv) as Descendant[])
			: (JSON.parse('[{"type":"paragraph","children":[{"text":""}]}]') as Descendant[]),
	);

	useEffect(() => {
		if (cadnidateProfile) {
			const GitHub: { id: string; link: string } | null = getSocialLinkWithId(
				cadnidateProfile?.socialProfiles ?? [],
				'GitHub',
			);

			GitHub && formik.setFieldValue('GitHub', GitHub.link);

			formik.setFieldValue('LinkedIn', cadnidateProfile.publicProfileUrl);

			formik.setFieldValue('roles', cadnidateProfile?.roles ?? []);
			formik.setFieldValue('name', cadnidateProfile?.candidate?.name ?? '');
			formik.setFieldValue('experience', cadnidateProfile?.experience ?? '');
			formik.setFieldValue('education', cadnidateProfile?.education ?? '');

			formik.setFieldValue('about', cadnidateProfile?.about ?? '');
		}
	}, [cadnidateProfile]); // Added formik.setValues to the dependency array

	return (
		<Card className='col-span-9 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader className='!block'>
				<CardTitle>CV Details</CardTitle>
				<CardSubTitle>Edit and Update Candidate CV</CardSubTitle>
			</CardHeader>
			<CardBody>
				<form className='flex flex-col gap-4' noValidate onSubmit={formik.handleSubmit}>
					<div className='grid grid-cols-1 gap-4'>
						<Checkbox
							variant='default'
							label='Create as Custom CV'
							id='optionA'
							onChange={(e) => {
								if (e.target.checked) {
									formik.setFieldValue('action', 'create');
								} else {
									formik.setFieldValue('action', 'update');
								}
							}}
							checked={formik.values.action === 'create' ? true : false}
						/>
						{formik.values.action === 'create' && (
							<JobSelectorForCustomCV formik={formik} />
						)}
					</div>

					<div className='flex gap-4'>
						<div className={'flex-1 ' + classNames({ 'mb-0': !formik.isValid })}>
							<Label htmlFor='name'>Name</Label>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.name}
								invalidFeedback={formik.errors.name}
								validFeedback=''>
								<FieldWrap>
									<Input
										dimension='lg'
										id='name'
										name='name'
										placeholder='Name'
										value={formik.values.name}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>

						<Tooltip text='Write text and press enter'>
							<div className={'flex-1 ' + classNames({ 'mb-0': !formik.isValid })}>
								<Label htmlFor='roles'>Roles</Label>
								<MultipleValueSelectorPartial
									initialValues={cadnidateProfile?.roles ?? []}
									id='rolesForEditCV'
									name='roles'
									formik={formik}
								/>
							</div>
						</Tooltip>
					</div>

					<div className='flex gap-4'>
						<div className={'flex-1 ' + classNames({ 'mb-1': !formik.isValid })}>
							<Label htmlFor='experience'>Experience</Label>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.experience}
								invalidFeedback={formik.errors.experience}
								validFeedback=''>
								<Input
									type='number'
									dimension='lg'
									id='experience'
									name='experience'
									placeholder='Years of Experience'
									value={formik.values.experience}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Validation>
						</div>

						<div className={'flex-1 ' + classNames({ 'mb-1': !formik.isValid })}>
							<Label htmlFor='education'>Education</Label>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.education}
								invalidFeedback={formik.errors.education}
								validFeedback=''>
								<Input
									dimension='lg'
									id='education'
									name='education'
									placeholder='Highest Education'
									value={formik.values.education}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Validation>
						</div>
					</div>
					<div className='flex gap-4'>
						<div className={'flex-1 ' + classNames({ 'mb-1': !formik.isValid })}>
							<Label htmlFor='LinkedIn'>LinkedIn Profile</Label>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.LinkedIn}
								invalidFeedback={formik.errors.LinkedIn}
								validFeedback=''>
								<FieldWrap>
									<Input
										dimension='lg'
										id='LinkedIn'
										name='LinkedIn'
										placeholder='Enter your GitHub profile url'
										value={formik.values.LinkedIn}
										// onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>

						<div className={'flex-1 ' + classNames({ 'mb-1': !formik.isValid })}>
							<Label htmlFor='GitHub'>GitHub Profile</Label>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.GitHub}
								invalidFeedback={formik.errors.GitHub}
								validFeedback=''>
								<Input
									dimension='lg'
									id='GitHub'
									name='GitHub'
									placeholder='Enter your GitHub profile url'
									value={formik.values.GitHub}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Validation>
						</div>
					</div>

					<div className={classNames({ 'mb-1': !formik.isValid })}>
						<Label htmlFor='about'>About</Label>
						<Validation
							isValid={formik.isValid}
							isTouched={formik.touched.about}
							invalidFeedback={formik.errors.about}
							validFeedback=''>
							<Textarea
								dimension='lg'
								id='about'
								name='about'
								rows={3}
								className='max-h-72 min-h-36'
								placeholder='Enter your bio'
								value={formik.values.about}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Validation>
					</div>

					<div className={classNames({ 'mb-1': !formik.isValid })}>
						<Label htmlFor='cvText'>Write CV</Label>
						{/* <Validation
							isValid={formik.isValid}
							isTouched={formik.touched.cvText}
							invalidFeedback={formik.errors.cvText}
							validFeedback=''> */}
						<RichText
							id='cvText'
							value={cvTextValue}
							className='min-h-48'
							handleChange={(event) => {
								formik
									.setFieldValue('cvText', event)
									.then(() => {
										setCvTextValue(event);
									})
									.catch(() => {});
							}}
						/>
						{/* <Textarea
								className='max-h-72 min-h-48'
								rows={5}
								dimension='lg'
								id='cvText'
								name='cvText'
								placeholder='Professional Summary (min 50 chars)'
								value={formik.values.cvText}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/> */}
						{/* </Validation> */}
					</div>
				</form>
			</CardBody>
		</Card>
	);
};
