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
import { formatString, getStatusColor } from '../../../../../../utils/helper';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { updateJob } from '../../../../../../store/slices/Jobs.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../../../../../utils/cn';
import RichText from '../../../../../../components/RichText';
import { Descendant } from 'slate';
import Label from '../../../../../../components/form/Label';
import { createDescendants } from '../../../../../../utils/descendant.helper';

export interface JobFormData {
	 title: string;
  description: Descendant[];
  spokenLanguage: string[];
  // experience: string;
  type: string;
  location: string;
  // positions: string;
  skills: string[];
  experienceFrom: string;
  experienceTo: string;
}

const JobFormPartial = ({ jobDetails }: any) => {
	const params = useLocation();
	const { pathname } = params;
	const isEditPage = pathname.includes('edit');
	const navigateTo = useNavigate();

	const dispatch: AppDispatch = useDispatch();
	const [formData, setFormData] = useState<JobFormData>({
		title: '',
		description: [],
		location: '',
		type: 'REMOTE',
		skills: [],
		spokenLanguage: [],
		// experience: '',
		experienceFrom: '',
		experienceTo: '',
		// positions: '',
	});

	const { componentLoading, error } = useSelector((state: RootState) => state.jobsSlice);

	const getParsedDescription = () => {
		try {
			const parsedDes = JSON.parse(jobDetails.description);
			console.log({ parsedDes });

			return parsedDes;
		} catch (e) {
			console.log('Errrrrrr');

			return [];
		}
	};

	useEffect(() => {
		if (jobDetails) {
			console.log({ dd: getParsedDescription() });

			setFormData({
				title: jobDetails.title,
				description: getParsedDescription(),
				location: jobDetails.location,
				type: jobDetails.type,
				skills: jobDetails.skills,
				spokenLanguage: jobDetails.spokenLanguage,
				// experience: jobDetails.experience,
				experienceFrom: jobDetails.experienceFrom,
				experienceTo: jobDetails.experienceTo,
				// positions: jobDetails.positions,
			});
		}
	}, []);

	const { loading, imageUrl } = useImageValidation(jobDetails?.client?.clientUser?.image);

	const updateJobHandler = async () => {
		const description = JSON.stringify(createDescendants(formData.description));
		await dispatch(
			updateJob({
				jobId: jobDetails.id,
				payload: { ...formData, status: jobDetails.status, description },
			}),
		);
		navigateTo('/dashboard/jobs');
		// dispatch(getJobDetails(jobDetails.id));
	};

	const handleRichTextChange = (value: any) => {
		setFormData({ ...formData, description: value });
	};

	return (
		<Card className={cn('col-span-5 flex !h-fit flex-col gap-2  p-4 max-lg:col-span-12')}>
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
				{
					jobDetails?.client&&
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
				</Button>}

				<Button
					variant='solid'
					color={getStatusColor(jobDetails.status)}
					rounded='rounded-full'
					className='!justify-start gap-2  !py-1'>
					<span>{formatString(jobDetails?.status)}</span>
				</Button>
			</CardHeader>
			<CardBody className={cn('!h-fit gap-4', !isEditPage && 'pointer-events-none	')}>
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
					id={'location'}
					label='Location'
					detail={formData.location}
				/>

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
				{Array.isArray(formData.description) && formData.description.length > 0 && (
					<div className='w-full'>
						<Label htmlFor='description'>Description</Label>
						<RichText
							id='description'
							value={formData.description}
							className='min-h-48'
							handleChange={handleRichTextChange}
						/>
					</div>
				)}

			</CardBody>
			<CardFooter>
				<CardFooterChild>
					<Button onClick={() => navigateTo('/dashboard/jobs')} variant='solid' color='zinc'>
						Back
					</Button>
					{isEditPage && (
						<Button
							onClick={updateJobHandler}
							isLoading={componentLoading}
							variant='solid'>
							Save and update the job
						</Button>
					)}
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default JobFormPartial;
