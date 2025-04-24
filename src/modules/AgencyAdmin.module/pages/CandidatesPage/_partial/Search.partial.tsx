import { useRef, useState } from 'react';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import {
	getAgencyCandidatesList,
	getSearchedAgencyCandidatesList,
} from '../../../../../store/slices/Candiates.slice';

const SearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);

	const dispatch: AppDispatch = useDispatch();

	const handleSearch = async (e: any) => {
		e.preventDefault();
		if (searchValue) {
			dispatch(getSearchedAgencyCandidatesList({ search: searchValue, limit: 10, page: 1 }));
		}
	};

	const clearSearch = async () => {
		setSearchValue('');
		dispatch(getAgencyCandidatesList({ limit: 10, page: 1 }));
	};

	const handleChange = (data: string) => {
		if (!data) {
			dispatch(getAgencyCandidatesList({ limit: 10, page: 1 }));
		}
		setSearchValue(data);
	};
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
					ref={inputRef}
					rounded='rounded-full'
					id='example'
					name='example'
					placeholder='Search candidates...'
					value={searchValue}
					className='rounded-full'
					onChange={(e: any) => handleChange(e.target.value as string)}
				/>
			</FieldWrap>
		</form>
	);
};

export default SearchPartial;
