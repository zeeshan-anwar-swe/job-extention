import { useState } from 'react';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';

const DropdownSearchPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
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
