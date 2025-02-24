import { useState } from 'react';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';

const SearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	return (
		<FieldWrap
			className='rounded-full border'
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
				placeholder='Search Chat'
				value={searchValue}
				className='!rounded-ful max-sm:!py-0'
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</FieldWrap>
	);
};

export default SearchPartial;
