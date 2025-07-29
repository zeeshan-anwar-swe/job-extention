import { ChangeEvent } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Textarea from '../../../../../../components/form/Textarea';

interface FormData {
	title: string;
	description: string;
	experience: string;
	type: string;
	location: string;
	positions: string;
	skills: string[];
}

type AllowedId =
	| 'title'
	| 'description'
	| 'type'
	| 'experience'
	| 'location'
	| 'positions'
	| 'skills';

const LabelTitleTextareaPartial = ({
	label,
	id,
	formData,
	setFormData,
}: {
	label?: string;
	id: AllowedId;
	detail?: string;
	formData: FormData;
	setFormData: any;
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	return (
		<div className='w-full'>
			<Label htmlFor={id ?? ''} className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<Textarea
					rows={6}
					id={id}
					name={id}
					value={formData[id]}
					placeholder={label ?? ''}
					onChange={handleChange}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitleTextareaPartial;
