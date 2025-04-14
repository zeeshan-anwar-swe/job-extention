import { useSelector } from 'react-redux';
import Button from '../../../../components/ui/Button';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';
import { RootState } from '../../../../store';

const AssignCandidatesModalListItemPartial = ({ candidate }: any) => {
	const { jobDetails } = useSelector((state: RootState) => state.jobsSlice);
	const isAssigned = jobDetails?.candidateJobProfiles.some((c: any) => c.id === candidate.id);

	return (
		<div className='flex items-center justify-between gap-4 rounded-xl  pr-2'>
			<div className='flex w-full items-center gap-4 rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800'>
				<img
					className='aspect-square w-10 rounded-full object-cover'
					src={profileImageUrlValidationCheck('')}
					alt='profile-image'
				/>
				<h5>{textValidationCheck(candidate?.name)}</h5>
			</div>
			<Button
				className='h-fit bg-white !text-blue-500 hover:!text-white'
				rounded='rounded-full'
				color={isAssigned ? 'emerald' : 'blue'}
				variant='solid'>
				Assign
			</Button>
		</div>
	);
};

export default AssignCandidatesModalListItemPartial;
