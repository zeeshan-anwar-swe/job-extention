import { textValidationCheck } from '../../../utils/validationCheck';
import Label from '../../../components/form/Label';
import FieldWrap from '../../../components/form/FieldWrap';
import SelectReact from '../../../components/form/SelectReact';
import { useEffect } from 'react';

interface FormData {
	title: string;
	description: string;
	experience: string;
	type: string;
	location: string;
	positions: string;
	skills: string[];
}

type AllowedId = 'type';

const LabelSelectPartial = ({
	label,
	id,
	formData,
	setFormData,
}: {
	label?: string;
	id: AllowedId;
	formData: FormData;
	setFormData: any;
}) => {
	const handleChange = (options: { label: string; value: string }) => {
		const { value } = options;
		setFormData({
			...formData,
			[id]: value,
		});
	};

	return (
		<div className='w-full'>
			<Label htmlFor={id ?? ''} className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap>
				<SelectReact
					// @ts-ignore
					onChange={handleChange}
					selected={formData.type}
					className='w-full'
					value={{ value: formData.type, label: formData.type }}
					name='type'
					options={[
						{ value: '', label: '' },
						{ value: 'REMOTE', label: 'REMOTE' },
						{ value: 'ON_SITE', label: 'On ON_SITE' },
						{ value: 'HYBRID', label: 'HYBRID' },
					]}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelSelectPartial;
