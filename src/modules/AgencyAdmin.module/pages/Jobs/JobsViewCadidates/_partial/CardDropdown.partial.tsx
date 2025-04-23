import { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../../components/ui/Dropdown';
import Button from '../../../../../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import { changeJobStatus } from '../../../../../../store/slices/Jobs.slice';

const CardDropdownPartial = ({ item }: { item: any }) => {
	const [dropdown, setDropdown] = useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();

	const handleJobStatusChange = (status: string) => {
		if (item.status !== status) {
			dispatch(changeJobStatus({ jobId: item.id, status }));
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
						variant={item.status === 'BACKLOG' ? 'solid' : 'outline'}
						color={item.status === 'BACKLOG' ? 'amber' : 'zinc'}>
						Backlog
					</Button>
					<Button
						onClick={() => handleJobStatusChange('IN_PROGRESS')}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'IN_PROGRESS' ? 'solid' : 'outline'}
						color={item.status === 'IN_PROGRESS' ? 'blue' : 'zinc'}>
						In Progress
					</Button>
					<Button
						// onClick={() => handleJobStatusChange('TODO')}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'TODO' ? 'solid' : 'outline'}
						color={item.status === 'TODO' ? 'zinc' : 'zinc'}>
						To Do
					</Button>
				</DropdownItem>
				<DropdownItem className='gap-2'>
					<Button
						onClick={() => handleJobStatusChange('IN_REVIEW')}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'IN_REVIEW' ? 'solid' : 'outline'}
						color={item.status === 'IN_REVIEW' ? 'violet' : 'zinc'}>
						In Review
					</Button>
					<Button
						onClick={() => handleJobStatusChange('COMPLETED')}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'COMPLETED' ? 'solid' : 'outline'}
						color={item.status === 'COMPLETED' ? 'emerald' : 'zinc'}>
						Completed
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default CardDropdownPartial;
