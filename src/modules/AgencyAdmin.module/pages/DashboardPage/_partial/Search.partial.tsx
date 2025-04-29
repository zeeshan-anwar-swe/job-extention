import { useState } from 'react';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import FieldWrap from '../../../../../components/form/FieldWrap';
import { getSearchedAgencyCandidatesList } from '../../../../../store/slices/Candiates.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';

const SearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();

	const handleSearch = async (e: any) => {
		e.preventDefault();
		if (searchValue) {
			dispatch(getSearchedAgencyCandidatesList({ search: searchValue, limit: 5, page: 1 }));
		}
	};

	const clearSearch = async () => {
		setSearchValue('');
		dispatch(getSearchedAgencyCandidatesList({ limit: 5, page: 1 }));
	};

	return (
		<form onSubmit={handleSearch}>
			<FieldWrap
				firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
				lastSuffix={
					searchValue && (
						<Icon
							icon='HeroXMark'
							color='red'
							className='mx-2 cursor-pointer'
							onClick={clearSearch}
						/>
					)
				}>
				<Input
					id='example'
					name='example'
					placeholder='Search...'
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</FieldWrap>
		</form>
	);
};

export default SearchPartial;
