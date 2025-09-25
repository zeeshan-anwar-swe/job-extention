import { useNavigate } from 'react-router-dom';
import useImageValidation from '../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../components/ui/ImageLoaderWraper';

function LatestCard({ image, headingA, headingB, title, description, navigatePath }: any) {
	const navigate = useNavigate();

	const handleTitleClick = () => {
		if (navigatePath) {
			navigate(navigatePath);
		}
	};

	const { loading, imageUrl } = useImageValidation(image);

	return (
		<div className='flex-1 cursor-pointer rounded-2xl border-2 border-white bg-white/50'>
			<ImageLoaderWraper
				rounded='rounded-2xl'
				className='mx-auto aspect-video w-full rounded-2xl'
				loading={loading}
				height='h-40'>
				<img src={imageUrl} alt='crm' className='aspect-video w-full rounded-2xl p-2 object-cover' />
			</ImageLoaderWraper>

			<div className='flex flex-col gap-2 p-6'>
				<div className='flex w-fit items-center rounded-full border-b-black bg-neutral-300 px-1 py-1 lg:px-1.5 lg:py-1.5'>
					<div className='mr-1 rounded-full bg-[#010314] px-2 text-center text-xs font-medium text-white lg:mr-2 lg:px-3'>
						{headingA}
					</div>
					<span className='text-xs font-medium text-[#010314]/50'>{headingB}</span>
				</div>
				<div className='flex items-center ' onClick={handleTitleClick}>
					<h1 className='text-xl font-medium dark:text-[#010314]'>{title}</h1>

					<img src="/assets/arrow.png" alt='arrow' className='ml-2' />
				</div>
				<p className='text-justify text-base font-normal text-[#7E808A]'>{description}</p>
			</div>
		</div>
	);
}

export default LatestCard;
