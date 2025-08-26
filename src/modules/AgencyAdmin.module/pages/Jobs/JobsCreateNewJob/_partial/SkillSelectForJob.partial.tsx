import { useState, KeyboardEvent } from 'react';
import Label from '../../../../../../components/form/Label';
import SelectReact from '../../../../../../components/form/SelectReact';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import {
	getAllCandidatesList,
	setCandidatesFilterOptions,
} from '../../../../../../store/slices/Candiates.slice';

export const SkillsSelectForJob = ({
	formData,
	setFormData,
}: {
	formData: any;
	setFormData: any;
}) => {
	const { filterOptions } = useSelector((state: RootState) => state.candidates);
	const dispatch: AppDispatch = useDispatch();

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

	const handleChange = async (selectedOptions: any) => {
		const selectedValues = await selectedOptions.map((option: any) => option.value);

		await setFormData({
			...formData,
			skills: selectedValues,
		});

		await dispatch(setCandidatesFilterOptions({ ...filterOptions, skills: selectedValues }));

		dispatch(
			getAllCandidatesList({
				page: 1,
				limit: 10,
				filterOptions: { ...filterOptions, skills: selectedValues },
			}),
		);
	};

	return (
		<div className='w-full'>
			<Label htmlFor='skills' className='font-light'>
				Skills
			</Label>

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
				id='skills'
				name='skills'
				placeholder='Write skill and press enter'
				onInputChange={(value: string) => {
					setInputValue(value);
					setSelectInputValue(value); // Update local input state
				}}
				onKeyDown={handleKeyDown}
				value={formData?.skills?.map((skill: any) => ({ value: skill, label: skill }))}
				onChange={handleChange}
				inputValue={selectInputValue} // Pass the local input value
			/>
		</div>
	);
};
