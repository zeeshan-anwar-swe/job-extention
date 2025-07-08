import { useEffect, useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/ui/Card';
import Button from '../../../../../../components/ui/Button';
import { textValidationCheck } from '../../../../../../utils/validationCheck';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import LabelTitlepartial from '../../_partial/LabelTitle.partial';
import LabelSkillSelectPartial from '../../_partial/LabelSkillSelect.partial';
import LabelSelectPartial from '../../_partial/LabelSelect.partial';
import CardDropdownPartial from './CardDropdown.partial';
import { getStatusColor } from '../../../../../../utils/helper';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { getJobDetails, updateJob } from '../../../../../../store/slices/Jobs.slice';

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
	const dispatch: AppDispatch = useDispatch();
	const [formData, setFormData] = useState<JobFormData>({
		title: '',
		description: '',
		experience: '',
		location: '',
		type: 'REMOTE',
		positions: '',
		skills: [],
	});

	const { componentLoading, error } = useSelector((state: RootState) => state.jobsSlice);

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

	const { loading, imageUrl } = useImageValidation(jobDetails?.client?.clientUser?.image);

	const updateJobHandler = async () => {
		await dispatch(
			updateJob({
				jobId: jobDetails.id,
				payload: { ...formData, status: jobDetails.status },
			}),
		);
		dispatch(getJobDetails(jobDetails.id));
	};

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
					className='!justify-start gap-2 !py-[2px] !pl-1 !pr-2 '>
					<ImageLoaderWraper loading={loading} height='h-6'>
						<img
							className=' aspect-square w-6 rounded-full object-cover'
							src={imageUrl}
							alt='profile-image'
						/>
					</ImageLoaderWraper>
					<span>{textValidationCheck(jobDetails.client?.clientUser?.firstName)}</span>
					<span>{textValidationCheck(jobDetails.client?.clientUser?.lastName)}</span>
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
				<LabelTitlepartial
					id='description'
					label='description'
					formData={formData}
					setFormData={setFormData}
					detail={formData.description}
				/>
			</CardBody>
			<CardFooter>
				<CardFooterChild>
					<Button variant='outline'>Cancel</Button>
					<Button onClick={updateJobHandler} isLoading={componentLoading} variant='solid'>
						Save and update the job
					</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default JobFormPartial;
