import { useState } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTitlepartial = ({
	label,
	type,
	detail,
	className = '',
	inputClassName = '',
}: {
	type?: string;
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
				type={type ?? 'text'}
				onChange={(e) => setDetailText(e.target.value)}
				value={detailText || ''}
				className={
					'w-full rounded-xl bg-white p-4 font-medium outline-none dark:bg-zinc-900 ' +
					inputClassName
				}
			/>
		</div>
	);
};

export default LabelTitlepartial;
