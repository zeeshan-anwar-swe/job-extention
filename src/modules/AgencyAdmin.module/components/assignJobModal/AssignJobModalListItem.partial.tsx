import React from 'react';
import Button from '../../../../components/ui/Button';
import { JobDetailsType } from '../../../../types/slices.type/jobs.slice.type';
import { textValidationCheck } from '../../../../utils/validationCheck';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { assignJobToCandidate } from '../../../../store/slices/Candiates.slice';

const AssignJobModalListItemPartial = ({
	job,
	assignTo,
}: {
	job: JobDetailsType;
	assignTo: string;
}) => {
	const [loading, setLoading] = React.useState(false);
	const isAssigned = true;
	// const isAssigned =
	// 	'appliedCandidates' in job
	// 		? job.appliedCandidates?.some((candidate: any) => candidate.candidateId === assignTo)
	// 		: job.candidateJobProfiles?.some(
	// 				(candidate: any) => candidate.candidateId === assignTo,
	// 			);
	const dispatch: AppDispatch = useDispatch();
	const handleAssignJob = async () => {
		setLoading(true);
		await dispatch(assignJobToCandidate({ assignTo, jobId: job.id }));
		setLoading(false);
	};

	return (
		<div className='flex items-center justify-between gap-4 rounded-xl border pr-2'>
			<div className='flex gap-4'>
				<Button icon='HeroFolder' className='h-fit'></Button>
				<div className=''>
					<div className='flex items-center gap-2'>
						<h5 className='m-0 p-0'>{textValidationCheck(job?.title)}</h5>
						<span>|</span>
						<span>{textValidationCheck(job?.experience)} </span>
						<span>|</span>
						<span>{textValidationCheck(job?.location)}</span>
					</div>
					<p>June 13, 2024</p>
				</div>
			</div>

			<Button
				rightIcon={isAssigned ? 'HeroTwiceCheck' : undefined}
				color={isAssigned ? 'emerald' : 'blue'}
				isLoading={loading}
				onClick={handleAssignJob}
				className='h-fit'
				variant='solid'>
				Assign
			</Button>
		</div>
	);
};

export default AssignJobModalListItemPartial;
