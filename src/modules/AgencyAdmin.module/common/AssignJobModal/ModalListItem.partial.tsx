import React from 'react';
import Button from '../../../../components/ui/Button';
import { JobDetailsType2 } from '../../../../types/slices.type/jobs.slice.type';
import { textValidationCheck } from '../../../../utils/validationCheck';
import { AppDispatch } from '../../../../store';
import { useDispatch } from 'react-redux';
import Tooltip from '../../../../components/ui/Tooltip';

const AssignJobModalListItemPartial = ({
	job,
	assignTo,
	jobAssignAction,
	assignToModule,
}: {
	assignToModule: 'candidate' | 'client' | 'teamMember';
	job: JobDetailsType2;
	assignTo: string;
	jobAssignAction: any;
}) => {
	const [loading, setLoading] = React.useState(false);
	const [selfAssign, setSelfAssign] = React.useState(false);
	const isAssigned =
		assignToModule === 'candidate'
			? job.appliedCandidates?.some((candidate: any) => candidate.candidateId === assignTo) ||
				selfAssign
			: assignToModule === 'client'
				? job.client.id === assignTo || selfAssign
				: job.team.teamId === assignTo || selfAssign;

	const dispatch: AppDispatch = useDispatch();
	const handleAssignJob = async () => {
		if (isAssigned) return;
		setLoading(true);
		await dispatch(jobAssignAction({ assignTo, jobId: job.id }));
		setSelfAssign(true);
		setLoading(false);
	};

	return (
		<div className='flex items-center justify-between gap-4 rounded-xl border pr-2'>
			<div className='flex gap-4'>
				<Button icon='HeroFolder' className='h-fit'></Button>
				<div className=''>
					<div className='flex items-center gap-2'>
						{job.title.length > 20 ? (
							<Tooltip className='dark:bg-zinc-800' text={job?.title ?? ''}>
								<h5 className='m-0 p-0'>
									{textValidationCheck(job?.title.slice(0, 20))}...
								</h5>
							</Tooltip>
						) : (
							<h5 className='m-0 p-0'>
								{textValidationCheck(job?.title.slice(0, 15))}
							</h5>
						)}
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
				{isAssigned ? 'Assigned' : 'Assign'}
			</Button>
		</div>
	);
};

export default AssignJobModalListItemPartial;
