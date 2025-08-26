import React, { useState } from 'react'; // Import React
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Icon from '../../../../../../components/icon/Icon';
import Input from '../../../../../../components/form/Input';
import { AppDispatch, RootState } from '../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCandidatesList,
	setCandidatesSearch,
} from '../../../../../../store/slices/Candiates.slice';

const SearchPartial = () => {
	const { search } = useSelector((state: RootState) => state.candidates);
	const dispatch: AppDispatch = useDispatch();
	const handleSearch: React.FormEventHandler<HTMLFormElement> = async (e) => {
		// Corrected type here
		e.preventDefault();
		if (!search) {
			return;
		} else {
			dispatch(getAllCandidatesList({ page: 1, limit: 10}));
		}
	};

	const handleCanncle = async () => {
		await dispatch(setCandidatesSearch(''));
		await dispatch(getAllCandidatesList({ page: 1, limit: 10 }));
	};

	return (
		<form className='flex-1' onSubmit={handleSearch}>
			<FieldWrap
				firstSuffix={<Icon icon='HeroMagnifyingGlass' className='mx-2 cursor-pointer' />}
				lastSuffix={
					search !== '' && (
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
					value={search}
					rounded='rounded-full'
					onChange={(e) => dispatch(setCandidatesSearch(e.target.value))}
				/>
			</FieldWrap>
		</form>
	);
};

export default SearchPartial;
