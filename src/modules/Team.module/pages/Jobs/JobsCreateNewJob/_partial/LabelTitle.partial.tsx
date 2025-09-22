import { ChangeEvent } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Input from '../../../../../../components/form/Input';
import { TInputTypes } from '../../../../../../types/input.type';
import { FormData } from './CreateJobLeftSide.partial';

type AllowedId = 'title' | 'type' | 'location' | 'skills';

const LabelTitlepartial = ({
	id,
	label,
	formData,
	inputType,
	setFormData,
	placeholder,
}: {
	id: AllowedId;
	label?: string;
	detail?: string;
	setFormData: any;
	formData: FormData;
	placeholder?: string;
	inputType?: TInputTypes;
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: inputType === 'number' ? +value : value,
		});
	};
	return (
		<div className='w-full'>
			<Label htmlFor={id ?? ''} className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<Input
					id={id}
					min={1}
					name={id}
					dimension='lg'
					defaultValue={1}
					autoComplete='name'
					value={formData[id]}
					onChange={handleChange}
					placeholder={placeholder ?? label ?? ''}
					type={inputType ?? 'text'}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
