import React, { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';
import DropdownSearchPartial from './DropdownSearch.partial';
import DropDownITemUserMetaPartial from './DropDownITemUserMeta.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const CardDropdownPartial = ({ item }: { item: any }) => {
	const [dropdown, setDropdown] = useState<boolean>(false);

	const { searchedTeamListForJob, teamListForJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	console.log({ searchedTeamListForJob });

	return (
		<Dropdown>
			<DropdownToggle isOpen={dropdown} hasIcon={false} setIsOpen={setDropdown}>
				<Button icon='HeroEllipsisHorizontal' />
			</DropdownToggle>
			<DropdownMenu placement='bottom-end'>
				<div className='px-4 text-sm font-bold'>Mark As</div>
				<DropdownItem className='gap-2'>
					<Button
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'BACKLOG' ? 'solid' : 'outline'}
						color={item.status === 'BACKLOG' ? 'blue' : 'zinc'}>
						Backlog
					</Button>
					<Button
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'IN_PROGRESS' ? 'solid' : 'outline'}
						color={item.status === 'IN_PROGRESS' ? 'blue' : 'zinc'}>
						In Progress
					</Button>
					<Button
						className='!py-1'
						rounded='rounded-full'
						variant={'outline'}
						color={'zinc'}>
						To Do
					</Button>
				</DropdownItem>
				<DropdownItem className='gap-2'>
					<Button
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'IN_REVIEW' ? 'solid' : 'outline'}
						color={item.status === 'IN_REVIEW' ? 'blue' : 'zinc'}>
						In Review
					</Button>
					<Button
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'COMPLETED' ? 'solid' : 'outline'}
						color={item.status === 'COMPLETED' ? 'blue' : 'zinc'}>
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
