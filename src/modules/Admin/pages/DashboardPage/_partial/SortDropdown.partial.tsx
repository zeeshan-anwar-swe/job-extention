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
			className='items-center rounded-full border border-zinc-400 py-0 pl-4'
			color='zinc'>
			<Icon icon='HeroArrowsUpDown' />
			<DropdownToggle hasIcon={true}>
				<Button className='!px-2 !py-0' color='zinc'>
					{sortBy}
				</Button>
			</DropdownToggle>
			<DropdownMenu placement='bottom-start'>
				<DropdownItem onClick={() => setSortBy('Assending')}>Assending</DropdownItem>
				<DropdownItem onClick={() => setSortBy('Desending')}>Desending</DropdownItem>
				<DropdownItem onClick={() => setSortBy('New First')}>New First</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default SortDropdownPartial;
