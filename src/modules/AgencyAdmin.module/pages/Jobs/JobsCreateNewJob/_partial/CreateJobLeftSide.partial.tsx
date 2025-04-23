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

const CreateJobLeftSidePartial = () => {
	const { assignedCandidatesWhileCreatingJob, assignedClientWhileCreatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	const [modal, setModal] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		experience: '',
		location: '',
		type: '',
		positions: '',
		skills: [],
	});

	const dispatchCreateJob = async () => {
		const isAssigned = assignedCandidatesWhileCreatingJob.length > 0;
		if (formData.positions === '' || +formData.positions < 1) {
			toast.error('Position shoud empty or less than 1');
			return;
		} else if (formData.skills.length < 1) {
			toast.error('Enter at least one skill');
			return;
		}

		// @ts-ignore
		// prettier-ignore
		await dispatch(createJobs( isAssigned ? {...formData,clientId: assignedClientWhileCreatingJob?.id??null,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: formData));

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
					setFormData={setFormData}
					formData={formData}
					label='Job Title'
				/>
				<div className='flex items-center gap-4 max-md:flex-col'>
					<LabelTitlepartial
						inputType='number'
						id='positions'
						setFormData={setFormData}
						formData={formData}
						label='No. of Positions'
					/>
					<LabelTitlepartial
						id='experience'
						setFormData={setFormData}
						formData={formData}
						label='Experience'
					/>
				</div>
				<div className='flex items-center gap-4 max-md:flex-col'>
					<LabelSelectPartial
						id='type'
						setFormData={setFormData}
						formData={formData}
						label='Job Type'
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
					label='Skills Required'
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
					<Button onClick={dispatchCreateJob} variant='solid'>
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
