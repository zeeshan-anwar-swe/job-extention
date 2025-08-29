import React, { useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
} from '../../../../../../components/ui/Card';
import {
	textValidationCheck,
} from '../../../../../../utils/validationCheck';
import Button from '../../../../../../components/ui/Button';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import AssignJobModalPartial from './AssignJob.partial';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { assignCandidateWhileCreatingJob } from '../../../../../../store/slices/Jobs.slice';
import { objectExistsInArray } from '../../../../../../utils/helper';
import { LinkedInProfile } from '../../../../../../store/slices/Candiates.slice';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import { calculateTotalExperience } from '../../../../../../utils/linkedin.util';

const CandidateCardPartial = ({ candidate }: { candidate: LinkedInProfile }) => {
	const [modal, setModal] = useState<boolean>(false);
	const { assignedCandidatesWhileCreatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);
	const dispatch: AppDispatch = useDispatch();

	const {loading, imageUrl} = useImageValidation(candidate.profilePictureUrl);

	const isAssigned = objectExistsInArray(assignedCandidatesWhileCreatingJob, candidate);

	return (
		<Card className='bg-zinc-100 dark:bg-zinc-950'>
			<CardHeader className='gap-4'>
				<img
					className='aspect-square w-14 rounded-xl border'
					src={imageUrl}
					alt='profile-image'
				/>
				<div className='flex-1'>
					<h5>{textValidationCheck(candidate.name)}</h5>
					<p>{textValidationCheck(candidate.headline)}</p>
				</div>
				{/* <CardHeaderChild>
					{candidate. && <Alert className='!p-0' icon='HeroLinkedIn' />}
					{candidate?.gitHub && <Alert className='!p-0' icon='HeroGitHub' />}
				</CardHeaderChild> */}
			</CardHeader>

			<CardBody className='!flex flex-wrap !gap-4 max-md:flex-col'>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					Experience: <b>{calculateTotalExperience(candidate.workExperience)}</b>
				</Button>
				 <Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					location: <b>{textValidationCheck(candidate?.location)}</b>
				</Button>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					Availability: <b>{candidate.canSendInmail? 'Yes' : 'No'}</b>
				</Button>
			</CardBody> 
			<NavSeparator className='!mx-4 !mb-4' />
			<CardFooter className='!justify-start max-md:!justify-center'>
				<Button
					rightIcon={isAssigned ? 'HeroTwiceCheck' : undefined}
					color={isAssigned ? 'emerald' : 'blue'}
					variant='solid'
					onClick={() => {
						dispatch(assignCandidateWhileCreatingJob(candidate));
					}}>
					{isAssigned ? 'Assigned' : 'Assign'}
				</Button>
				<Link target='_blank' to={candidate.publicProfileUrl}>
					<Button variant='outline' borderWidth='border' color='zinc'>
						View Profile
					</Button>
				</Link>
				<AssignJobModalPartial setModal={setModal} modal={modal} />
			</CardFooter>
		</Card>
	);
};

export default CandidateCardPartial;
