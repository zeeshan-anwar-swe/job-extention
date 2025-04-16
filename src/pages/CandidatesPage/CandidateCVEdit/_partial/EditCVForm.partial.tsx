import Card, {
	CardBody,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import classNames from 'classnames';
import Validation from '../../../../components/form/Validation';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';
import Label from '../../../../components/form/Label';
import Textarea from '../../../../components/form/Textarea';
import { FormikProps } from 'formik';
import { EditCVFormValues } from '../CandidateCVEdit.page';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useEffect } from 'react';

export const EditCVFormPartial = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const { cadnidateProfile } = useSelector((state: RootState) => state.candidates);

	useEffect(() => {
		if (cadnidateProfile) {
			console.log('cadnidateProfile', cadnidateProfile);

			formik.setValues({
				name: cadnidateProfile.profile?.candidate?.name ?? '',
				roles: cadnidateProfile.profile?.roles
					? cadnidateProfile.profile.roles.join(' ')
					: '',
				experience: cadnidateProfile?.profile?.experience ?? '',
				cvText: cadnidateProfile.profile?.cv ?? '',
				education: cadnidateProfile?.profile?.education ?? '',
			});
		}
	}, [cadnidateProfile]);
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
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>

						<div className={'flex-1 ' + classNames({ 'mb-0': !formik.isValid })}>
							<Label htmlFor='role'>Role</Label>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.roles}
								invalidFeedback={formik.errors.roles}
								validFeedback=''>
								<Input
									dimension='lg'
									id='roles'
									name='roles'
									placeholder='Current Role'
									value={formik.values.roles}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</Validation>
						</div>
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

					<div className={classNames({ 'mb-1': !formik.isValid })}>
						<Label htmlFor='cvText'>Write CV</Label>
						<Validation
							isValid={formik.isValid}
							isTouched={formik.touched.cvText}
							invalidFeedback={formik.errors.cvText}
							validFeedback=''>
							<Textarea
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
