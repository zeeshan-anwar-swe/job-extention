import React from 'react';
import { TeamPerformanceType } from '../../../../../types/slices.type/agency/reportsAndAnalytics.slice.type';
import CircularProgressBar from '../../../../../components/ui/CircleProgressBar';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';

export const TeamPerformanceItem = ({ team }: { team: TeamPerformanceType }) => {
	const { loading, imageUrl } = useImageValidation(team.teamUser?.image);

	return (
		<div className='flex w-full items-center gap-4'>
			<div className='flex-shrink-0'>
				<ImageLoaderWraper loading={loading} height='h-16'>
					<img
						src={imageUrl}
						alt={team?.teamUser?.firstName}
						className='h-16 w-16 rounded-full'
					/>
				</ImageLoaderWraper>
			</div>
			<div className='flex flex-grow items-center justify-between'>
				<div>
					<b>{team.teamUser.firstName}</b>{' '}
					<span className='text-gray-500'>@{team.teamUser.email}</span>
				</div>
				<CircularProgressBar
					color='stroke-red-500'
					sqSize={50}
					strokeWidth={5}
					percentage={team.jobsClosed}
				/>
			</div>
		</div>
	);
};
