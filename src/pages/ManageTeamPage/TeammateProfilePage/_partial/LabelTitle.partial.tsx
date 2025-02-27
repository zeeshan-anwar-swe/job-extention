import { useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import Label from '../../../../components/form/Label';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';

const LabelTitlepartial = ({
	label,
	detail,
	inputType,
	className = '',
	inputClassName = '',
}: {
	inputType?: string;
	label?: string;
	detail?: string;
	className?: string;
	inputClassName?: string;
}) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail || '');
	return (
		<div className='flex-1'>
			<Label htmlFor='title' className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<Input
					dimension='lg'
					id='name'
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
