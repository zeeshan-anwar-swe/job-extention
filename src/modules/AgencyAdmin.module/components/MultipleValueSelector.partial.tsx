import { useState, KeyboardEvent } from 'react';
import SelectReact from '../../../components/form/SelectReact';
import { FormikProps } from 'formik';

const MultipleValueSelectorPartial = ({
	id,
	name,
	formik,
}: {
	id: string;
	name: string;
	formik: FormikProps<any>;
}) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [selectInputValue, setSelectInputValue] = useState<string>(''); // Local state for SelectReact input

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim()) {
			event.preventDefault();
			const newSkill = inputValue.trim();
			const updatedSkills = [formik.values[name], newSkill];

			formik.setFieldValue(name, updatedSkills);

			setInputValue('');
			setSelectInputValue(''); // Clear the SelectReact input
		}
	};

	const handleChange = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);

		formik.setFieldValue(name, selectedValues);
	};

	return (
		<div className='w-full'>
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
				name={name}
				placeholder='Write skill and press enter'
				onInputChange={(value: string) => {
					setInputValue(value);
					setSelectInputValue(value); // Update local input state
				}}
				onKeyDown={handleKeyDown}
				value={formik.values[name].map((skill: any) => ({ value: skill, label: skill }))}
				onChange={handleChange}
				inputValue={selectInputValue} // Pass the local input value
			/>
		</div>
	);
};

export default MultipleValueSelectorPartial;
