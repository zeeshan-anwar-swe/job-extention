import React from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/ui/Dropdown';
import Button from '../../../../../components/ui/Button';
import Icon from '../../../../../components/icon/Icon';

const SortDropdownPartial = () => {
	const [sortBy, setSortBy] = React.useState<string>('All');

	return (
		<Dropdown
			className='items-center rounded-full border border-zinc-400 py-0 pl-4 dark:border-zinc-100 dark:!text-zinc-100'
			color='zinc'>
			<Icon icon='HeroArrowsUpDown' />
			<DropdownToggle hasIcon={true}>
				<Button className='!px-2 !py-0 dark:!text-zinc-100' color='zinc'>
					{sortBy}
				</Button>
			</DropdownToggle>
			<DropdownMenu placement='bottom-start'>
				<DropdownItem
					className='dark:!text-zinc-100'
					onClick={() => setSortBy('Assending')}>
					Assending
				</DropdownItem>
				<DropdownItem
					className='dark:!text-zinc-100'
					onClick={() => setSortBy('Desending')}>
					Desending
				</DropdownItem>
				<DropdownItem
					className='dark:!text-zinc-100'
					onClick={() => setSortBy('New First')}>
					New First
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default SortDropdownPartial;
