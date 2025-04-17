import { useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import Label from '../../../../components/form/Label';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';
import { TInputTypes } from '../../../../types/input.type';

const LabelTitlepartial = ({
	label,
	inputType,
	detail,
}: {
	label?: string;
	detail?: string;
	inputType?: TInputTypes;
}) => {
	return (
		<div className='flex-1'>
			<Label htmlFor='title' className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<Input
					type={inputType || 'text'}
					dimension='lg'
					id='name'
					autoComplete='name'
					name='name'
					value={textValidationCheck(detail).slice(0, 10)}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
