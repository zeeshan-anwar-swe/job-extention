import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import SelectReact from '../../../../../../components/form/SelectReact';
import { FormData } from './CreateJobLeftSide.partial';


type AllowedId =
	| 'title'
	| 'type'
	| 'experience'
	| 'location'
	| 'positions'
	| 'skills';

const LabelSelectPartial = ({
	label,
	id,
	formData,
	setFormData,
	options = [],
	placeholder = 'Select...',

}: {
	label?: string;
	id: AllowedId;
	detail?: string;
	formData: FormData;
	setFormData: any;
	placeholder?: string;
	options?: { label: string; value: string }[];
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
					placeholder={placeholder || ''}
					// @ts-ignore
					onChange={handleChange}
					className='w-full'
					name='type'
					options={options}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelSelectPartial;
