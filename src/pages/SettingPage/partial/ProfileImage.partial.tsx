import React, { useEffect, useState } from 'react';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import Label from '../../../components/form/Label';
import Icon from '../../../components/icon/Icon';
import { useAuth } from '../../../context/authContext';
import { FormikProps } from 'formik';
import { UserProfileDataType } from '../Setting.page';
import ImageLoaderWraper from '../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../hooks/useImageValidation';

export const ProfileImagePartial = ({ formik }: { formik: FormikProps<UserProfileDataType> }) => {
	const { userStorage } = useAuth();
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const { loading, imageUrl } = useImageValidation(userStorage.image);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			formik.values.image = file;
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		return () => {
			setImagePreview(null);
		};
	}, []);

	return (
		<div className='group relative h-fit w-fit max-md:mx-auto'>
			{imagePreview ? (
				<img
					className='aspect-square w-52 rounded-full object-cover'
					src={imagePreview}
					alt='profile'
				/>
			) : (
				<ImageLoaderWraper loading={loading} height='h-52'>
					<img
						className='aspect-square w-52 rounded-full object-cover'
						src={imageUrl}
						alt='profile'
					/>
				</ImageLoaderWraper>
			)}
			<Label htmlFor='setting-page-profile'>
				<Icon
					color='zinc'
					size='text-5xl'
					className='absolute  left-1/2 top-1/2 -translate-x-1/2 rounded-xl bg-zinc-100/50 p-2  opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100'
					icon='HeroCamera'
				/>
			</Label>
			<input
				onChange={handleImageChange}
				id='setting-page-profile'
				className='hidden'
				type='file'
				accept='image/*'
			/>
		</div>
	);
};
