import { useState } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTitleTextAreapartial = ({
	label,
	detail,
	className = '',
	inputClassName = '',
}: {
	label?: string;
	detail?: string;
	className?: string;
	inputClassName?: string;
}) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail || '');
	return (
		<div className={'flex-1 ' + className}>
			<label className='font-light'>{textValidationCheck(label)}</label>

			<textarea
				className={'w-full rounded-xl bg-zinc-100 p-4 font-medium ' + inputClassName}
				name=''
				id=''
				onChange={(e) => setDetailText(e.target.value)}
				rows={6}
				value={detailText || ''}></textarea>
		</div>
	);
};

export default LabelTitleTextAreapartial;
