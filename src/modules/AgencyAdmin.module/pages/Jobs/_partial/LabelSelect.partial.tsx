import { textValidationCheck } from '../../../../../utils/validationCheck';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import SelectReact from '../../../../../components/form/SelectReact';
import { formatString } from '../../../../../utils/helper';
import { JobFormData } from '../JobsViewCadidates/_partial/JobForm.partial';


type AllowedId = 'type';

const LabelSelectPartial = ({
	label,
	id,
	formData,
	setFormData,
}: {
	label?: string;
	id: AllowedId;
	formData: JobFormData;
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
					value={{ value: formData.type, label: formatString(formData.type) }}
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
