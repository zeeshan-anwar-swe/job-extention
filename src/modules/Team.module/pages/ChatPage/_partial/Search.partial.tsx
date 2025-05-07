import { useEffect, useState } from 'react';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import { AppDispatch } from '../../../../../store';
import { searchStoredJobs } from '../../../../../store/slices/Jobs.slice';
import { useDispatch } from 'react-redux';

const SearchPartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const [searchValue, setSearchValue] = useState<string>('');

	useEffect(() => {
		dispatch(searchStoredJobs(searchValue));
	}, [searchValue]);
	return (
		<FieldWrap
			firstSuffix={<Icon className='mx-2 rounded-full' icon='HeroMagnifyingGlass' />}
			lastSuffix={
				searchValue !== '' && (
					<Icon
						icon='HeroXMark'
						color='red'
						className='mx-2 cursor-pointer'
						onClick={() => {
							setSearchValue('');
						}}
					/>
				)
			}>
			<Input
				id='example'
				name='example'
				placeholder='Search...'
				value={searchValue}
				className='rounded-full'
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</FieldWrap>
	);
};

export default SearchPartial;
