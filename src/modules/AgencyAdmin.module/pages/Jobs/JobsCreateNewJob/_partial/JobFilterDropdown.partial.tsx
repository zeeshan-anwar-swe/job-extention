import { ChangeEvent, useState } from 'react';
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
	getAllCandidatesList,
	getFilteredCandidates,
	setCandidatesFilterOptions,
} from '../../../../../../store/slices/Candiates.slice';
import { RootState } from '../../../../../../store';

interface ExperienceItem {
	title: string;
	value: number;
}

const JobFilterDropdownPartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { filterOptions } = useSelector((state: RootState) => state.candidates);
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
		setDropdownOpen(false);
	};

	const handleExperienceClick = (value: number) => {
		const newExperiences = filterOptions.experiences.includes(value)
			? filterOptions.experiences.filter((item) => item !== value)
			: [...filterOptions.experiences, value];
		dispatch(setCandidatesFilterOptions({ ...filterOptions, experiences: newExperiences }));
	};

	const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		dispatch(setCandidatesFilterOptions({ ...filterOptions, location: value }));
	};

	const handleSkillsChange = (skills: string[]) => {
		dispatch(setCandidatesFilterOptions({ ...filterOptions, skills }));
	};

	const applyFilter = () => {
		const { location, experiences, skills } = filterOptions;
		dispatch(getFilteredCandidates({ page: 1, limit: 10, location, experiences, skills }));
		setDropdownOpen(false);
	};

	const clearAllFilters = async () => {
		await dispatch(setCandidatesFilterOptions({ location: '', experiences: [], skills: [] }));
		dispatch(getAllCandidatesList({ page: 1, limit: 10 }));
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Dropdown>
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
										filterOptions?.experiences?.includes(item?.value)
											? 'blue'
											: 'zinc'
									}
									variant={
										filterOptions?.experiences?.includes(item?.value)
											? 'solid'
											: 'outline'
									}
									onClick={() => handleExperienceClick(item?.value)}>
									{item.title}
								</Button>
							))}
						</CardBody>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='!text-lg !font-medium'>Location</CardTitle>
						</CardHeader>
						<CardBody>
							<FieldWrap
								firstSuffix={
									<Icon className='mx-2 rounded-full' icon='HeroMapPin' />
								}>
								<Input
									id='location'
									autoComplete='new-loaction'
									rounded='rounded-full'
									name='location'
									placeholder='Location'
									value={filterOptions.location}
									onChange={handleLocationChange}
								/>
							</FieldWrap>
						</CardBody>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='!text-lg !font-medium'>Skills</CardTitle>
						</CardHeader>
						<CardBody>
							<LabelSkillSelectPartial
								id='skills'
								formData={{ ...filterOptions, setFormData: undefined }}
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
