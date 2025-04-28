import { useState, KeyboardEvent, useEffect } from 'react';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import Label from '../../../../../../components/form/Label';
import SelectReact from '../../../../../../components/form/SelectReact';
import { AppDispatch } from '../../../../../../store';
import { useDispatch } from 'react-redux';
import { setCandidatesFilterOptions } from '../../../../../../store/slices/Candiates.slice';

type AllowedId = 'skills';

const LabelSkillSelectPartial = ({
	label,
	id,
	formData,
}: {
	label?: string;
	id: AllowedId;
	detail?: string;
	formData: any;
}) => {
	const dispatch: AppDispatch = useDispatch();
	const [inputValue, setInputValue] = useState<string>('');
	const [selectInputValue, setSelectInputValue] = useState<string>(''); // Local state for SelectReact input

	// Initialize local input value based on form data.
	useEffect(() => {
		if (formData && formData.skills) {
			setSelectInputValue('');
		}
	}, [formData]);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim()) {
			event.preventDefault();
			const newSkill = inputValue.trim();
			const updatedSkills = [...formData.skills, newSkill];
			dispatch(setCandidatesFilterOptions({ ...formData, skills: updatedSkills }));
			setInputValue('');
			setSelectInputValue(''); // Clear local input state
		}
	};

	const handleChange = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
		dispatch(setCandidatesFilterOptions({ ...formData, skills: selectedValues }));
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
					setSelectInputValue(value);
				}}
				onKeyDown={handleKeyDown}
				value={formData.skills.map((skill: string) => ({ value: skill, label: skill }))}
				onChange={handleChange}
				inputValue={selectInputValue}
			/>
		</div>
	);
};

export default LabelSkillSelectPartial;
