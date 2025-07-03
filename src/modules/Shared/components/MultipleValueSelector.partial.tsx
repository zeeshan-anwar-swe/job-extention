import { useState, KeyboardEvent, useEffect } from 'react';
import SelectReact, { TSelectOptions } from '../../../components/form/SelectReact';
import { FormikProps } from 'formik';


const MultipleValueSelector = ({ id, name, formik, initialValues }: { initialValues:any[]; name:string; id: string; formik:FormikProps<any> }) => {
	const [formData, setFormData] = useState<TSelectOptions[]>(initialValues);
	const [inputValue, setInputValue] = useState<string>('');
	const [selectInputValue, setSelectInputValue] = useState<string>(''); // Local state for SelectReact input


	
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim()) {
			event.preventDefault();
			const newSkill = inputValue.trim();
			const updatedSkills = [...formData, newSkill];
			setFormData(updatedSkills as any);
			setInputValue('');
			setSelectInputValue(''); // Clear the SelectReact input
		}
	};

	const handleChange = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
		setFormData(selectedValues);
	};

	

	useEffect(()=>{
		formik.setFieldValue(name,formData)
		
	},[formData])


	return (
		<div className='w-full'>
			<SelectReact
				components={{
					DropdownIndicator: () => null,
					IndicatorSeparator: () => null,
				}}
				noOptionsMessage={() => null}
				
				isMulti
				isClearable
				isSearchable
				id={id}
				name={id}
				placeholder='Write and press enter'
				onInputChange={(value: string) => {
					setInputValue(value);
					setSelectInputValue(value); // Update local input state
				}}
				onKeyDown={handleKeyDown}
				value={formData.map((skill: any) => ({ value: skill, label: skill }))}
				onChange={handleChange}
				inputValue={selectInputValue} // Pass the local input value
			/>
		</div>
	);
};

export default MultipleValueSelector;
