import Validation from '../../../components/form/Validation';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';
import { useFormik } from 'formik';
import Label from '../../../components/form/Label';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import Textarea from '../../../components/form/Textarea';

type TValues = {
	firstName: string;
	lastName: string;
	email: string;
	industry: string;
	about: string;
	image: string;
};

const ProfileFormPartial = () => {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			email: '',
			lastName: '',
			industry: '',
			about: '',
			image: '',
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
		onSubmit: (values: TValues) => {
			console.log({ values });
		},
	});
	return (
		<form className='flex w-full gap-4'>
			<div className='group relative h-fit w-fit max-md:mx-auto'>
				<img
					className=' aspect-square w-52 rounded-full'
					src={profileImageUrlValidationCheck('')}
					alt='profile'
				/>

				<Icon
					color='zinc'
					size='text-5xl'
					className='absolute left-1/2 top-1/2 -translate-x-1/2 rounded-xl bg-zinc-100/50 p-2  opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100'
					icon='HeroCamera'
				/>
			</div>
			<div className='flex w-full flex-1 flex-col gap-4 '>
				<div className='flex items-center gap-4 max-md:flex-col'>
					<div className='w-full'>
						<Label htmlFor='title'>First Name</Label>
						<Validation
							isValid={formik.isValid}
							isTouched={formik.touched.firstName}
							invalidFeedback={''}
							validFeedback=''>
							<FieldWrap>
								<Input
									className='!bg-white dark:!bg-zinc-800'
									placeholder='Enter your firstr name'
									value={formik.values.firstName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									autoComplete='first-name'
									name='first-name'
									dimension='lg'
								/>
							</FieldWrap>
						</Validation>
					</div>
					<div className='w-full'>
						<Label htmlFor='title'>Last Name</Label>
						<Validation
							isValid={formik.isValid}
							isTouched={formik.touched.lastName}
							invalidFeedback={formik.errors.lastName}
							validFeedback='Good'>
							<FieldWrap>
								<Input
									className='!bg-white dark:!bg-zinc-800'
									dimension='lg'
									autoComplete='last-name'
									name='last-name'
									value={formik.values.lastName}
									placeholder='Enter your last name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FieldWrap>
						</Validation>
					</div>
				</div>
				<div className='flex items-center gap-4 max-md:flex-col '>
					<div className='w-full'>
						<Label htmlFor='title'>Email</Label>
						<Validation
							isValid={formik.isValid}
							isTouched={formik.touched.email}
							invalidFeedback={''}
							validFeedback=''>
							<FieldWrap
								firstSuffix={
									<Icon size='text-2xl' icon='HeroEnvelope' className='mx-2' />
								}>
								<Input
									className='!bg-white dark:!bg-zinc-800'
									type='email'
									dimension='lg'
									autoComplete='email'
									name='email'
									value={formik.values.email}
									placeholder='Enter your email'
									onChange={formik.handleChange}
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
							invalidFeedback=''
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
				<div className=''>
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
			</div>
		</form>
	);
};

export default ProfileFormPartial;
