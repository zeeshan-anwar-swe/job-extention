import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// --- Local Component Imports (assuming these exist) ---
import Button from '../../../../../components/ui/Button';
import Container from '../../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useReduxStore';
import Footer from '../../../../../components/layouts/Footer/Footer';
import Label from '../../../../../components/form/Label';
import Validation from '../../../../../components/form/Validation';
import Input from '../../../../../components/form/Input';
import RichText from '../../../../../components/RichText';
import SelectReact from '../../../../../components/form/SelectReact';
import { createBlog, getBlogCategoryList } from '../../../../../store/slices/Blog.slice';
import Alert from '../../../../../components/ui/Alert';
import { Image } from 'antd';
// ----------------------------------------------------

type TBlogFormData = {
	title: string;
	content: string;
	categoryId: string;
	readingTime: number|string;
	// 💡 REMOVED: file field
};

const CreateBlogPage: React.FC = () => {
	const [previewUrl, setPreviewUrl] = useState<any>(null);
	const [file, setFile] = useState<any>(null);
	const { loading, rows } = useAppSelector((state) => state.blog.blogCategoryList);
	const navigateTo = useNavigate();
	const dispatch = useAppDispatch();

	const blogPostFormData = useFormik<TBlogFormData>({
		initialValues: {
			title: '',
			content: '',
			readingTime: 0,
			categoryId: '',
		},

		validate: (values) => {
			const errors: Partial<TBlogFormData> = {};

			if (!values.title) {
				errors.title = 'Required';
			}

			if (!values.categoryId) {
				errors.categoryId = 'Required';
			}

            if (Number(values.readingTime) <= 0) {
				errors.readingTime = "Greated than 1";
			}


			return errors;
		},

		onSubmit: async(values) => {
            const formData = new FormData()
            formData.append("title", values.title)
            formData.append("content", values.content)
            formData.append("readingTime", String(values.readingTime))
            formData.append("categoryId", values.categoryId)
            file && formData.append("file", file)
            await dispatch(createBlog(formData))
            navigateTo("/dashboard/blogs")
			// Submit your data here
		},
	});

	const onFileChange = (event: any) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			setFile(file);
			// 1. Create a new FileReader instance
			const reader = new FileReader();

			// 2. Set the function to run when the file is done loading
			reader.onload = (e: any) => {
				// e.target.result contains the Base64 data URL
				setPreviewUrl(e.target.result);
			};

			// 3. Read the file as a data URL (Base64)
			reader.readAsDataURL(file);
		} else {
			// Clear the preview if no file is selected
			setPreviewUrl(null);
		}
	};

	useEffect(() => {
		dispatch(getBlogCategoryList({}));
	}, [dispatch]);

	// 💡 REMOVED: Image helper functions (handleRemoveFile, customRequest, fileList)

	// Map the category list for the SelectReact component
	const categoryOptions = rows.map((category) => ({
		label: category.name,
		value: category.id,
	}));

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb
						path='Page / Blog'
						currentPage='Create Blog Post'
					/>
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Blogs Posts'>
				<Subheader>
					<SubheaderLeft>{""}</SubheaderLeft>
					<SubheaderRight>
						<Button
							onClick={() =>
								navigateTo(
									'/dashboard/blogs',
								)
							}
							rightIcon='HeroArrowBack'
							variant='solid'>
							Back
						</Button>
					</SubheaderRight>
				</Subheader>

				<Container className='h-full flex items-center'>
					<form
						className='w-full p-4 grid grid-cols-2 gap-4 bg-white rounded-lg dark:bg-zinc-900'
						onSubmit={
							blogPostFormData.handleSubmit
						}>
						{/* TITLE INPUT */}
						<div>
							<Label htmlFor='title'>
								Title
							</Label>
							<Validation
								isValid={
									!!blogPostFormData
										.values
										.title &&
									!blogPostFormData
										.errors
										.title
								}
								isTouched={
									blogPostFormData
										.touched
										.title
								}
								invalidFeedback={
									blogPostFormData
										.errors
										.title
								}
								validFeedback=''>
								<Input
									rounded='rounded-full'
									name='title'
									id='title'
									placeholder='Enter Blog Post Title'
									onChange={
										blogPostFormData.handleChange
									}
									value={
										blogPostFormData
											.values
											.title
									}
								/>
							</Validation>
						</div>

						{/* READING TIME INPUT */}
						<div>
							<Label htmlFor='readingTime'>
								Reading Time
								(minutes)
							</Label>
							<Validation
								isValid={
									!blogPostFormData
										.errors
										.readingTime
								}
								isTouched={
									blogPostFormData
										.touched
										.readingTime
								}
								invalidFeedback={
									blogPostFormData
										.errors
										.readingTime
								}
								validFeedback=''>
								<Input
									rounded='rounded-full'
									name='readingTime'
									id='readingTime'
									type='number'
									placeholder='Enter reading time in minutes'
									onChange={
										blogPostFormData.handleChange
									}
									value={
										blogPostFormData
											.values
											.readingTime
									}
								/>
							</Validation>
						</div>

						{/* CATEGORY SELECT */}
						<div className='col-span-1 '>
							<Label htmlFor='Category'>
								Category
							</Label>
							<Validation
								isValid={
									!!blogPostFormData
										.values
										.categoryId &&
									!blogPostFormData
										.errors
										.categoryId
								}
								isTouched={
									blogPostFormData
										.touched
										.categoryId
								}
								invalidFeedback={
									blogPostFormData
										.errors
										.categoryId
								}
								validFeedback=''>
								<SelectReact
                                    isClearable
									rounded='rounded-full'
									isLoading={
										loading
									}
									placeholder='Select category for blog'
									name='category'
									value={
										categoryOptions.find(
											(
												option,
											) =>
												option.value ===
												blogPostFormData
													.values
													.categoryId,
										) ||
										null
									}
									options={
										categoryOptions
									}
									onChange={(
										option: any,
									) => {
										blogPostFormData.setFieldValue(
											'categoryId',
											option
												? option.value
												: '',
										);
									}}
								/>
							</Validation>
						</div>

						{/* READING TIME INPUT */}
						<div>
							<Label htmlFor='file'>
								Select Image
							</Label>
							<Alert
								id='file'
								className='w-full py-1 '
								variant='solid'
								colorIntensity='100'
								rounded='rounded-full'>
								<input
									id='file'
									name='file'
									type='file'
									accept='image/*'
									className='px-4'
									placeholder='Select Image'
									onChange={
										onFileChange
									}
								/>
							</Alert>
						</div>

						{previewUrl && (
							<div className='trans-all col-span-2 flex justify-center'>
								<Image
									className='mx-auto aspect-video max-w-4xl rounded-lg  object-cover'
									src={
										previewUrl
									}
								/>
							</div>
						)}

						<div className='col-span-2'>
							<Label htmlFor='content'>
								Content
							</Label>
							<Validation
								isValid={
									!blogPostFormData
										.errors
										.content
								}
								isTouched={
									blogPostFormData
										.touched
										.content
								}
								invalidFeedback={
									blogPostFormData
										.errors
										.content
								}
								validFeedback=''>
								<RichText
                                    isImageInsertable={true}
									className='min-h-48'
									title='Content'
									id='content'
									value={
										blogPostFormData
											.values
											.content
											? JSON.parse(
													blogPostFormData
														.values
														.content,
												)
											: []
									}
									handleChange={(
										value: any,
									) =>
										blogPostFormData.setFieldValue(
											'content',
											JSON.stringify(
												value,
											),
										)
									}
								/>
							</Validation>
						</div>

						{/* SUBMIT BUTTON */}
						<div className='col-span-2 pt-4'>
							<Button
                                isLoading={blogPostFormData.isSubmitting}
								type='submit'
								variant='solid'
								className='w-full'>
								Create Post
							</Button>
						</div>
					</form>
				</Container>
			
			</PageWrapper>
		</>
	);
};

export default CreateBlogPage;
