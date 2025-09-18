import { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/ui/Dropdown';
import Button from '../../../../../components/ui/Button';
import DropdownSearchPartial from './DropdownSearch.partial';
import DropDownITemUserMetaPartial from './DropDownITemUserMeta.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { changeTeamJobStatus } from '../../../../../store/slices/Team/TeamJobs.slice';
const CardDropdownPartial = ({ item }: { item: any }) => {
	const [dropdown, setDropdown] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	const { searchedTeamListForJob } = useSelector((state: RootState) => state.jobsSlice);

	const handleJobStatusChange = (status: string) => {
		if (item?.status !== status) {
			dispatch(changeTeamJobStatus({ jobId: item.id, status }));
		}
	};

	return (
		<Dropdown>
			<DropdownToggle isOpen={dropdown} hasIcon={false} setIsOpen={setDropdown}>
				<Button icon='HeroEllipsisHorizontal' />
			</DropdownToggle>
			<DropdownMenu placement='bottom-end'>
				<div className='px-4 text-sm font-bold'>Mark As</div>
				<DropdownItem className='gap-2'>
					<Button
						onClick={() => handleJobStatusChange('BACKLOG')}
						className='!py-1'
						rounded='rounded-full'
						variant={item?.status === 'BACKLOG' ? 'solid' : 'outline'}
						color={item?.status === 'BACKLOG' ? 'amber' : 'zinc'}>
						Backlog
					</Button>
					<Button
						onClick={() => handleJobStatusChange('IN_PROGRESS')}
						className='!py-1'
						rounded='rounded-full'
						variant={item?.status === 'IN_PROGRESS' ? 'solid' : 'outline'}
						color={item?.status === 'IN_PROGRESS' ? 'blue' : 'zinc'}>
						In Progress
					</Button>
				</DropdownItem>
				<DropdownItem className='gap-2'>
					<Button
						onClick={() => handleJobStatusChange('IN_REVIEW')}
						className='!py-1'
						rounded='rounded-full'
						variant={item?.status === 'IN_REVIEW' ? 'solid' : 'outline'}
						color={item?.status === 'IN_REVIEW' ? 'violet' : 'zinc'}>
						In Review
					</Button>
					<Button
						onClick={() => handleJobStatusChange('COMPLETED')}
						className='!py-1'
						rounded='rounded-full'
						variant={item?.status === 'COMPLETED' ? 'solid' : 'outline'}
						color={item?.status === 'COMPLETED' ? 'emerald' : 'zinc'}>
						Completed
					</Button>
				</DropdownItem>
				<div className='border-t-2 border-zinc-500/25 px-4 py-2 text-sm font-bold dark:border-zinc-500/50'>
					Asign to a team member
				</div>
				<DropdownItem>
					<DropdownSearchPartial />
				</DropdownItem>
				<div className='max-h-[300px] overflow-y-scroll'>
					{searchedTeamListForJob.map((teamMember: any) => (
						<DropDownITemUserMetaPartial
							job={item}
							teamMamber={teamMember}
							key={teamMember.id}
						/>
					))}
				</div>
			</DropdownMenu>
		</Dropdown>
	);
};

export default CardDropdownPartial;
