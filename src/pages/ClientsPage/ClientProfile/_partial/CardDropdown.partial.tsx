import React, { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import DropdownSearchPartial from './DropdownSearch.partial';
import DropDownITemUserMetaPartial from './DropDownITemUserMeta.partial';

const CardDropdownPartial = () => {
	const [dropdown, setDropdown] = useState<boolean>(false);

	return (
		<Dropdown>
			<DropdownToggle isOpen={dropdown} hasIcon={false} setIsOpen={setDropdown}>
				<Button icon='HeroEllipsisHorizontal' />
			</DropdownToggle>
			<DropdownMenu placement='bottom-end'>
				<div className='px-4 text-sm font-bold'>Mark As</div>
				<DropdownItem className='gap-2'>
					<Button className='!py-1' rounded='rounded-full' variant='outline' color='zinc'>
						Backlog
					</Button>
					<Button className='!py-1' rounded='rounded-full' variant='outline' color='zinc'>
						In Progress
					</Button>
					<Button className='!py-1' rounded='rounded-full' variant='outline' color='zinc'>
						To Do
					</Button>
				</DropdownItem>
				<DropdownItem className='gap-2'>
					<Button className='!py-1' rounded='rounded-full' variant='outline' color='zinc'>
						In Review
					</Button>
					<Button className='!py-1' rounded='rounded-full' variant='outline' color='zinc'>
						Completed
					</Button>
				</DropdownItem>
				<div className='border-t-2 border-zinc-500/25 px-4 py-2 text-sm font-bold dark:border-zinc-500/50'>
					Asign to a team member
				</div>
				<DropdownItem>
					<DropdownSearchPartial />
				</DropdownItem>
				<DropDownITemUserMetaPartial title='James Hilton' />
				<DropDownITemUserMetaPartial title='Harley Mathew' />
				<DropDownITemUserMetaPartial title='Jack Stark' />
				<DropDownITemUserMetaPartial title='Tommy Bell' />
			</DropdownMenu>
		</Dropdown>
	);
};

export default CardDropdownPartial;
