import { useState } from 'react';
import Label from '../../../../../../components/form/Label';
import Textarea from '../../../../../../components/form/Textarea';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTextareapartial = ({
	label,
	detail,
	rows,
}: {
	label?: string;
	detail?: string;
	inputClassName?: string;
	rows?: number;
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
				<Textarea className='font-medium' rows={rows || 0} value={detailText || ''} />
			</FieldWrap>
		</div>
	);
};

export default LabelTextareapartial;
