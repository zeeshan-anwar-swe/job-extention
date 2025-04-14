import React, { useEffect, useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import LabelTitlepartial from '../../_partial/LabelTitle.partial';
import LabelSkillSelectPartial from '../../_partial/LabelSkillSelect.partial';
import LabelSelectPartial from '../../_partial/LabelSelect.partial';
import CardDropdownPartial from './CardDropdown.partial';
import { getStatusColor } from '../../../../utils/helper';

interface JobFormData {
	title: string;
	description: string;
	experience: string;
	location: string;
	type: 'REMOTE' | 'ON_SITE' | 'HYBRID';
	positions: string;
	skills: string[];
}

const JobFormPartial = ({ jobDetails }: any) => {
	const [formData, setFormData] = useState<JobFormData>({
		title: '',
		description: '',
		experience: '',
		location: '',
		type: 'REMOTE',
		positions: '',
		skills: [],
	});

	useEffect(() => {
		if (jobDetails) {
			setFormData({
				title: jobDetails.title,
				description: jobDetails.description,
				experience: jobDetails.experience,
				location: jobDetails.location,
				type: jobDetails.type,
				positions: jobDetails.positions,
				skills: jobDetails.skills,
			});
		}
	}, []);

	return (
		<Card className='col-span-4 flex flex-col gap-2  p-4 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild className='!block'>
					<CardTitle>Jobs Details</CardTitle>
					<CardSubTitle>Edit Job description and details.</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<CardDropdownPartial item={jobDetails} />
				</CardHeaderChild>
			</CardHeader>
			<CardHeader className=' !justify-start'>
				<Button
					variant='outline'
					color='zinc'
					rounded='rounded-full'
					className='!justify-start gap-2 !py-0 !pl-0 !pr-2 '>
					<img
						className='aspect-square w-8'
						src={profileImageUrlValidationCheck(jobDetails.client?.clientUser?.image)}
						alt='profile-image'
					/>
					<span>{textValidationCheck(jobDetails.client?.clientUser?.firstName)}</span>
				</Button>

				<Button
					variant='solid'
					color={getStatusColor(jobDetails.status)}
					rounded='rounded-full'
					className='!justify-start gap-2  !py-1'>
					<span>{jobDetails?.status}</span>
				</Button>
			</CardHeader>
			<CardBody className='!h-fit gap-4'>
				<NavSeparator className='' />
				<LabelTitlepartial
					formData={formData}
					setFormData={setFormData}
					id='title'
					label='Job Title'
					detail={formData.title}
				/>
				<LabelTitlepartial
					formData={formData}
					setFormData={setFormData}
					id='positions'
					label='No of position'
					detail={jobDetails?.positions}
				/>
				<LabelTitlepartial
					formData={formData}
					setFormData={setFormData}
					id={'experience'}
					label='Experience'
					detail={formData.experience}
				/>
				<LabelTitlepartial
					formData={formData}
					setFormData={setFormData}
					id={'location'}
					label='Location'
					detail={formData.location}
				/>
				'
				<LabelSelectPartial
					label='Job Type'
					formData={formData}
					setFormData={setFormData}
					id='type'
				/>
				<LabelSkillSelectPartial
					id='skills'
					formData={formData}
					setFormData={setFormData}
					label='Required Skill'
				/>
			</CardBody>
			<CardFooter>
				<CardFooterChild>
					<Button variant='outline'>Cancel</Button>
					<Button variant='solid'>Save and update the job</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default JobFormPartial;
