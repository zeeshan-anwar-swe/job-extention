import { useEffect, useState } from 'react';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { searchStoredClients } from '../../../store/slices/Agency/Client.slice';

export const ClientSearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(searchStoredClients(searchValue));
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
				rounded='rounded-full'
				id='example'
				name='example'
				placeholder='Search clients...'
				value={searchValue}
				className='rounded-full'
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</FieldWrap>
	);
};
