import { useState } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

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
		<div className={'flex-1 ' + className}>
			<label className='font-light'>{textValidationCheck(label)}</label>
			<input
				placeholder={textValidationCheck(label)}
				type={inputType ?? 'text'}
				onChange={(e) => setDetailText(e.target.value)}
				value={detailText || ''}
				className={'w-full rounded-xl bg-zinc-100 p-4 font-medium ' + inputClassName}
			/>
		</div>
	);
};

export default LabelTitlepartial;
