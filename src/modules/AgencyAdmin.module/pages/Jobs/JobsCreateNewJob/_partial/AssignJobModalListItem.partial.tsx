import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../../components/ui/Button';
import Card, {
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
} from '../../../../../../components/ui/Card';
import { AppDispatch, RootState } from '../../../../../../store';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';
import { setClientWhileCreatingJob } from '../../../../../../store/slices/Jobs.slice';

const AssignJobModalListItemPartial = ({ client }: any) => {
	const { assignedClientWhileCreatingJob } = useSelector((state: RootState) => state.jobsSlice);
	const isAssigned: boolean = assignedClientWhileCreatingJob?.id === client.id;
	const dispatch: AppDispatch = useDispatch();

	const handleAssignClientToJob = () => {
		if (isAssigned) {
			dispatch(setClientWhileCreatingJob(null));
		} else {
			dispatch(setClientWhileCreatingJob(client));
		}
	};
	return (
		<Card className='!bg-zinc-100 dark:!bg-zinc-800'>
			<CardHeader className=''>
				<CardHeaderChild>
					<img
						className='h-12 w-12 rounded-full object-cover'
						src={profileImageUrlValidationCheck(client.image)}
						alt='profile-image'
					/>
					<CardSubTitle className='!font-medium text-[#5E687A]'>
						{client.name}
					</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<Button
						rightIcon={isAssigned ? 'HeroTwiceCheck' : undefined}
						onClick={handleAssignClientToJob}
						className='h-fit'
						color={isAssigned ? 'emerald' : 'blue'}
						variant='solid'>
						{isAssigned ? 'Assigned' : 'Assign'}
					</Button>
				</CardHeaderChild>
			</CardHeader>
		</Card>
	);
};

export default AssignJobModalListItemPartial;
