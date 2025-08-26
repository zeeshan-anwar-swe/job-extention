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
import { TitleInputForJobPartial } from './TitleInputForJob.partial';
import { ExperienceSelectForJobPartial } from './ExperienceSelectForJob.partial';
import { LocationSelectForJob } from './LocationSelectForJob.partial';
import { SkillsSelectForJob } from './SkillSelectForJob.partial';

export interface FormData {
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
				<TitleInputForJobPartial setFormData={setFormData} formData={formData} />
				<div className='flex items-center gap-4 max-md:flex-col'>
					<LabelTitlepartial
						id='positions'
						placeholder='10...'
						inputType='number'
						formData={formData}
						label='No. of Positions'
						setFormData={setFormData}
					/>

					<ExperienceSelectForJobPartial setFormData={setFormData} formData={formData} />
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

					<LocationSelectForJob formData={formData} setFormData={setFormData} />
				</div>
				<LabelTitleTextareaPartial
					id='description'
					setFormData={setFormData}
					formData={formData}
					label='Description'
				/>
				<SkillsSelectForJob formData={formData} setFormData={setFormData} />
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
