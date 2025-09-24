import { ChangeEvent } from 'react';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Input from '../../../../../components/form/Input';
import { TInputTypes } from '../../../../../types/input.type';
import { FormData } from '../JobsCreateNewJob/_partial/CreateJobLeftSide.partial';



type AllowedId =
	| 'title'
	| 'type'
	| 'location'
	| 'positions'
	| 'skills';

const LabelTitlepartial = ({
	
	label,
	id,
	formData,
	setFormData,
	inputType,
}: {
	label?: string;
	id: AllowedId;
	detail?: string;
	formData: FormData;
	setFormData: any;
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
					defaultValue={1}
					type={inputType ?? 'text'}
					// dimension='lg'
					id={id}
					min={1}
					autoComplete='name'
					name={id}
					value={formData[id]}
					placeholder={label ?? ''}
					onChange={handleChange}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
