import { textValidationCheck } from '../../../../../../utils/validationCheck';

const LabelTitleTextAreapartial = ({
	label,
	detail,
	className = '',
	inputClassName = '',
	placeholder = '',
}: {
	label?: string;
	detail?: string;
	className?: string;
	inputClassName?: string;
	placeholder?: string;
}) => {
	return (
		<div className={'flex-1 ' + className}>
			<label className='font-light'>{textValidationCheck(label)}</label>
			<textarea
				className={
					'min-h-36 max-h-72 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4 font-medium ' + inputClassName
				}
				placeholder={placeholder || ''}
				name=''
				id=''
				rows={6}
				value={textValidationCheck(detail)}></textarea>
		</div>
	);
};

export default LabelTitleTextAreapartial;
