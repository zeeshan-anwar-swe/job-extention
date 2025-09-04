import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, leftVariants, rightVariants } from './_partial/animation';
import { useFormik } from 'formik';
import Validation from '../../../../components/form/Validation';
import Button from '../../../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { sendEmail } from '../../../../store/slices/User.slice';

// Define the type for the form values
interface FormValues {
	name: string;
	email: string;
	message: string;
}

function CONTACT() {
	const dispatch: AppDispatch = useDispatch();
	const formik = useFormik<FormValues>({
		initialValues: {
			name: '',
			email: '',
			message: '',
		},
		validate: (values) => {
			const errors: Partial<FormValues> = {};
			if (!values.name) {
				errors.name = 'Full Name is required';
			}
			if (!values.email) {
				errors.email = 'Email is required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.message) {
				errors.message = 'Message is required';
			}
			if (values.message.length < 10) {
				errors.message = 'Message should be at least 10 characters long';
			}
			return errors;
		},
		onSubmit: (values) => {
			dispatch(sendEmail(values))
				.then(() => {
					formik.resetForm();
					formik.setSubmitting(false);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});

	const handleCalendly = () => {
		formik.submitForm().then(() => {
			if (Object.keys(formik.errors).length > 0) {
				toast.error('Please fill in all fields correctly.');
				return;
			}
			const calendlyUrl = `https://calendly.com/saqlainaslam213/30min?`;
			window.open(calendlyUrl, '_blank');
		});
	};

	return (
		<div className='h-[calc(75vh)] w-full bg-[#e0e2f4]'>
			<section className='mx-auto max-w-[1280px]  bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10'>
				{/* contact section start */}
				<motion.section
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.3 }}>
					<div className='container mx-auto flex flex-col  items-start justify-between space-x-0 space-y-5 md:flex-row md:space-x-10'>
						<motion.div
							variants={leftVariants}
							className='rounded-4xl relative min-h-[600px] w-full overflow-hidden md:w-1/2'>
							<div
								className='absolute inset-0 rounded-lg border-2 border-white bg-cover bg-center bg-no-repeat opacity-30'
								style={{ backgroundImage: `url(/assets/contactbg.jpg)` }}></div>

							<div className='relative z-10 h-full'>
								<motion.div
									className='flex h-full items-end justify-center p-4'
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}>
									<img
										src='/images/animated-bear.gif'
										alt='Animated Bear'
										className='w-full max-w-[380px] object-contain md:max-w-[450px] lg:max-w-[800px]'
									/>
								</motion.div>
								<div className='px-2 md:px-4'>
									<img src='/assets/shines.png' alt='shines' />
								</div>
								<motion.div
									className='font-inter px-2 text-[30px] font-normal leading-[38px] tracking-normal text-white md:px-4'
									variants={itemVariants}>
									<p>Contact Us Today — We Would Love asdto Hear from You!</p>
								</motion.div>
							</div>
						</motion.div>

						<motion.div
							variants={rightVariants}
							className='flex w-full flex-col items-start space-y-5 md:w-1/2 md:space-y-3'>
							<motion.div
								variants={itemVariants}
								className='font-inter text-5xl font-medium leading-none tracking-[-0.02em] text-[#101828]'>
								Get in touch
							</motion.div>
							<motion.div
								variants={itemVariants}
								className='font-inter text-center text-base font-normal leading-6 text-[#75777A] md:text-left md:text-lg lg:text-xl'>
								Have questions or need assistance? Our team is here to help—reach
								out and let's connect!
							</motion.div>

							<form
								onSubmit={formik.handleSubmit}
								className='flex w-full flex-col space-y-5 md:space-y-3'>
								<motion.div
									whileFocus={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}>
									<label
										htmlFor='name'
										className='font-inter block text-sm font-medium leading-5 text-[#475467]'>
										Full Name*
									</label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.name}
										invalidFeedback={formik.errors.name}
										validFeedback=''>
										<motion.input
											type='text'
											id='name'
											name='name'
											placeholder='Enter your Name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.name}
											className='w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:h-10 md:rounded-2xl'
											transition={{ duration: 0.2 }}
										/>
									</Validation>
								</motion.div>

								<motion.div
									whileFocus={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}>
									<label
										htmlFor='email'
										className='font-inter block text-sm font-medium leading-5 text-[#475467]'>
										Email*
									</label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.email}
										invalidFeedback={formik.errors.email}
										validFeedback=''>
										<motion.input
											type='email'
											id='email'
											name='email'
											placeholder='Enter your Email'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.email}
											className='w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:h-10 md:rounded-2xl'
											transition={{ duration: 0.2 }}
										/>
									</Validation>
								</motion.div>

								<motion.div
									whileFocus={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}>
									<label
										htmlFor='message'
										className='font-inter block text-sm font-medium leading-5 text-[#475467]'>
										Message*
									</label>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.message}
										invalidFeedback={formik.errors.message}
										validFeedback=''>
										<motion.textarea
											id='message'
											name='message'
											placeholder='Message'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.message}
											className='md:h-45 h-20 w-full rounded-lg border-2 border-white bg-white/60 p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 md:rounded-2xl'
											rows={5}
											transition={{ duration: 0.2 }}></motion.textarea>
									</Validation>
								</motion.div>

								<motion.div
									variants={itemVariants}
									className='flex w-full flex-col justify-center space-y-3 md:space-y-5'>
									<Button
										isLoading={formik.isSubmitting}
										type='submit'
										variant='solid'
										className='bg-[linear-gradient(126.51deg,#1E51E8_42.05%,#0BA5EC_100%)] py-3'>
										Submit
									</Button>

									<motion.button
										type='button'
										onClick={handleCalendly}
										className='font-inter flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-white bg-white px-6 py-3 text-base font-semibold leading-6 text-[#1E51E8] md:w-auto md:rounded-2xl'
										whileTap={{ scale: 0.95 }}
										transition={{ duration: 0.2 }}>
										<img src='/assets/c.png' alt='c' className='h-5 w-5' />
										<span className='md:font-medium'>
											Book a Meeting on Calendly
										</span>
									</motion.button>
								</motion.div>
							</form>
						</motion.div>
					</div>
				</motion.section>
			</section>
		</div>
	);
}
export default CONTACT;
