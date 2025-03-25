import { useState, ChangeEvent } from 'react';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import Card, { CardBody, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/Card';
import LabelSkillSelectPartial from './LabelSkillSelect.partial';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';
import Icon from '../../../../components/icon/Icon';

interface ExperienceItem {
	title: string;
	value: number;
}

interface FormData {
	location: string;
	experiences: number[];
	skills: string[];
}

const JobFilterDropdownPartial = () => {
	const [formData, setFormData] = useState<FormData>({
		location: '',
		experiences: [],
		skills: [],
	});
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const experience: ExperienceItem[] = [
		{ title: '0-1 Year', value: 1 },
		{ title: '1+ Year', value: 2 },
		{ title: '2 Year', value: 3 },
		{ title: '3 Year', value: 4 },
		{ title: '4 Year', value: 5 },
		{ title: '5 Year', value: 6 },
		{ title: '6 Year', value: 7 },
		{ title: '7 Year', value: 8 },
		{ title: '8 Year', value: 9 },
		{ title: '9 Year', value: 10 },
		{ title: '10+ Year', value: 11 },
	];

	const handleMouseEnter = () => {
		setDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		setDropdownOpen(false);
	};

	const handleExperienceClick = (value: number) => {
		setFormData((prevFormData) => {
			const newExperiences = prevFormData.experiences.includes(value)
				? prevFormData.experiences.filter((item) => item !== value)
				: [...prevFormData.experiences, value];
			return {
				...prevFormData,
				experiences: newExperiences,
			};
		});
	};

	const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			location: value,
		}));
	};

	const applyFilter = () => {
		console.log({ formData });
		// Here you would typically implement the logic to apply the filter
		// based on the formData. This could involve making an API call,
		// updating a state in a parent component, etc.
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
										formData.experiences.includes(item.value) ? 'blue' : 'zinc'
									}
									variant={
										formData.experiences.includes(item.value)
											? 'solid'
											: 'outline'
									}
									onClick={() => handleExperienceClick(item.value)}>
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
									rounded='rounded-full'
									name='location'
									placeholder='Location'
									value={formData.location}
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
								setFormData={setFormData}
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
								onClick={() =>
									setFormData({ location: '', experiences: [], skills: [] })
								}>
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
