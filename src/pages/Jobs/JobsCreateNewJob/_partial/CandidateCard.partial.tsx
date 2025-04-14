import React, { useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
} from '../../../../components/ui/Card';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';
import Button from '../../../../components/ui/Button';
import Alert from '../../../../components/ui/Alert';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import AssignJobModalPartial from './AssignJob.partial';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { assignCandidateWhileCreatingJob } from '../../../../store/slices/Jobs.slice';
import { objectExistsInArray } from '../../../../utils/helper';

const CandidateCardPartial = ({ candidate }: { candidate: any }) => {
	const [modal, setModal] = useState<boolean>(false);
	const { assignedCandidatesWhileCreatingJob } = useSelector(
		(state: RootState) => state.jobsSlice,
	);
	const dispatch: AppDispatch = useDispatch();

	const isAssigned = objectExistsInArray(assignedCandidatesWhileCreatingJob, candidate);

	return (
		<Card className='bg-zinc-100 dark:bg-zinc-950'>
			<CardHeader className='gap-4'>
				<img
					className='aspect-square w-14 rounded-xl border'
					src={profileImageUrlValidationCheck('')}
					alt='profile-image'
				/>
				<div className='flex-1'>
					<h5>{textValidationCheck(candidate?.name)}</h5>
					<p>{textValidationCheck(candidate?.email)}</p>
				</div>
				<CardHeaderChild>
					{candidate?.linkedIn && <Alert className='!p-0' icon='HeroGitHub' />}
					{candidate?.gitHub && <Alert className='!p-0' icon='HeroLinkedIn' />}
				</CardHeaderChild>
			</CardHeader>

			<CardBody className='!flex flex-wrap !gap-4 max-md:flex-col'>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					Experience: <b>{textValidationCheck(candidate?.experience)}</b>
				</Button>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					location: <b>{textValidationCheck(candidate?.location)}</b>
				</Button>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					Availability: <b>{textValidationCheck(candidate?.availability)}</b>
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
				<Link to={'/candidates/profile/10'}>
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
