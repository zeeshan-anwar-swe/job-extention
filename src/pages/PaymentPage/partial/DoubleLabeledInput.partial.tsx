import React, { useState } from 'react';
import Label from '../../../components/form/Label';
import FieldWrap from '../../../components/form/FieldWrap';
import Button from '../../../components/ui/Button';
import Input from '../../../components/form/Input';
import { textValidationCheck } from '../../../utils/validationCheck';

const DoubleLabeledInputPartial = ({
	label,
	placeholder,
	price,
}: {
	label?: string;
	placeholder?: string;
	price?: string;
}) => {
	const [inputValue, setInputValue] = useState<string>(label || '');
	return (
		<div>
			<section className='flex items-center justify-between'>
				<Label htmlFor='urlAddress'>{textValidationCheck(label)}</Label>
				<h5>{textValidationCheck(price)}</h5>
			</section>
			<FieldWrap>
				<Input
					rounded='rounded-none'
					className='!border-0  !border-b-2'
					value={inputValue}
					type='url'
					id='urlAddress'
					name='urlAddress'
					onChange={(e) => setInputValue(e.target.value)}
					placeholder={placeholder || ''}
					autoComplete='url'
				/>
			</FieldWrap>
		</div>
	);
};

export default DoubleLabeledInputPartial;
