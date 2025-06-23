import React, { FC } from 'react';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';

interface ChatInputPartialProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInputPartial: FC<ChatInputPartialProps> = ({ value, onChange }) => {
	return (
		<FieldWrap
			className='w-full '
			lastSuffix={
				value !== '' && (
					<Icon
						icon='HeroXMark'
						size='text-xl'
						color='red'
						className='mx-2 cursor-pointer'
						onClick={() =>
							onChange({
								target: { value: '' },
							} as React.ChangeEvent<HTMLInputElement>)
						}
					/>
				)
			}>
			<Input
				id='example'
				name='example'
				placeholder='Enter the text here'
				value={value}
				borderWidth='border-0'
				className=' !rounded-full'
				onChange={onChange}
			/>
		</FieldWrap>
	);
};

export default ChatInputPartial;
