import React from 'react';
import Badge from '../../../../../../components/ui/Badge';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import Label from '../../../../../../components/form/Label';
import { CardTitle } from '../../../../../../components/ui/Card';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';
import { AssignedJob } from '../../../../../../types/slices.type/candidate.slice.type';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import { formatIsoTimeString, formatTimeString } from '../../../../../../utils/helper';

export const JobCardPartial = ({ job }: { job: AssignedJob }) => {
	const { imageUrl, loading } = useImageValidation(job.feedbackBy.image);

	return (
		<div className='bg-zinc-100 dark:bg-zinc-700 p-4 rounded-xl space-y-4'>
			<CardTitle>{job.title}</CardTitle>
			{/* <Label htmlFor='description'>{job.feedbackBy.feedback}</Label> */}
			<NavSeparator />

			<div className='flex items-center gap-4'>
				<ImageLoaderWraper loading={loading} height='h-10'>
					<img
						className='aspect-square w-10'
						src={imageUrl}
						alt='profile'
					/>
				</ImageLoaderWraper>
				<h5>{job.feedbackBy.name}</h5>
				<p className='m-0 p-0 font-light'>{formatIsoTimeString(job.feedbackBy.createdAt)}</p>
			</div>
			<Badge className='w-fit text-blue-600' colorIntensity='100' variant='solid'>
				{job.status}
			</Badge>
			<p>{job.feedbackBy.feedback}</p>
		</div>
	);
};
