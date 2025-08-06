import { FC, useState } from 'react';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';

interface labelValue {
	label: string;
	value: string;
}

interface PropsTypes {
	options: labelValue[];
}

export const CustomFilterDropdownComponent: FC<PropsTypes> = ({ options }) => {
	const [searchBy, setSearchBy] = useState<string>('');
	const handleFilterChange = (value: string) => {
		setSearchBy(value);
	};
	return (
		<Dropdown>
			<DropdownToggle hasIcon={false}>
				<Button rounded='rounded-full' variant='outline' color='zinc' icon='HeroBarFilter'>
					{searchBy ? searchBy : 'Filter'}
				</Button>
			</DropdownToggle>
			<DropdownMenu>
				{options.map((item: labelValue, index) => (
					<DropdownItem
						onClick={() => handleFilterChange(item.value)}
						icon='HeroChevronRight'
						key={index}>
						{item.label}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
