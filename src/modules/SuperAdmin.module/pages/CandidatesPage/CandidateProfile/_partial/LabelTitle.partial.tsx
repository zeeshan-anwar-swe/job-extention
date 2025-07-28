import { useState } from 'react';
import Input from '../../../../../../components/form/Input';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTitlepartial = ({
	label,
	detail,
	inputClassName,
	placeholder,
}: {
	label?: string;
	detail?: string;
	placeholder?: string;
	inputClassName?: string;
}) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail || '');
	return (
		<div className='w-full '>
			{label && (
				<Label htmlFor='title' className='font-light'>
					{textValidationCheck(label)}
				</Label>
			)}

			<FieldWrap>
				<Input
					className={inputClassName + ' font-medium' || '' + ' font-medium'}
					dimension='lg'
					id='name'
					autoComplete='name'
					name='name'
					value={detailText || ''}
					placeholder={placeholder || ''}
					// onChange={(e) => setDetailText(e.target.value)}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
