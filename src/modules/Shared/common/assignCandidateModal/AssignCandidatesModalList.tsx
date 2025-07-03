import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/ui/Button';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';
import { AppDispatch, RootState } from '../../../../store';
import { assignCandidateWhileUpdatingJob } from '../../../../store/slices/Jobs.slice';

export const AssignCandidatesModalListItemPartial = ({ candidate }: any) => {
	const { jobDetails, assignedCandidatesWhileUpdatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);
	const dispatch: AppDispatch = useDispatch();

	// const isAssigned = true;
	const isAssigned = jobDetails?.candidateJobProfiles?.some(
		(assignedCandidate: any) => assignedCandidate.candidateId === candidate.id,
	);

	const isNewlyAssigned = assignedCandidatesWhileUpdatingJob.some(
		(assignedCandidate: any) => assignedCandidate === candidate.id,
	);

	const dispatchAssignedCandidate = () => {
		dispatch(assignCandidateWhileUpdatingJob(candidate));
	};

	return (
		<div className='flex items-center justify-between gap-4 rounded-xl  bg-zinc-100 p-2 pr-2 dark:bg-zinc-800'>
			<div className='flex w-full items-center gap-4 rounded-xl '>
				<img
					className='aspect-square w-10 rounded-full object-cover'
					src={profileImageUrlValidationCheck('')}
					alt='profile-image'
				/>
				<h5>{textValidationCheck(candidate?.name)}</h5>
			</div>
			<Button
				onClick={!isAssigned ? dispatchAssignedCandidate : undefined}
				rightIcon={isAssigned || isNewlyAssigned ? 'HeroTwiceCheck' : undefined}
				rounded='rounded-full'
				color={isAssigned || isNewlyAssigned ? 'emerald' : 'blue'}
				variant='solid'>
				{isAssigned || isNewlyAssigned ? 'Assigned' : 'Assign'}
			</Button>
		</div>
	);
};
