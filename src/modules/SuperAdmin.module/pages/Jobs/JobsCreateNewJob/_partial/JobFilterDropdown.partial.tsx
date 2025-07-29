import { ChangeEvent, useEffect, useState } from 'react';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../../../components/ui/Dropdown';
import Button from '../../../../../../components/ui/Button';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../../../../../components/ui/Card';
import LabelSkillSelectPartial from './LabelSkillSelect.partial';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Input from '../../../../../../components/form/Input';
import Icon from '../../../../../../components/icon/Icon';
import { AppDispatch } from '../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
	FilterOptionsType,
	getAllCandidatesList,
	getFilteredCandidates,
	setCandidatesFilterOptions,
} from '../../../../../../store/slices/Candiates.slice';
import { RootState } from '../../../../../../store';
import { JobsFilterDropdownLocation } from './JobsFilterDropdownLocation';
import toast from 'react-hot-toast';

interface ExperienceItem {
	title: string;
	value: number;
}

const JobFilterDropdownPartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { filterOptions } = useSelector((state: RootState) => state.candidates);

	const [formData, setFromData] = useState<any>({
		skills: [],
		location: '',
		experiences: [],
	});

	console.log({ formData });

	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const experience: ExperienceItem[] = [
		{ title: '1 Year', value: 1 },
		{ title: '2 Year', value: 2 },
		{ title: '3 Year', value: 3 },
		{ title: '4 Year', value: 4 },
		{ title: '5 Year', value: 5 },
		{ title: '6 Year', value: 6 },
		{ title: '7 Year', value: 7 },
		{ title: '8 Year', value: 8 },
		{ title: '9 Year', value: 9 },
		{ title: '10 Year', value: 10 },
		{ title: '10+ Year', value: 11 },
	];

	const handleMouseEnter = () => {
		setDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		setDropdownOpen(true);
	};

	const handleExperienceClick = (value: number) => {
		const { tenure } = filterOptions;
		let newMin = tenure.min;
		let newMax = tenure.max;

		// Case 1: If the clicked value matches an existing boundary, toggle it off.
		if (value === newMin && newMin !== 0) {
			newMin = 0;
			// If min was set and max was also set, but min is now 0,
			// and max is no longer a valid upper bound (e.g., if max was 5 and min was 3, and 3 is clicked, now min is 0, so 5 is still a valid max),
			// we might want to ensure the range remains logical.
			// If newMax now becomes the only set value, it implicitly becomes the 'min' of a single-point range, or we clear it too.
			if (newMax !== 0 && newMin === 0) {
				// If we've just cleared min, and max is still set,
				// decide if max should become the new min of a single-point range, or clear the whole range.
				// For a mature range, usually clearing min means the entire range is reset, or max becomes the new lower bound.
				// Let's make it smarter: if min is cleared, and max still exists, max becomes the new min.
				newMin = newMax;
				newMax = 0;
			}
		} else if (value === newMax && newMax !== 0) {
			newMax = 0;
			// If max was cleared and min is still set, ensure min remains the lower bound.
			// If min was e.g. 5, and max was 10, and 10 is clicked, now max is 0. So 5 should just be min.
		}
		// Case 2: If the range is empty (both 0), set the clicked value as the initial min.
		else if (newMin === 0 && newMax === 0) {
			newMin = value;
		}
		// Case 3: If only one boundary is set (either min or max is 0, but not both)
		else if (newMin !== 0 && newMax === 0) {
			// Only min is set, and max is 0
			if (value < newMin) {
				newMax = newMin; // Current min becomes the new max
				newMin = value; // Clicked value becomes the new min
			} else if (value >= newMin) {
				newMax = value; // Clicked value becomes the new max
			}
		} else if (newMax !== 0 && newMin === 0) {
			// Only max is set, and min is 0 (less common in a typical UI, but for robustness)
			if (value > newMax) {
				newMin = newMax; // Current max becomes the new min
				newMax = value; // Clicked value becomes the new max
			} else if (value <= newMax) {
				newMin = value; // Clicked value becomes the new min
			}
		}
		// Case 4: Both min and max are already set.
		else if (newMin !== 0 && newMax !== 0) {
			if (value <= newMin) {
				newMin = value; // Update min if the value is less than or equal to current min
			} else if (value >= newMax) {
				newMax = value; // Update max if the value is greater than or equal to current max
			} else {
				// If the value is between min and max, you might have different behaviors:
				// 1. Reset the entire range: newMin = 0; newMax = 0;
				// 2. Treat it as a new single point: newMin = value; newMax = 0;
				// 3. Keep the current range: (do nothing)
				// For this mature version, let's assume if it's strictly between, we pick the closer one
				// or we clear the whole range to start fresh for a new point.
				// Let's choose to reset the range if a value strictly inside is clicked.
				newMin = value;
				newMax = 0;
				
			}
		}

		// Final check: Ensure min is always less than or equal to max, unless both are 0.
		// Also, if one is 0 and the other is not, the non-zero one effectively becomes the single-point range.
		if (newMin !== 0 && newMax !== 0 && newMin > newMax) {
			[newMin, newMax] = [newMax, newMin]; // Swap them if they got out of order
		} else if (newMin === 0 && newMax !== 0) {
			// If min is 0 but max is not, max becomes the new min, and newMax becomes 0
			newMin = newMax;
			newMax = 0;
		}

		dispatch(
			setCandidatesFilterOptions({ ...filterOptions, tenure: { min: newMin, max: newMax } }),
		);
	};

	const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		// dispatch(setCandidatesFilterOptions({ ...filterOptions, location: value }));
	};

	const handleSkillsChange = () => {
		dispatch(setCandidatesFilterOptions({ ...filterOptions, skills: formData.skills }));
	};

	const applyFilter = () => {
		const { location, tenure, skills, keywords } = filterOptions;
		if(tenure.min>0){
			if (tenure.max === 0){
				toast.error("chose second number")
				return;
			}
		}

		dispatch(getFilteredCandidates({ page: 1, limit: 10, skills, keywords, tenure }));
		setDropdownOpen(false);
	};

	const clearAllFilters = async () => {
		await dispatch(
			setCandidatesFilterOptions({
				location: { title: '', id: '' },
				tenure: { min: 0, max: 0 },
				skills: [],
			}),
		);
		dispatch(getAllCandidatesList({ page: 1, limit: 10 }));
	};

	useEffect(() => {
		// handleSkillsChange();
	}, [formData.skills]);

	return (
		<div onMouseLeave={handleMouseLeave}>
			<Dropdown isOpen={dropdownOpen} setIsOpen={setDropdownOpen}>
				<DropdownToggle hasIcon={false}>
					<Button
						rounded='rounded-full'
						variant={dropdownOpen ? 'solid' : 'outline'}
						color={dropdownOpen ? 'blue' : 'zinc'}
						icon='HeroBarFilter'>
						Filter
					</Button>
				</DropdownToggle>

				<DropdownMenu placement='bottom-end'>
					<Card>
						<CardHeader>
							<CardTitle className='!text-lg !font-medium'>Experience</CardTitle>
						</CardHeader>
						<CardBody className='grid grid-cols-3 gap-2'>
							{experience.map((item) => (
								<Button
									rounded='rounded-full'
									key={item.value}
									color={
										filterOptions?.tenure?.min === item?.value ||
										filterOptions?.tenure?.max === item?.value
											? 'blue'
											: 'zinc'
									}
									variant={
										filterOptions?.tenure?.min === item?.value ||
										filterOptions?.tenure?.max === item?.value
											? 'solid'
											: 'outline'
									}
									onClick={() => handleExperienceClick(item?.value)}>
									{item.title}
								</Button>
							))}
						</CardBody>
					</Card>
					<JobsFilterDropdownLocation />
					<Card>
						<CardHeader>
							<CardTitle className='!text-lg !font-medium'>Skills</CardTitle>
						</CardHeader>
						<CardBody>
							<LabelSkillSelectPartial
								setFormData={setFromData}
								id='skills'
								formData={formData}
								label=''
							/>
						</CardBody>
					</Card>
					<Card>
						<CardFooter>
							<Button
								className='flex-1'
								variant='outline'
								color='zinc'
								onClick={clearAllFilters}>
								Clear All
							</Button>
							<Button onClick={applyFilter} className='flex-1' variant='solid'>
								Apply Filter
							</Button>
						</CardFooter>
					</Card>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default JobFilterDropdownPartial;
