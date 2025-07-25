import Card, {
	CardBody,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/ui/Card';
import classNames from 'classnames';
import Validation from '../../../../../../components/form/Validation';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Input from '../../../../../../components/form/Input';
import Label from '../../../../../../components/form/Label';
import Textarea from '../../../../../../components/form/Textarea';
import { FormikProps } from 'formik';
import { EditCVFormValues } from '../CandidateCVEdit.page';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import { useEffect } from 'react';
import MultipleValueSelectorPartial from '../../../../components/MultipleValueSelector.partial';
import { getSocialLinkWithId } from '../../../../../../utils/helper';
import Tooltip from '../../../../../../components/ui/Tooltip';

export const EditCVFormPartial = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const { cadnidateProfile } = useSelector((state: RootState) => state.candidates);

	useEffect(() => {
		if (cadnidateProfile) {
			const GitHub: { id: string; link: string } | null = getSocialLinkWithId(
				cadnidateProfile?.socialProfiles ?? [],
				'GitHub',
			);
			const LinkedIn: { id: string; link: string } | null = getSocialLinkWithId(
				cadnidateProfile?.socialProfiles ?? [],
				'LinkedIn',
			);

			GitHub && formik.setFieldValue('GitHub', GitHub.link);
			LinkedIn && formik.setFieldValue('LinkedIn', LinkedIn.link);

			formik.setFieldValue('roles', cadnidateProfile?.roles ?? []);
			formik.setFieldValue('name', cadnidateProfile?.candidate?.name ?? '');
			formik.setFieldValue('experience', cadnidateProfile?.experience ?? '');
			formik.setFieldValue('cvText', cadnidateProfile?.cv ?? '');
			formik.setFieldValue('education', cadnidateProfile?.education ?? '');
			// formik.setFieldValue('location', cadnidateProfile?.location ?? '');
			// formik.setFieldValue('availabilty', cadnidateProfile?.availabilty ?? '');
			formik.setFieldValue('about', cadnidateProfile?.about ?? '');
		}
	}, [cadnidateProfile, formik.setValues]); // Added formik.setValues to the dependency array

	return (
		<Card className='col-span-9 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader className='!block'>
				<CardTitle>CV Details</CardTitle>
				<CardSubTitle>Edit and Update Candidate CV</CardSubTitle>
			</CardHeader>
			<CardBody>
				<form className='flex flex-col gap-4' noValidate onSubmit={formik.handleSubmit}>
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
										onChange={() => {}}
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
										onChange={formik.handleChange}
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
							<Input
								dimension='lg'
								id='about'
								name='about'
								placeholder='Enter your bio'
								value={formik.values.about}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Validation>
					</div>

					<div className={classNames({ 'mb-1': !formik.isValid })}>
						<Label htmlFor='cvText'>Write CV</Label>
						<Validation
							isValid={formik.isValid}
							isTouched={formik.touched.cvText}
							invalidFeedback={formik.errors.cvText}
							validFeedback=''>
							<Textarea
								className='max-h-72 min-h-48'
								rows={5}
								dimension='lg'
								id='cvText'
								name='cvText'
								placeholder='Professional Summary (min 50 chars)'
								value={formik.values.cvText}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Validation>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};
