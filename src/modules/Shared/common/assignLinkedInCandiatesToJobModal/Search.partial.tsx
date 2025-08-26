import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { FC, useEffect, useState } from 'react';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/form/Input';
import FieldWrap from '../../../../components/form/FieldWrap';
import { FilterOptionsType } from '../../../../types/slices.type/candidate.slice.type';
import Button from '../../../../components/ui/Button';

interface SearchComponentProps {
	filterOptions: FilterOptionsType;
	placeholder?: string;
	searchLimit?: number;
	searchListAction: any;
	setFilterOptions: (payload: FilterOptionsType) => void;
}

const SearchPartial: FC<SearchComponentProps> = ({
	filterOptions,
	searchListAction,
	searchLimit = 10,
	placeholder = 'Search...',
	setFilterOptions,
}) => {
	const emptyFilterOptions: FilterOptionsType = {
		keywords: '',
		tenure: { min: 0, max: 0 },
		location: [],
		skills: [],
	};
	const dispatch: AppDispatch = useDispatch();

	const handleSearch = async (e: any) => {
		e.preventDefault();

		if (filterOptions.keywords && filterOptions.keywords.trim() !== '') {
			dispatch(
				searchListAction({
					page: 1,
					limit: searchLimit,
					filterOptions,
				}),
			);
		}
	};

	const clearSearch = async () => {
		dispatch(
			searchListAction({ limit: searchLimit, page: 1, filterOptions: emptyFilterOptions }),
		);
		dispatch(setFilterOptions(emptyFilterOptions));
	};

	const handleChange = (data: string) => {
		dispatch(setFilterOptions({ ...filterOptions, keywords: data }));
	};

	useEffect(() => {
		return () => dispatch(setFilterOptions(emptyFilterOptions));
	}, []);
	return (
		<form onSubmit={handleSearch} className='flex items-center gap-2'>
			<div className='w-full'>
				<FieldWrap
					lastSuffix={
						filterOptions.keywords !== '' && (
							<Icon
								color='red'
								icon='HeroXMark'
								className='mx-2 cursor-pointer'
								onClick={() => clearSearch()}
							/>
						)
					}>

					<Input
						required
						id='example'
						name='example'
						className='pl-4'
						rounded='rounded-full'
						placeholder={placeholder}
						value={filterOptions.keywords}
						onChange={(e: any) => handleChange(e.target.value as string)}
					/>
				</FieldWrap>
			</div>
			<Button type='submit' color='blue' rounded='rounded-full' variant='solid'>
				Search
			</Button>
		</form>
	);
};

export default SearchPartial;
