import { useDispatch } from 'react-redux';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/ui/Button';
import { DropdownItem } from '../../../../components/ui/Dropdown';
import Tooltip from '../../../../components/ui/Tooltip';
import { AppDispatch } from '../../../../store';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';
import { assignTeamMemberToJob } from '../../../../store/slices/Jobs.slice';

const DropDownITemUserMetaPartial = ({ teamMamber, job }: { teamMamber: any; job: any }) => {
	console.log('job from jobdetails', job);

	const isAssigned: boolean = job?.team.id === teamMamber.id;

	const dispatch: AppDispatch = useDispatch();

	const handleAssignClientToJob = () => {
		if (!isAssigned) {
			dispatch(assignTeamMemberToJob({ teamId: teamMamber.id, jobId: job.id }));
		}
	};

	return (
		<DropdownItem className='group m-4 justify-between gap-2 rounded-md bg-zinc-100'>
			<div className='flex items-center gap-2'>
				<img
					className='aspect-square w-10 rounded-lg'
					src={profileImageUrlValidationCheck('')}
					alt='profile-image'
				/>
				<h5>{textValidationCheck(teamMamber?.user?.name)}</h5>
			</div>
			{!isAssigned ? (
				<Tooltip text='Assign this team member to job'>
					<Button
						onClick={handleAssignClientToJob}
						variant='solid'
						isLoading={false}
						className='hidden group-hover:block'
						icon='HeroTwiceCheck'></Button>
				</Tooltip>
			) : (
				<Icon color='emerald' size='text-2xl' icon='HeroTwiceCheck' />
			)}
		</DropdownItem>
	);
};

export default DropDownITemUserMetaPartial;
