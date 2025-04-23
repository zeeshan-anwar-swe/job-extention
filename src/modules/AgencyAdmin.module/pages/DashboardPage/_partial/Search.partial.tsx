import { useState } from 'react';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import FieldWrap from '../../../../../components/form/FieldWrap';

const SearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	return (
		<FieldWrap
			firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
			lastSuffix={
				<Icon
					icon='HeroXMark'
					color='red'
					className='mx-2 cursor-pointer'
					onClick={() => {
						setSearchValue('');
					}}
				/>
			}>
			<Input
				id='example'
				name='example'
				placeholder='Search...'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</FieldWrap>
	);
};

export default SearchPartial;
