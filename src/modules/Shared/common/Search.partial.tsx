import { FC, useEffect, useState } from 'react';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import Input from '../../../components/form/Input';
import Icon from '../../../components/icon/Icon';
import FieldWrap from '../../../components/form/FieldWrap';
import { FilterOptionsType } from '../../../store/slices/Candiates.slice';

interface SearchComponentProps {
	searchListAction: any;
	setSearchActionForPagination: (payload: any) => void;
	placeholder?: string;
	searchLimit?: number;
	filterOptions?: FilterOptionsType;
}

const SearchPartial: FC<SearchComponentProps> = ({
	filterOptions,
	searchListAction,
	searchLimit = 10,
	placeholder = 'Search...',
	setSearchActionForPagination,
}) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const dispatch: AppDispatch = useDispatch();

	const handleSearch = async (e: any) => {
		e.preventDefault();
		if (searchValue) {
			if(!filterOptions){
				dispatch(searchListAction({ search: searchValue, limit: searchLimit, page: 1 }));
			} else {
				dispatch(searchListAction({ search: searchValue, limit: searchLimit, page: 1, filterOptions }));
			}
		}
	};

	const clearSearch = async () => {
		setSearchValue('');
		dispatch(searchListAction({ limit: searchLimit, page: 1 }));
	};

	const handleChange = (data: string) => {
		if (!data) {
			dispatch(searchListAction({ limit: searchLimit, page: 1 }));
		}
		dispatch(setSearchActionForPagination(data));
		setSearchValue(data);
	};

	useEffect(() => {
		return () => dispatch(setSearchActionForPagination(''));
	}, []);
	return (
		<form onSubmit={handleSearch}>
			<FieldWrap
				firstSuffix={<Icon className='mx-2 rounded-full' icon='HeroMagnifyingGlass' />}
				lastSuffix={
					searchValue !== '' && (
						<Icon
							icon='HeroXMark'
							color='red'
							className='mx-2 cursor-pointer'
							onClick={() => clearSearch()}
						/>
					)
				}>
				<Input
					rounded='rounded-full'
					id='example'
					name='example'
					placeholder={placeholder}
					value={searchValue}
					className='rounded-full'
					onChange={(e: any) => handleChange(e.target.value as string)}
				/>
			</FieldWrap>
		</form>
	);
};

export default SearchPartial;
