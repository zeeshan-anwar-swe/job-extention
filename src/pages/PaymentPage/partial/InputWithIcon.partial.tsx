import React, { useState } from 'react';
import Label from '../../../components/form/Label';
import FieldWrap from '../../../components/form/FieldWrap';
import Button from '../../../components/ui/Button';
import Input from '../../../components/form/Input';
import { textValidationCheck } from '../../../utils/validationCheck';
import Icon from '../../../components/icon/Icon';
import { TFontSizes } from '../../../types/fontSizes.type';

const InputWithIconPartial = ({
	placeholder,
	icon,
	rightIcon,
	iconSize,
}: {
	placeholder?: string;
	icon?: string;
	rightIcon?: string;
	iconSize?: TFontSizes;
}) => {
	const [inputValue, setInputValue] = useState<string>('');
	return (
		<FieldWrap
			className='!w-full'
			firstSuffix={<Icon size={iconSize} icon={icon || ''} />}
			lastSuffix={<Icon size={iconSize} icon={rightIcon || ''} />}>
			<Input
				value={inputValue}
				type='url'
				id='urlAddress'
				name='urlAddress'
				onChange={(e) => setInputValue(e.target.value)}
				placeholder={placeholder || ''}
				autoComplete='url'
			/>
		</FieldWrap>
	);
};

export default InputWithIconPartial;
