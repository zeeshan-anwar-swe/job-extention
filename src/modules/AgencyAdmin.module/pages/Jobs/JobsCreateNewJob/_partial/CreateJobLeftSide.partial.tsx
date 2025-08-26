import React, { useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/ui/Card';
import LabelTitlepartial from './LabelTitle.partial';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import ResultUserDataPartial from './ResultUserData.partial';
import Button from '../../../../../../components/ui/Button';
import AssignClientModalPartial from './AssignJob.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { createJobs } from '../../../../../../store/slices/Jobs.slice';
import LabelSelectPartial from './LabelSelect.partial';
import LabelSkillSelectPartial from './LabelSkillSelect.partial';
import LabelTitleTextareaPartial from './LabelTitleTextarea.partial';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { JobsFilterDropdownLocation } from './JobsFilterDropdownLocation';

interface FormData {
	title: string;
	description: string;
	experience: string;
	type: string;
	location: string;
	positions: string;
	skills: string[];
}

const CreateJobLeftSidePartial = () => {
	const { assignedCandidatesWhileCreatingJob, assignedClientWhileCreatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const [modal, setModal] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [formData, setFormData] = useState<FormData>({
		title: '',
		description: '',
		experience: '',
		location: '',
		type: '',
		positions: '',
		skills: [],
	});

	const dispatchCreateJob = async () => {
		setIsSubmitting(true);
		const isAssigned = assignedCandidatesWhileCreatingJob.length > 0;

		if (formData.title.length < 3) {
			toast.error('Enter at least 3 characters for title');
			return;
		}
		if (formData.positions === '' || +formData.positions < 1) {
			toast.error('Position shoud empty or less than 1');
			return;
		} else if (formData.experience.length < 1) {
			toast.error('Enter experience');
			return;
		} else if (formData.skills.length < 1) {
			toast.error('Enter at least one skill');
			return;
		} else if (formData.location.length < 3) {
			toast.error('Enter at least 3 characters for location');
			return;
		} else if (formData.type === '') {
			toast.error('Job type should not be empty');
			return;
		}

		// @ts-ignore
		// prettier-ignore
		await dispatch(createJobs( isAssigned ? {...formData,clientId: assignedClientWhileCreatingJob?.id??null,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: formData));
		setIsSubmitting(false);
		navigate('/jobs');
	};

	return (
		<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild className='!block'>
					<CardTitle>Create a New Job</CardTitle>
					<CardSubTitle>
						Effortlessly create jobs, assign candidates, send to a client.
					</CardSubTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='flex flex-col gap-y-4'>
				<LabelTitlepartial
					id='title'
					placeholder='React etc...'
					setFormData={setFormData}
					formData={formData}
					label='Job Title'
				/>
				<div className='flex items-center gap-4 max-md:flex-col'>
					<LabelTitlepartial
						id='positions'
						placeholder='10...'
						inputType='number'
						formData={formData}
						label='No. of Positions'
						setFormData={setFormData}
					/>
					{/* <LabelTitlepartial
						id='experience'
						setFormData={setFormData}
						formData={formData}
						label='Experience'
					/> */}
					<LabelSelectPartial
						id='experience'
						setFormData={setFormData}
						formData={formData}
						label='Experience'
						placeholder='Select Years Of Experience'
						options={[
							{ value: '', label: '' },
							{ value: '1 Year', label: '1 Year' },
							{ value: '2 Years', label: '2 Years' },
							{ value: '3 Years', label: '3 Years' },
							{ value: '4 Years', label: '4 Years' },
							{ value: '5 Years', label: '5 Years' },
							{ value: '6 Years', label: '6 Years' },
							{ value: '7 Years', label: '7 Years' },
							{ value: '8 Years', label: '8 Years' },
							{ value: '9 Years', label: '9 Years' },
							{ value: '10 Years', label: '10 Years' },
							{ value: '10+ Years', label: '10+ Years' },
						]}
					/>
				</div>
				<div className='flex items-center gap-4 max-md:flex-col'>
					<LabelSelectPartial
						placeholder='Select Job Type'
						id='type'
						setFormData={setFormData}
						formData={formData}
						label='Job Type'
						options={[
							{ value: '', label: '' },
							{ value: 'REMOTE', label: 'Remote' },
							{ value: 'ON_SITE', label: 'On Site' },
							{ value: 'HYBRID', label: 'Hybrid' },
						]}
					/>

					<LabelTitlepartial
						id='location'
						setFormData={setFormData}
						formData={formData}
						label='Location'
					/>
					
					
				</div>
				<LabelTitleTextareaPartial
					id='description'
					setFormData={setFormData}
					formData={formData}
					label='Description'
				/>
				<LabelSkillSelectPartial
					id='skills'
					setFormData={setFormData}
					formData={formData}
					label='Required Skills '
				/>
				<NavSeparator className='mt-8' />
			</CardBody>
			<CardFooter className='!flex-col !items-start'>
				<CardFooterChild>
					{assignedCandidatesWhileCreatingJob.length > 0 && (
						<CardTitle>Assigned Candidates</CardTitle>
					)}

					<div className='flex w-full flex-wrap items-center gap-4 max-md:flex-col max-md:items-start'>
						{assignedCandidatesWhileCreatingJob.map((candidate: any) => (
							<ResultUserDataPartial candidate={candidate} key={candidate.id} />
						))}
					</div>
				</CardFooterChild>
				<CardFooterChild className='ml-auto'>
					<Button
						onClick={() => navigate('/jobs')}
						variant='outline'
						color='zinc'
						borderWidth='border'>
						Cancel
					</Button>
					<Button isLoading={isSubmitting} onClick={dispatchCreateJob} variant='solid'>
						Save Job
					</Button>
					<Button variant='solid' onClick={() => setModal(true)}>
						Assign To client
					</Button>
					<AssignClientModalPartial setModal={setModal} modal={modal} />
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default CreateJobLeftSidePartial;
