import Alert from '../../../../../components/ui/Alert';
import Button from '../../../../../components/ui/Button';
import CardBodyTagPartial from './CardBodyTag.partial';
import CardDropdownPartial from './CardDropdown.partial';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
} from '../../../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import AssignCandidatesModalPartial from '../../../../Shared/common/assignCandidateModal/AssignCandiatesModal.partial';
import { useState } from 'react';
import { TeamJob } from '../../../../../types/slices.type/team/jobs.slice.type';

const JobsPageCardPartial = ({ teamJob }: { teamJob: TeamJob }) => {
	const navigateTo = useNavigate();
	const [assignCandidateModal, setAssignCandidateModal] = useState(false);
	return (
		<Card className='col-span-4 max-2xl:last:col-span-12 flex flex-col gap-2 border border-zinc-300 hover:cursor-pointer max-2xl:col-span-6 max-lg:col-span-12'>
			<CardHeader className='gap-4 max-md:!flex-col-reverse'>
				<Alert icon='HeroFolder' variant='solid' />
				<div className='flex-1'>
					<h4 className='max-md:text-sm'>{textValidationCheck(teamJob?.title)}</h4>
					<Button
						rounded='rounded-full'
						variant='outline'
						color='zinc'
						className={`gap-2 !px-2 !py-1 ${!teamJob?.client && 'hidden'}`}
						rightIcon='Hero'>
						<img
							className='aspect-square w-6 rounded-full object-cover '
							src={profileImageUrlValidationCheck(teamJob?.client?.clientUser?.image)}
							alt='profile-image'
						/>
						<h5 className='max-md:text-sm'>{teamJob?.client?.clientUser?.firstName} {teamJob?.client?.clientUser?.lastName}</h5>
					</Button>
				</div>
				<div className='h-full max-md:flex-1'>
					<CardDropdownPartial item={teamJob} />
				</div>
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<div className='flex items-center gap-2 max-md:flex-col max-md:items-start'>
					<CardBodyTagPartial title='No. of Positions:' value='4' />
					<CardBodyTagPartial title='Experience:' value={teamJob?.experience} />
				</div>
				<div className='flex items-center gap-2 max-md:flex-col max-md:items-start'>
					<CardBodyTagPartial title='Location:' value={teamJob?.location} />
					<CardBodyTagPartial title='Job Type:' value={teamJob?.type} />
				</div>
			</CardBody>
			<CardFooter className='border-t-2 !py-2'>
				<CardFooterChild>
					<Button
						onClick={() => {
							navigateTo(`/jobs/view-job-details`, { state: teamJob });
						}}
						size='lg'
						className='!px-0 !text-xl !font-bold'
						rightIcon='HeroArrowUpRight'>
						View Cadidates
					</Button>
				</CardFooterChild>
				<CardFooterChild>
					<div className='flex items-center'>
						{teamJob.candidateJobProfiles.map(() => (
							<img
								className='-mr-6 aspect-square w-10 object-cover'
								src={profileImageUrlValidationCheck('')}
							/>
						))}

						<Button
							variant='solid'
							onClick={() => setAssignCandidateModal(true)}
							rounded='rounded-full'
							// className='!bg-white dark:!bg-zinc-800 dark:text-white'
							icon='HeroPlus'></Button>
					</div>
					<AssignCandidatesModalPartial modal={assignCandidateModal} setModal={setAssignCandidateModal} jobId={teamJob?.id} jobTitle={teamJob?.title} />
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default JobsPageCardPartial;
