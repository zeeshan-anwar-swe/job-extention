import { useEffect, useState } from 'react';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { setSearchedTeamListForJob } from '../../../../../store/slices/Jobs.slice';

const DropdownSearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (searchValue) {
			dispatch(setSearchedTeamListForJob(searchValue));
		} else {
			dispatch(setSearchedTeamListForJob(''));
		}
	}, [searchValue]);
	return (
		<FieldWrap
			className='flex-1 rounded-full !bg-transparent'
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
				className='w-full rounded-full'
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</FieldWrap>
	);
};

export default DropdownSearchPartial;
