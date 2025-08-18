import { FC, useEffect, useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { formatString } from '../../../utils/helper';

interface labelValue {
	label: string;
	value: string;
}

interface PropsTypes {
	options: labelValue[];
	getListAction: any;
	filterBy: string;
	search: string;
	setSearch: any;
	limit?: number;
}

export const CustomFilterDropdownComponent: FC<PropsTypes> = ({
	options,
	getListAction,
	filterBy,
	search,
	setSearch,
	limit,
}) => {
	const [searchBy, setSearchBy] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();
	const handleFilterChange = (value: string) => {
		setSearchBy(formatString(value));
		dispatch(setSearch(value));
		dispatch(getListAction({ page: 1, limit: limit ?? 9, searchBy: filterBy, search: value }));
	};

	const clearFilter = () => {
		setSearchBy('');
		dispatch(setSearch(''));
		dispatch(getListAction({ page: 1, limit: limit ?? 9, search: '' }));
	};

	useEffect(() => {
		const isExactMatchFound = options.some((option: labelValue) => option.value === search);
		if (!isExactMatchFound) setSearchBy('');
	}, [search]);
	return (
		<div className='flex items-center gap-2'>
			<Dropdown>
				<DropdownToggle hasIcon={false}>
					<Button
						rounded='rounded-full'
						variant='outline'
						color='zinc'
						icon='HeroBarFilter'>
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
			{searchBy && (
				<Button
					onClick={clearFilter}
					icon='HeroXMark'
					rounded='rounded-full'
					color='red'
					className='!p-0.5'
					variant='solid'></Button>
			)}
		</div>
	);
};
