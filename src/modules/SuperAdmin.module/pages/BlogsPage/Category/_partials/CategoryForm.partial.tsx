import { Field, useFormik } from 'formik';
import Validation from '../../../../../../components/form/Validation';
import Input from '../../../../../../components/form/Input';
import Button from '../../../../../../components/ui/Button';
import Label from '../../../../../../components/form/Label';
import { cn } from '../../../../../../utils/cn';
// Import motion from framer-motion
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/useReduxStore';
import { createBlogCategory, setBlogCategoryDetails, updateBlogCategory } from '../../../../../../store/slices/Blog.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';

type TCategoryForm = {
	name: string;
	order: number;
};

// Define the animation properties
const animationVariants = {
	hidden: { opacity: 0, x: -20, transition: { duration: 0.3 } },
	visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};
const animationTransition = {
	duration: 0.3,
	delay: 0,
};

export const BlogCategoryFormPartial = () => {
	const dispatch = useAppDispatch();
	// Removed isField state

	const { data } = useAppSelector((state) => state.blog.blogCategoryDetails);

	const formData = useFormik<TCategoryForm>({
		initialValues: {
			name: '',
			order: 0,
		},

		validate: (values) => {
			const errors: any = {};
			if (!values.name) {
				errors.name = 'Required';
			}
			if (values.name.length < 3) {
				errors.name = 'Must be at least 3 characters long';
			}
			if (!values.order) {
				errors.order = 'Required';
			}
			if (values.order === 0) {
				errors.order = 'Must be at least 1';
			}
			return errors;
		},

		onSubmit: async (values) => {
			try {
				const result = data
					? await dispatch(
							updateBlogCategory({
								id: data.id,
								name: values.name,
								order: values.order,
							}),
						)
					: await dispatch(createBlogCategory(values));
				unwrapResult(result);
				formData.resetForm();
			} catch (e: any) {
				if (e?.message) {
					formData.setFieldError(
						'order',
						`${formData.values.order} already exists try another number`,
					);
				}
			}
		},
	});

	useEffect(() => {
		if (data) {
			formData.setValues({
				name: data.name,
				order: data.order,
			});
		} else {
			formData.resetForm();
		}
	}, [data]);

	return (
		<form className='flex items-end gap-4' onSubmit={formData.handleSubmit}>
			<>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={animationVariants}
					transition={{ ...animationTransition, delay: 0 }}
					className='block'>
					<Label htmlFor='name'>Name</Label>
					<Validation
						isValid={formData.isValid}
						isTouched={formData.touched.name}
						invalidFeedback={formData.errors.name}
						validFeedback='Good'>
						<Input
							rounded='rounded-full'
							id='name'
							name='name'
							onChange={
								formData.handleChange
							}
							placeholder='Category Name'
							type='text'
							value={formData.values.name}
						/>
					</Validation>
				</motion.div>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={animationVariants}
					transition={{
						...animationTransition,
						delay: 0.1,
					}}
					className='block'>
					<Label htmlFor='order'>Order</Label>

					<Validation
						isValid={formData.isValid}
						isTouched={formData.touched.order}
						invalidFeedback={formData.errors.order}
						validFeedback='Good'>
						<Input
							rounded='rounded-full'
							id='order'
							name='order'
							onChange={
								formData.handleChange
							}
							placeholder='Category Order'
							type='number'
							value={
								formData.values
									.order > 0
									? formData
											.values
											.order
									: ''
							}
						/>
					</Validation>
				</motion.div>
			</>

			{data && (
				<motion.div
					initial='hidden'
					animate='visible'
					variants={animationVariants}
					// Add a slight delay to the button
					transition={{
						...animationTransition,
						delay: 0.2,
					}}
					className='block'>
					<Button
						onClick={() => dispatch(setBlogCategoryDetails(null))}
						isLoading={formData.isSubmitting}
						variant='outline'
						className='h-fit'
						rounded='rounded-full'
						rightIcon='HeroXMark'
						type='button'>
						Canncel Update
					</Button>
				</motion.div>
			)}

			<motion.div
				initial='hidden'
				animate='visible'
				variants={animationVariants}
				// Add a slight delay to the button
				transition={{ ...animationTransition, delay: 0.2 }}
				className='block'>
				
				<Button
					isLoading={formData.isSubmitting}
					variant='solid'
					className='h-fit'
					rounded='rounded-full'
					rightIcon={data ? 'HeroCheck' : 'HeroPlus'} // Always show the create icon
					type='submit'>
					{data ? 'Update Category' : 'Create Category'}
				</Button>
			</motion.div>
		</form>
	);
};
