import { useState } from 'react';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Input from '../../../../../components/form/Input';
import { TInputTypes } from '../../../../../types/input.type';

const LabelTitlepartial = ({
	label,
	detail,
	inputType,
	className = '',
}: {
	label?: string;
	detail?: string;
	className?: string;
	inputType?: TInputTypes;
}) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail || '');
	return (
		<div className={'flex-1 ' + className}>
			<Label htmlFor='title' className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<Input
					type={inputType || 'text'}
					dimension='lg'
					autoComplete='name'
					name='name'
					value={detailText || ''}
					placeholder='Enter your name'
					onChange={(e) => setDetailText(e.target.value)}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
