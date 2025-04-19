import { useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import Label from '../../../../components/form/Label';
import FieldWrap from '../../../../components/form/FieldWrap';
import Textarea from '../../../../components/form/Textarea';

const LabelTextareaPartial = ({ label, detail }: { label?: string; detail?: string }) => {
	return (
		<div className='w-full'>
			<Label htmlFor='title' className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<Textarea
					rows={4}
					dimension='lg'
					id='name'
					autoComplete='name'
					name='name'
					value={detail ?? ''}
					placeholder='Enter your name'
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTextareaPartial;
