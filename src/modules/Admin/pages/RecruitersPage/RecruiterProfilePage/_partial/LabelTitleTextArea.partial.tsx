import { useState } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Textarea from '../../../../../../components/form/Textarea';

const LabelTitleTextAreapartial = ({
	label,
	detail,
	className = '',
	rows,
}: {
	label?: string;
	detail?: string;
	className?: string;
	rows?: number;
}) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail || '');
	return (
		<div className={'w-full ' + className}>
			{label && (
				<Label htmlFor='title' className='font-light'>
					{textValidationCheck(label)}
				</Label>
			)}

			<FieldWrap>
				<Textarea
					rows={rows || 0}
					value={detailText || ''}
					onChange={(e) => setDetailText(e.target.value)}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitleTextAreapartial;
