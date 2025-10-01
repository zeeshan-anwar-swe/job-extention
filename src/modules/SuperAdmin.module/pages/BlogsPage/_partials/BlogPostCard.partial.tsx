import { FC } from 'react';
import Button from '../../../../../components/ui/Button';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import { TBlogPost } from '../../../../../types/slices.type/blog.slice.type';
import { formatDateStringToYYYYMMDD, formatString } from '../../../../../utils/helper';
import { imageUrlValidationCheck, profileImageUrlValidationCheck } from '../../../../../utils/validationCheck';
import useImageValidation from '../../../../../hooks/useImageValidation';

type Props = {
	post:TBlogPost
}

export const BlogPostCardPartial:FC<Props> = ({post}) => {
	const {imageUrl} = useImageValidation(post.image)
	return (
		<Card>
			<CardHeader className=''>
				<div className='aspect-video w-full rounded-xl bg-slate-200'>
					<img className='rounded-xl w-full h-full object-cover' src={imageUrl} alt="blog-image" />
				</div>
				<div className='flex w-full items-center justify-between font-medium'>
					<Button
						size='sm'
						rounded='rounded-full'
						color='zinc'
						colorIntensity='300'
						variant='outline'>
						{post.category.name}
					</Button>
					<Button
						size='sm'
						rounded='rounded-full'
						variant='solid'
						colorIntensity='100'>
						{formatString(post.status)}
					</Button>
				</div>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardBody>
				<div className='flex items-center justify-between font-medium'>
					<CardSubTitle>
						Reading:{' '}
						<span className='font-normal'>
							{post.readingTime}min
						</span>
					</CardSubTitle>

					<CardSubTitle>
						Date:{' '}
						<span className='font-normal'>
							{' '}
							{formatDateStringToYYYYMMDD(post.updatedAt)}
						</span>
					</CardSubTitle>
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterChild>
					<img
						className='h-10 w-10 object-cover rounded-full'
						src={profileImageUrlValidationCheck(post.creator.image)}
						alt='create-profile-image'
					/>
					<div>
						<CardSubTitle className='font-medium'>
							Super Admin
						</CardSubTitle>
						<CardSubTitle className='text-zinc-400 dark:text-zinc-200'>
							Atuhor
						</CardSubTitle>
					</div>
				</CardFooterChild>
				<CardFooterChild>
					<Button
						rounded='rounded-full'
						variant='solid'
						colorIntensity='100'>
						View
					</Button>
					<Button
						rounded='rounded-full'
						variant='solid'
						colorIntensity='900'>
						Edit
					</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};
