import React from 'react';
import Button from '../../../../components/ui/Button';
import { JobDetailsType2 } from '../../../../types/slices.type/jobs.slice.type';
import { textValidationCheck } from '../../../../utils/validationCheck';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../../../../components/ui/Tooltip';
import { useAuth } from '../../../../context/authContext';
import { getJobsList } from '../../../../store/slices/Jobs.slice';

const AssignJobModalListItemPartial = ({
	job,
	assignTo,
	unAssignAction,
	jobAssignAction,
	assignToModule,
}: {
	assignToModule: 'candidate' | 'client' | 'teamMember';
	job: JobDetailsType2;
	assignTo: string;
	unAssignAction?: any;
	jobAssignAction: any;
}) => {
	const {currentListPage} = useSelector((state: RootState) => state.jobsSlice);
	const { userStorage } = useAuth();
	const [loading, setLoading] = React.useState(false);
	const [selfAssign, setSelfAssign] = React.useState(false);

	const isJobSelfCreated = job?.createdBy.id === userStorage.id;

	const isAssigned =
		assignToModule === 'candidate'
			? (job?.appliedCandidates ? job?.appliedCandidates : job?.candidateJobProfiles)?.some(
					(candidate: any) => candidate.candidateId === assignTo,
				) || selfAssign
			: assignToModule === 'client'
				? job?.client?.id === assignTo || selfAssign
				: job?.team?.id === assignTo || selfAssign;

	const dispatch: AppDispatch = useDispatch();
	const handleAssignJob = async () => {
		try {
			setLoading(true);

			if (isAssigned) {
				if (assignToModule === 'client') {
					if (userStorage.id === job.createdBy.id) {
						unAssignAction && (await dispatch(unAssignAction({ jobId: job.id })));
					}
				}else if (assignToModule === 'candidate') {
						unAssignAction && (await dispatch(unAssignAction({ jobId: job.id, unAssignTo: assignTo })));
				} 
				
				else {
					unAssignAction && (await dispatch(unAssignAction({ jobId: job.id })));
				}
			} else {
				await dispatch(jobAssignAction({ jobId: job.id, assignTo: assignTo }));
				// setSelfAssign(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			await dispatch(getJobsList({ limit: 10, page: currentListPage }));
			setLoading(false);
		}
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
						<span>{job?.experienceMin} - {job?.experienceMax} </span>
						<span>|</span>
						<span>{textValidationCheck(job?.location)}</span>
					</div>
					<p>June 13, 2024</p>
				</div>
			</div>
			{assignToModule === 'client' && !isJobSelfCreated && isAssigned ? (
				<Tooltip placement='top'  text='You cannot Un Assign this job as it is created by client'>
					<Button
						rightIcon={isAssigned ? 'HeroTwiceCheck' : undefined}
						color="amber"
						className='h-fit'
						variant='solid'>
						{isAssigned ? 'Assigned' : 'Assign'}
					</Button>
				</Tooltip>
			) : (
				<Button
					rightIcon={isAssigned ? 'HeroTwiceCheck' : undefined}
					color={isAssigned ? 'emerald' : 'blue'}
					isLoading={loading}
					onClick={handleAssignJob}
					className='h-fit'
					variant='solid'>
					{isAssigned ? 'Assigned' : 'Assign'}
				</Button>
			)}
		</div>
	);
};

export default AssignJobModalListItemPartial;
