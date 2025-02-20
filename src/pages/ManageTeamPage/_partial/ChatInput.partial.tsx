import { useState } from 'react';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';

const ChatInputPartial = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	return (
		<FieldWrap
			className='w-full '
			lastSuffix={
				searchValue !== '' && (
					<Icon
						icon='HeroXMark'
						size='text-xl'
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
				placeholder='Enter the text here'
				value={searchValue}
				borderWidth='border-0'
				className=' !rounded-full'
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</FieldWrap>
	);
};

export default ChatInputPartial;
