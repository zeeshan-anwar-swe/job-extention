import React from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/ui/Dropdown';
import Button from '../../../../../components/ui/Button';
import Icon from '../../../../../components/icon/Icon';

const StatusDropdownPartial = () => {
	const [sortBy, setSortBy] = React.useState<string>('Status');
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
				<DropdownItem onClick={() => setSortBy('Fair')}>Fair</DropdownItem>
				<DropdownItem onClick={() => setSortBy('Over Qualify')}>Over Qualify</DropdownItem>
				<DropdownItem onClick={() => setSortBy('Low Qualify')}>Low Qualify</DropdownItem>
				<DropdownItem onClick={() => setSortBy('Hired')}>Hired</DropdownItem>
				<DropdownItem onClick={() => setSortBy('Rejected')}>Rejected</DropdownItem>
				<DropdownItem onClick={() => setSortBy('In Review')}>In Review</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default StatusDropdownPartial;
