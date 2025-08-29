import useImageValidation from '../../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';

export const CVProfilePhoto = ({ image }: { image?: string }) => {
	const { loading, imageUrl } = useImageValidation(image);
	return (
		<ImageLoaderWraper loading={loading} height='h-40'>
			<img
				className='w-40 rounded-full object-cover'
				src={imageUrl}
				alt='cadidate-image'
			/>
		</ImageLoaderWraper>
	);
};
