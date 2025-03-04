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

const CandidateCardPartial = ({
	name,
	gitHub,
	linkedIn,
	location,
	experience,
	profession,
	availability,
	profileImageUrl,
}: {
	name?: string;
	gitHub?: string;
	linkedIn?: string;
	location?: string;
	profession: string;
	experience?: string;
	availability?: string;
	profileImageUrl: string;
}) => {
	const [modal, setModal] = useState<boolean>(false);

	return (
		<Card className='bg-zinc-100 dark:bg-zinc-950'>
			<CardHeader className='gap-4'>
				<img
					className='aspect-square w-14 rounded-xl border'
					src={profileImageUrlValidationCheck(profileImageUrl)}
					alt='profile-image'
				/>
				<div className='flex-1'>
					<h5>{textValidationCheck(name)}</h5>
					<p>{textValidationCheck(profession)}</p>
				</div>
				<CardHeaderChild>
					{linkedIn && <Alert className='!p-0' icon='HeroGitHub' />}
					{gitHub && <Alert className='!p-0' icon='HeroLinkedIn' />}
				</CardHeaderChild>
			</CardHeader>

			<CardBody className='!flex flex-wrap !gap-4 max-md:flex-col'>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					Experience: <b>{textValidationCheck(experience)}</b>
				</Button>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					location: <b>{textValidationCheck(location)}</b>
				</Button>
				<Button borderWidth='border' className='gap-2 !p-1' variant='outline' color='zinc'>
					Availability: <b>{textValidationCheck(availability)}</b>
				</Button>
			</CardBody>
			<NavSeparator className='!mx-4 !mb-4' />
			<CardFooter className='!justify-start max-md:!justify-center'>
				<Button variant='solid' onClick={() => setModal(true)}>
					Assign
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
