import React, { useState } from 'react'; // Import React
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Icon from '../../../../../../components/icon/Icon';
import Input from '../../../../../../components/form/Input';
import { AppDispatch } from '../../../../../../store';
import { useDispatch } from 'react-redux';
import { getAllCandidatesList } from '../../../../../../store/slices/Candiates.slice';

const SearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();
	const handleSearch: React.FormEventHandler<HTMLFormElement> = async (e) => {
		// Corrected type here
		e.preventDefault();
		if (!searchValue) {
			return;
		} else {
			dispatch(
				getAllCandidatesList({ page: 1, limit: 10, params: '&search=' + searchValue }),
			);
		}
	};

	const handleCanncle = async () => {
		await getAllCandidatesList({ page: 1, limit: 10 });
		setSearchValue('');
	};

	return (
		<form className='flex-1' onSubmit={handleSearch}>
			<FieldWrap
				firstSuffix={<Icon icon='HeroMagnifyingGlass' className='mx-2 cursor-pointer' />}
				lastSuffix={
					searchValue !== '' && (
						<Icon
							icon='HeroXMark'
							color='red'
							className='mx-2 cursor-pointer'
							onClick={handleCanncle}
						/>
					)
				}>
				<Input
					id='example'
					name='example'
					placeholder='Product Designer, UI/UX Designer'
					value={searchValue}
					rounded='rounded-full'
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</FieldWrap>
		</form>
	);
};

export default SearchPartial;
