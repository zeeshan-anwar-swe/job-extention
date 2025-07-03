import React, { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';
import { TRounded } from '../../../types/rounded.type';

const CustomDropDown = ({
	title = 'title',
	icon = '',
	rounded = 'rounded-full',
	items = [],
}: {
	title?: string;
	children?: React.ReactNode;
	icon?: string;
	rounded?: TRounded;
	items?: string[];
}) => {
	const [filter, setFilter] = useState<string>(title);

	return (
		<Dropdown>
			<DropdownToggle hasIcon={false}>
				<Button rounded={rounded} variant='outline' color='zinc' icon={icon}>
					{filter}
				</Button>
			</DropdownToggle>
			<DropdownMenu>
				{items.map((item, index) => (
					<DropdownItem
						onClick={() => setFilter(item)}
						icon='HeroChevronRight'
						key={index}>
						{item}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};

export default CustomDropDown;
