import { useState } from 'react';
import Label from '../../../../../../components/form/Label';
import Input from '../../../../../../components/form/Input';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTitlepartial = ({
	label,
	detail,
	inputClassName = '',
}: {
	label?: string;
	detail?: string;
	className?: string;
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
					// onChange={(e) => setDetailText(e.target.value)}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
