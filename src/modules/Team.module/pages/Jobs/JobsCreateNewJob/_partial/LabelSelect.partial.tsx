import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import SelectReact from '../../../../../../components/form/SelectReact';

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

const LabelSelectPartial = ({
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
					className='w-full'
					name='type'
					options={[
						{ value: '', label: '' },
						{ value: 'REMOTE', label: 'Remote' },
						{ value: 'ON_SITE', label: 'On Site' },
						{ value: 'HYBRID', label: 'Hybrid' },
					]}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelSelectPartial;
