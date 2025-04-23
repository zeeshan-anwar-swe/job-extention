import React from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../../components/ui/Dropdown';
import Button from '../../../../../../components/ui/Button';

const SortDropdownPartial = () => {
	const [sortBy, setSortBy] = React.useState<string>('Sort By');
	return (
		<Dropdown color='zinc'>
			<DropdownToggle hasIcon={true}>
				<Button className='!px-2 !py-0' color='zinc'>
					{sortBy}
				</Button>
			</DropdownToggle>
			<DropdownMenu placement='bottom-end'>
				<div className='px-4 text-sm font-bold'>Select An Order</div>
				<DropdownItem onClick={() => setSortBy('Assending')}>Week</DropdownItem>
				<DropdownItem onClick={() => setSortBy('Desending')}>Month</DropdownItem>
				<DropdownItem onClick={() => setSortBy('New First')}>Year</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default SortDropdownPartial;
