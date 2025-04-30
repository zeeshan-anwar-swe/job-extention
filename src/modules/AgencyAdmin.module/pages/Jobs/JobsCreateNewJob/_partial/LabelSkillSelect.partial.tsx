import { useState, KeyboardEvent } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import SelectReact from '../../../../../../components/form/SelectReact';

type AllowedId = 'skills';

const LabelSkillSelectPartial = ({
	label,
	id,
	formData,
	setFormData,
}: {
	label?: string;
	id: AllowedId;
	detail?: string;
	formData: any;
	setFormData: any;
}) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [selectInputValue, setSelectInputValue] = useState<string>(''); // Local state for SelectReact input

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim()) {
			event.preventDefault();
			const newSkill = inputValue.trim();
			const updatedSkills = [...formData.skills, newSkill];
			setFormData({
				...formData,
				skills: updatedSkills,
			});
			setInputValue('');
			setSelectInputValue(''); // Clear the SelectReact input
		}
	};

	const handleChange = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
		setFormData({
			...formData,
			skills: selectedValues,
		});
	};

	return (
		<div className='w-full'>
			{label && (
				<Label htmlFor={id ?? ''} className='font-light'>
					{textValidationCheck(label)}
				</Label>
			)}

			<SelectReact
				components={{
					DropdownIndicator: () => null,
					IndicatorSeparator: () => null,
				}}
				options={[
					{ label: 'React', value: 'React' },
					{ label: 'Node', value: 'Node' },
					{ label: 'Tailwind', value: 'Tailwind' },
				]}
				isMulti
				isClearable
				isSearchable
				id={id}
				name={id}
				placeholder='Write skill and press enter'
				onInputChange={(value: string) => {
					setInputValue(value);
					setSelectInputValue(value); // Update local input state
				}}
				onKeyDown={handleKeyDown}
				value={formData.skills.map((skill: any) => ({ value: skill, label: skill }))}
				onChange={handleChange}
				inputValue={selectInputValue} // Pass the local input value
			/>
		</div>
	);
};

export default LabelSkillSelectPartial;