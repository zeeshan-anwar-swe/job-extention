import { useState } from 'react';
import Label from '../../../../../../components/form/Label';
import Textarea from '../../../../../../components/form/Textarea';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTitleTextAreapartial = ({
	label,
	detail,
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
				<Textarea className='font-medium' rows={6} value={detailText || ''} />
			</FieldWrap>
		</div>
	);
};

export default LabelTitleTextAreapartial;
