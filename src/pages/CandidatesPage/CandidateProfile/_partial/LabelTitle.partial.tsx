import { useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import Label from '../../../../components/form/Label';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';
import Icon from '../../../../components/icon/Icon';

const LabelTitlepartial = ({ label, detail }: { label: string; detail: string }) => {
	return (
		<div className='w-full'>
			<Label htmlFor='title' className='font-light'>
				{label}
			</Label>

			<FieldWrap>
				<Input
					dimension='lg'
					id={label}
					autoComplete={label}
					name={label}
					value={textValidationCheck(detail)}
					readOnly
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
