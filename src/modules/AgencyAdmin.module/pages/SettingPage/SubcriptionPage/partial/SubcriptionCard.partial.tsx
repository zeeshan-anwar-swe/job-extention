import React from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/ui/Card';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import Button from '../../../../../../components/ui/Button';
import { TSubcriptionPlan } from '../../../../../../types/slices.type/subcription.slice.type';
import {
	createCheckOutSession,
	createPortalSession,
} from '../../../../../../services/stripe-subscriptions';

export const SubcriptionCardPartial = ({
	subcriptionPlan,
}: {
	subcriptionPlan: TSubcriptionPlan;
}) => {
	const { loading, imageUrl } = useImageValidation(subcriptionPlan.images[0]);

	const handleSubscribe = async (lookup_key: string) => {
		const url = await createCheckOutSession(lookup_key);

		if (url) {
			window.location.href = url;
		}
	};

	return (
		<Card >
			<CardHeader>
				<ImageLoaderWraper loading={loading} height='h-14'>
					<img
						className='aspect-video w-full rounded-xl object-cover shadow-md'
						src={imageUrl}
						alt='image'
					/>
				</ImageLoaderWraper>
			</CardHeader>
			<CardBody className='flex flex-col items-center'>
				<CardTitle className='!text-center'>{subcriptionPlan.name}</CardTitle>
				<CardSubTitle className='!text-center'>{subcriptionPlan.description}</CardSubTitle>
				<CardSubTitle className='!text-center font-bold'>
					${subcriptionPlan.unit_amount}/month
				</CardSubTitle>
			</CardBody>
			<CardFooter>
				<CardFooterChild className='w-full'>
					<Button
						onClick={() => handleSubscribe(subcriptionPlan.lookup_key)}
						className='w-full'
						variant='solid'>
						Subscribe
					</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};
