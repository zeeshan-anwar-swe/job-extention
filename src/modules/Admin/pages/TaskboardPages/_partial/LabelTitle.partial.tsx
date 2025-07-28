import { useState } from 'react';
import { textValidationCheck } from '../../../../../utils/validationCheck';

const LabelTitlepartial = ({ label, detail }: { label?: string; detail?: string }) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail);
	return (
		<div className='flex-1'>
			<label className=' font-light'>{textValidationCheck(label)}</label>
			<input
				type='text'
				placeholder={textValidationCheck(label)}
				onChange={(e) => setDetailText(e.target.value)}
				value={detailText || ""}
				className='w-full rounded-xl bg-zinc-100 p-4 font-medium'
			/>
		</div>
	);
};

export default LabelTitlepartial;
