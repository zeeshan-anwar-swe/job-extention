import React, { useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../../components/ui/Card';
import LabelTitlepartial from './LabelTitle.partial';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import ResultUserDataPartial from './ResultUserData.partial';
import Button from '../../../../components/ui/Button';
import AssignJobModalPartial from './AssignJob.partial';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { createJobs } from '../../../../store/slices/Jobs.slice';
import LabelSelectPartial from './LabelSelect.partial';
import LabelSkillSelectPartial from './LabelSkillSelect.partial';
import LabelTitleTextareaPartial from './LabelTitleTextarea.partial';
import toast from 'react-hot-toast';

const CreateJobLeftSidePartial = () => {
	const [modal, setModal] = useState<boolean>(false);
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
		if (formData.positions === '' || +formData.positions < 1) {
			toast.error('Position shoud empty or less than 1');
			return;
		} else if (Array.isArray(formData.skills)) {
			toast.error('Enter at least one skill');
			return;
		}
		// @ts-ignore
		await dispatch(createJobs(formData));
	};

	return (
		<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild className='!flex-col !items-start '>
					<h1>Create a New Job</h1>
					<p>Effortlessly create jobs, assign candidates, send to a client.</p>
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
					<h1>Assigned Candidates</h1>

					<div className='flex w-full items-center gap-4 max-md:flex-col max-md:items-start'>
						<ResultUserDataPartial />
						<ResultUserDataPartial />
						<ResultUserDataPartial />
					</div>
				</CardFooterChild>
				<CardFooterChild className='ml-auto'>
					<Button variant='outline' color='zinc' borderWidth='border'>
						Cancel
					</Button>
					<Button onClick={dispatchCreateJob} variant='solid'>
						Save Job
					</Button>
					<Button variant='solid' onClick={() => setModal(true)}>
						Assign To client
					</Button>
					<AssignJobModalPartial setModal={setModal} modal={modal} />
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default CreateJobLeftSidePartial;
